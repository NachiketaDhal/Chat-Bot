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
