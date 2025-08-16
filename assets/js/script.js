document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("submitButton");

  if (!button) {
    console.error("submitButton が見つかりません！");
    return;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const button = document.getElementById("submitButton");
    const responseMessage = document.getElementById("responseMessage");

    let submitted = false;

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (submitted) return;

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        responseMessage.style.display = "block";
        responseMessage.style.color = "red";
        responseMessage.textContent = "すべての項目を入力してください。";
        return;
      }

      submitted = true;
      button.textContent = "送信中...";

      try {
        const response = await fetch("https://devJourney.fieldwork48.com", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message }),
        });

        responseMessage.style.display = "block";
        responseMessage.style.color = response.ok ? "green" : "red";
        responseMessage.textContent = response.ok
          ? "送信しました。ご連絡ありがとうございました。"
          : "送信に失敗しました。";
        button.textContent = response.ok ? "送信完了" : "送信失敗";
      } catch (error) {
        console.error("送信エラー:", error);
        responseMessage.style.display = "block";
        responseMessage.style.color = "red";
        responseMessage.textContent = "ネットワークエラーが発生しました。";
        button.textContent = "送信失敗";
      }

      // ボタンは再度有効化しない
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded 発火！");
  const headings = document.querySelectorAll("h2");
  console.log("見出し取得:", headings);

  //  const nav = document.getElementById("sidebar-nav");
  //  console.log("sidebar-nav:", nav);

  //  if (!nav) {
  //    console.error("sidebar-nav が見つかりません！");
  //    return;
  //  }

  headings.forEach((heading) => {
    if (!heading.id) {
      heading.id =
        "section-" + heading.textContent.replace(/\s+/g, "-").toLowerCase();
    }

    const link = document.createElement("a");
    link.href = "#" + heading.id;
    link.textContent = heading.textContent;

    const listItem = document.createElement("li");
    listItem.appendChild(link);
    //    nav.appendChild(listItem);
  });

  console.log("メニュー生成完了");
});
