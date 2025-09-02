export async function sendFormData(payload) {
  try {
    const response = await fetch("https://dummy.url/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return {
      success: response.ok,
      message: response.ok
        ? "送信しました。ご連絡ありがとうございました。"
        : "送信に失敗しました。",
    };
  } catch (error) {
    console.error("送信エラー:", error);
    return {
      success: false,
      message: "ネットワークエラーが発生しました。",
    };
  }
}
