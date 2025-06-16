document.getElementById("submitButton").addEventListener("click", async (event) => {
    event.preventDefault(); // デフォルトのフォーム送信を無効化

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const responseMessage = document.getElementById("responseMessage");
    const button = document.getElementById("submitButton");
    
    // バリデーションチェック
    if (!name || !email || !message) {
        responseMessage.style.display = "block";
        responseMessage.style.color = "red";
        responseMessage.textContent = "すべての項目を入力してください。";
        return;
    }

    // ボタンを無効化して「送信中...」と表示
    button.disabled = true;
    button.textContent = "送信中...";

    try {
        const response = await fetch("https://your-real-api-url.com", { // 正しいエンドポイントを設定
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, message })
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
        console.error("送信エラー:", error); // エラーの詳細情報をコンソールに出力
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

document.addEventListener("DOMContentLoaded", () => {
    const headings = document.querySelectorAll("h1, h2"); // h1 と h2 のみ取得
    const nav = document.getElementById("sidebar-nav");

    headings.forEach((heading) => {
        if (!heading.id) {
            heading.id = "section-" + heading.textContent.replace(/\s+/g, "-").toLowerCase();
        }

        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.href = "#" + heading.id;
        link.textContent = heading.textContent;

        listItem.appendChild(link);
        nav.appendChild(listItem);
    });
});
