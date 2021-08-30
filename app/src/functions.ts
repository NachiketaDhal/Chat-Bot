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
