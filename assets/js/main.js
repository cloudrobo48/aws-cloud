import { validateInputs } from "/assets/js/validateInputs.js";
import { sendFormData } from "/assets/js/sendFormData.js";
import { updateUI } from "/assets/js/updateUI.js";

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("submitButton");

  if (!button) return;

  button.addEventListener("click", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const responseMessage = document.getElementById("responseMessage");

    const validationResult = validateInputs({ name, email, message });
    if (!validationResult.success) {
      updateUI(button, responseMessage, validationResult);
      return;
    }

    const response = await sendFormData({ name, email, message });
    updateUI(button, responseMessage, response);
  });
});
