export function validateInputs({ name, email, message }) {
  if (!name || !email || !message) {
    return {
      success: false,
      message: "すべての項目を入力してください。",
    };
  }
  return { success: true };
}
