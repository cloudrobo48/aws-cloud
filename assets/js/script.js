document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("submitButton");
    
    if (!button) {
        console.error("submitButton が見つかりません！");
        return;
    }

    button.addEventListener("click", async (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();
        const responseMessage = document.getElementById("responseMessage");

        if (!name || !email || !message) {
            responseMessage.style.display = "block";
            responseMessage.style.color = "red";
            responseMessage.textContent = "すべての項目を入力してください。";
            return;
        }

        button.disabled = true;
        button.textContent = "送信中...";

        try {
            const response = await fetch("https://your-real-api-url.com", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message })
            });

            responseMessage.style.display = "block";
            responseMessage.style.color = response.ok ? "green" : "red";
            responseMessage.textContent = response.ok ? "送信しました！" : "送信に失敗しました。";
        } catch (error) {
            console.error("送信エラー:", error);
            responseMessage.style.display = "block";
            responseMessage.style.color = "red";
            responseMessage.textContent = "ネットワークエラーが発生しました。";
        }

        setTimeout(() => {
            button.disabled = false;
            button.textContent = "送信";
        }, 2000);
    });
});
