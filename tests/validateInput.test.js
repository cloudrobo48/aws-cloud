import { validateInputs } from "../assets/js/validateInputs.js";

describe("validateInputs", () => {
  test("全項目が埋まっていると成功する", () => {
    const result = validateInputs({
      name: "太郎",
      email: "taro@example.com",
      message: "こんにちは",
    });
    expect(result).toEqual({ success: true });
  });

  test("nameが空だとエラーを返す", () => {
    const result = validateInputs({
      name: "",
      email: "taro@example.com",
      message: "こんにちは",
    });
    expect(result).toEqual({
      success: false,
      message: "すべての項目を入力してください。",
    });
  });

  test("emailが空だとエラーを返す", () => {
    const result = validateInputs({
      name: "太郎",
      email: "",
      message: "こんにちは",
    });
    expect(result.success).toBe(false);
  });

  test("messageが空だとエラーを返す", () => {
    const result = validateInputs({
      name: "太郎",
      email: "taro@example.com",
      message: "",
    });
    expect(result.success).toBe(false);
  });
});
