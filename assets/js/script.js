document.getElementById("submitButton").addEventListener("click", async () => {
    const button = document.getElementById("submitButton");
    const responseMessage = document.getElementById("responseMessage");

    // ボタンを無効化して「送信中...」と表示
    button.disabled = true;
    button.textContent = "送信中...";

    try {
        const response = await fetch("https://your-api-gateway-url", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: "お問い合わせ内容" })
        });

        if (response.ok) {
            responseMessage.style.display = "block";
            responseMessage.style.color = "green";
            responseMessage.textContent = "送信しました！";
        } else {
            responseMessage.style.display = "block";
            responseMessage.style.color = "red";
            responseMessage.textContent = "送信に失敗しました。もう一度試してください。";
        }
    } catch (error) {
        responseMessage.style.display = "block";
        responseMessage.style.color = "red";
        responseMessage.textContent = "エラーが発生しました。ネットワークを確認してください。";
    }

    // 2秒後にボタンを元に戻す
    setTimeout(() => {
        button.disabled = false;
        button.textContent = "送信";
    }, 2000);
});
