export function updateUI(button, responseMessage, status) {
  responseMessage.style.display = "block";
  responseMessage.style.color = status.success ? "green" : "red";
  responseMessage.textContent = status.message;

  button.disabled = true;
  button.textContent = "送信中...";

  setTimeout(() => {
    button.disabled = false;
    button.textContent = "送信";
  }, 2000);
}
