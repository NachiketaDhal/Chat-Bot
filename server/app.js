const app = require("express")();

const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const users = {};

io.on("connection", (socket) => {
  socket.on("new-user-joined", (name) => {
    //  console.log("New user", name);
    // console.log(socket.id);
    users[socket.id] = name;
    console.log(users);
    io.emit("user-joined", name);
  });

  socket.on("send", (message) => {
    // console.log(message);
    // console.log(users);
    socket.broadcast.emit("receive", { message, name: users[socket.id] });
  });

  socket.on("disconnect", (message) => {
    // socket.removeAllListeners("connection");
    // socket.removeAllListeners("new-user-joined");
    // socket.removeAllListeners("send");
    // socket.removeAllListeners("disconnect");
    if (users[socket.id]) {
      socket.broadcast.emit("user-left", users[socket.id]);
      delete users[socket.id];
    }
  });
});

server.listen(8000, () => {
  console.log("Server running at port 8000...");
});
