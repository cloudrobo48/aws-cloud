export function updateUI(button, responseMessage, status) {
  responseMessage.style.display = "block";
  responseMessage.style.color = status.success ? "green" : "red";
  responseMessage.textContent = status.message;
}
