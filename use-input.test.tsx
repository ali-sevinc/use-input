import { renderHook } from "@testing-library/react";
import useInput from "./use-input";

describe("use-input-testings", () => {
  //testing if the value is number?
  test("number check test 'true'", () => {
    const { result } = renderHook(() => useInput({ isNum: true }, "0"));
    console.log(result.current[0]);
    expect(result.current[0].isValueValid).toBe(true);
  });
  test("number check test 'false'", () => {
    const { result } = renderHook(() => useInput({ isNum: true }, "number"));
    console.log(result.current[0]);
    expect(result.current[0].isValueValid).toBe(false);
  });

  //testing if the value is email?
  test("email check test 'true'", () => {
    const { result } = renderHook(() =>
      useInput({ isEmail: true }, "test@test.com")
    );
    console.log(result.current[0]);
    expect(result.current[0].isValueValid).toBe(true);
  });
  test("email check test 'false'", () => {
    const { result } = renderHook(() =>
      useInput({ isEmail: true }, "test@test")
    );
    console.log(result.current[0]);
    expect(result.current[0].isValueValid).toBe(false);
  });

  //texting max length check
  test("testing max length 'true'", () => {
    const { result } = renderHook(() => useInput({ maxLength: 5 }, "test"));
    console.log(result.current[0]);
    expect(result.current[0].isValueValid).toBe(true);
  });
  test("testing max length 'false'", () => {
    const { result } = renderHook(() => useInput({ maxLength: 5 }, "testtest"));
    console.log(result.current[0]);
    expect(result.current[0].isValueValid).toBe(false);
  });

  //Testing min length check
  test("testing min length 'true'", () => {
    const { result } = renderHook(() => useInput({ minLength: 5 }, "testtest"));
    console.log(result.current[0]);
    expect(result.current[0].isValueValid).toBe(true);
  });
  test("testing min length 'false'", () => {
    const { result } = renderHook(() => useInput({ minLength: 5 }, "test"));
    console.log(result.current[0]);
    expect(result.current[0].isValueValid).toBe(false);
  });

  //own falidation functions check

  function checkConfirmPassword(pass: string, confPass: string = "test123") {
    return confPass.trim().length !== 0 && pass === confPass;
  }

  test("own validation function 'true'", () => {
    const { result } = renderHook(() =>
      useInput(
        { validationFnc: (value) => checkConfirmPassword(value) },
        "test123"
      )
    );
    console.log(result.current[0]);
    expect(result.current[0].isValueValid).toBe(true);
  });
  test("own validation function 'false'", () => {
    const { result } = renderHook(() =>
      useInput(
        { validationFnc: (value) => checkConfirmPassword(value) },
        "123test"
      )
    );
    console.log(result.current[0]);
    expect(result.current[0].isValueValid).toBe(false);
  });
});
