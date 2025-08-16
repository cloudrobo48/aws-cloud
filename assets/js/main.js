import { validateInputs } from "/assets/js/validateInputs.js";
import { sendFormData } from "/assets/js/sendFormData.js";
import { updateUI } from "/assets/js/updateUI.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const button = document.getElementById("submitButton");
  const responseMessage = document.getElementById("responseMessage");

  let submitted = false;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (submitted) return;
    submitted = true;
    button.disabled = true;

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const validationResult = validateInputs({ name, email, message });
    if (!validationResult.success) {
      button.disabled = false;
      submitted = false; // バリデーション失敗時は再送信可能に
      return;
    }

    const response = await sendFormData({ name, email, message });
    updateUI(button, responseMessage, response);
  });
});
