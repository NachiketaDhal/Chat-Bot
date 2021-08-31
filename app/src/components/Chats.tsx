import React, { FormEvent, Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import io from "socket.io-client";

import "./_chats.scss";
import { appendMessage, formatDate, formatTime } from "../functions";
import { IAggregatedChats } from "../interfaces";
import axios from "axios";

const socket = io("http://localhost:8000");

const Chats = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [userName, setUserName] = useState("");
  const [aggregatedChats, setAggregatedChats] = useState<IAggregatedChats[]>(
    []
  );

  const fetchChats = async function () {
    const fetchedChats = await axios.get(
      "http://localhost:8000/api/chats/aggregated"
    );
    setAggregatedChats(fetchedChats.data.aggregatedChats);
    console.log(fetchedChats.data.aggregatedChats);
  };

  useEffect(() => {
    fetchChats();
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
      appendMessage(`${name} joined the chat`, "center");
    });
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue) {
      return;
    }

    const message = inputValue;
    appendMessage(
      `You: ${message}`,
      "right",
      new Date().toLocaleTimeString("en-US", { hour12: false })
    );
    socket.emit("send", message);

    setInputValue("");
  };

  // useEffect(() => {
  //   appendMessage(today, "date");
  // }, []);

  useEffect(() => {
    socket.on("receive", (data) => {
      // console.log(data);
      appendMessage(
        `${data.name}: ${data.message}`,
        "left",
        new Date().toLocaleTimeString("en-US", { hour12: false })
      );
    });
  }, []);

  useEffect(() => {
    if (userName === "Annonymous") return;
    socket.on("user-left", (name: string) => {
      appendMessage(`${name} left the chat`, "center");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <Container className="message-container">
        {aggregatedChats.map((aggrChat, i) => {
          const { day, month, year } = aggrChat._id;
          return (
            <React.Fragment key={i}>
              <div className="date">
                {formatDate(new Date(year, month - 1, day))}
              </div>
              {aggrChat.chats.map((m, index) => {
                return (
                  <div
                    key={index}
                    className={
                      m.classType === "center"
                        ? "center"
                        : m.name === userName
                        ? "right"
                        : "left"
                    }
                  >
                    {m.classType === "center"
                      ? ""
                      : m.name === userName
                      ? "You"
                      : m.name}
                    {m.classType === "center" ? "" : ":"} {m.message}
                    {m.classType !== "center" && (
                      <span className="time">{formatTime(m.createdAt)}</span>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          );
        })}
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
