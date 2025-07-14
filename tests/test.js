// hello.test.js
function sayHello(name) {
  return `こんにちは、${name}さん！`;
}

test("挨拶が正しく返されるか", () => {
  expect(sayHello("太郎")).toBe("こんにちは、太郎さん！");
});
