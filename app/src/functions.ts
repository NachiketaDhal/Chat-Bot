import { IAggregatedChats } from "./interfaces";

export const appendMessage = (
  message: string,
  position: string,
  time?: any
) => {
  const messageElement = document.createElement("div");
  const timeElement = document.createElement("span");
  messageElement.innerHTML = message;
  messageElement.classList.add(position);
  if (time) {
    timeElement.innerHTML = time;
    timeElement.classList.add("time");
    messageElement.appendChild(timeElement);
  }
  document.querySelector(".message-container")?.append(messageElement);
};

export const formatDate = function (date: any) {
  return new Date(date).toLocaleDateString();
};

export const formatTime = function (time: any) {
  return new Date(time).toLocaleTimeString("en-US", { hour12: false });
};

export const customSortingOfDates = function (arr: IAggregatedChats[]) {
  arr.sort((a, b) => {
    return (
      new Date(a._id.year, a._id.month - 1, a._id.day).valueOf() -
      new Date(b._id.year, b._id.month - 1, b._id.day).valueOf()
    );
  });
  return arr;
};
