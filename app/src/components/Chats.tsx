import React, { FormEvent, Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import io from "socket.io-client";
// import moment from "moment";

import "./_chats.scss";
import { appendMessage } from "../functions";

const socket = io("http://localhost:8000");
// const today = moment();
const today = new Date().toLocaleDateString();

const Chats = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [userName, setUserName] = useState("");
  // const [userLeft, setUserLeft] = useState(false);
  // const [messages, setMessages] = useState<string[]>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue) {
      return;
    }

    // socket.emit("send", inputValue);

    const message = inputValue;
    appendMessage(
      `You: ${message}`,
      "right",
      new Date().toLocaleTimeString("en-US", { hour12: false })
    );
    socket.emit("send", message);
    // console.log(today.format("YYYY-MM-DD"));

    setInputValue("");

    // socket.on("receive", (data) => {
    //   console.log(data);
    //   appendMessage(`${data.name}: ${data.message}`, "left");
    // });
  };

  useEffect(() => {
    appendMessage(today, "date");
  }, []);

  useEffect(() => {
    socket.on("receive", (data) => {
      console.log(data);
      appendMessage(
        `${data.name}: ${data.message}`,
        "left",
        new Date().toLocaleTimeString("en-US", { hour12: false })
      );
    });
  }, []);

  useEffect(() => {
    let name = prompt("Please enter your name");

    if (!name) {
      name = "Annonymous";
      setUserName("Annonymous");
    } else {
      setUserName(name);
    }
    socket.emit("new-user-joined", name);

    socket.on("user-joined", (name) => {
      appendMessage(`${name} joined`, "center");
    });
  }, []);

  // useEffect(() => {
  //   socket.on("user-joined", (name) => {
  //     appendMessage(`${name} joined`, "center");
  //   });
  // }, []);

  useEffect(() => {
    if (userName === "Annonymous") return;
    socket.on("user-left", (name: string) => {
      appendMessage(`${name} left`, "center");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <Container className="message-container">
        {/* <div className="right">Hi bhai</div>
        <div className="left">
          Hi bhai Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Perferendis, magni?
        </div>
        <div className="center">Ram joined</div> */}
        {/* {messages.map((m, i) => (
          <div className="right" key={i}>
            {`${userName}: ${m}`}
          </div>
        ))} */}
      </Container>
      <Form>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
          />
          <button type="submit">Send</button>
        </form>
      </Form>
    </Fragment>
  );
};

const Container = styled.section`
  border: 2px solid #323232;
  height: 70vh;
  padding: 2em 1em;
  overflow-y: auto;
`;

const Form = styled.section`
  form {
    display: flex;
    justify-content: center;
    gap: 1em;
    input {
      padding: 1em;
      font-size: 1.3em;
      width: 80%;
    }
    button {
      padding: 1em 2em;
      cursor: pointer;
      border-radius: 3px;
      font-size: 1.3em;
      outline: none;
      border: none;
      background-color: #13145c;
      color: #fff;
    }
  }
`;

export default Chats;
