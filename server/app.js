const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
const cors = require("cors");

const { connect } = require("./DB/connect");
const Chat = require("./Models/Chat");
const chatRoute = require("./Routes/chat.route");

app.use(cors());

app.use("/api", chatRoute);

connect();

const users = {};
let send = true;

io.on("connection", (socket) => {
  socket.on("new-user-joined", (name) => {
    //  console.log("New user", name);
    // console.log(socket.id);
    users[socket.id] = name;
    // console.log(users);
    let chatMessage = new Chat({
      message: `${name} joined the chat`,
      name: users[socket.id],
      classType: "center",
    });
    chatMessage.save();
    socket.broadcast.emit("user-joined", name);
  });

  socket.on("send", (message) => {
    // console.log(message);
    // console.log(users);
    let chatMessage = new Chat({
      message,
      name: users[socket.id],
    });
    chatMessage.save();
    socket.broadcast.emit("receive", { message, name: users[socket.id] });
  });

  socket.on("disconnect", (message) => {
    if (users[socket.id]) {
      let chatMessage = new Chat({
        message: `${users[socket.id]} left the chat`,
        name: users[socket.id],
        classType: "center",
      });
      chatMessage.save();
      socket.broadcast.emit("user-left", users[socket.id]);
      delete users[socket.id];
    }
  });
});

server.listen(8000, () => {
  console.log("Server running at port 8000...");
});
