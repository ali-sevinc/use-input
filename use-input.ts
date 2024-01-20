import { useState } from "react";

type ValidationFnc = (value: string) => boolean;
type ValidationArgumentsType = {
  validationFnc?: undefined | ValidationFnc;
  isNum?: undefined | true;
  minLength?: undefined | number;
  maxLength?: undefined | number;
  isEmail?: undefined | true;
};
type ValuesType = {
  value: string;
  inputIsInvalid: boolean;
  isValueValid: boolean;
};
type SetValuesType = {
  handleChange: (value: string) => void;
  handleBlur: () => void;
};
export default function useInput(
  validationArguments: ValidationArgumentsType,
  initialValue: string = ""
) {
  const [value, setValue] = useState<string>(initialValue);
  const [isBlur, setIsBlur] = useState<boolean>(false);

  let isValueValid: boolean = false;

  if (validationArguments?.validationFnc) {
    isValueValid = validationArguments.validationFnc(value);
  } else if (validationArguments?.isEmail) {
    const emailRegex = /^\S+@\S+\.\S+$/;
    isValueValid = emailRegex.test(value);
  } else if (validationArguments.isNum) {
    isValueValid = isNaN(+value);
  } else if (
    validationArguments?.minLength &&
    validationArguments?.minLength > 0
  ) {
    isValueValid = value.trim().length > validationArguments.minLength;
  } else if (
    validationArguments.maxLength &&
    validationArguments.maxLength > 0
  ) {
    isValueValid = value.trim().length < validationArguments.maxLength;
  }

  if (
    validationArguments?.maxLength &&
    validationArguments?.minLength &&
    validationArguments.minLength > 0 &&
    validationArguments?.maxLength > validationArguments.minLength
  ) {
    isValueValid =
      value.trim().length > validationArguments.minLength &&
      value.trim().length < validationArguments.maxLength;
  }
  const inputIsInvalid = !isValueValid && isBlur;

  function handleChange(enteredValue: string) {
    setValue(enteredValue);
    setIsBlur(false);
  }
  function handleBlur() {
    setIsBlur(true);
  }

  const values = { value, inputIsInvalid, isValueValid };
  const setFncs = { handleChange, handleBlur };

  return [values, setFncs] as [values: ValuesType, setFnc: SetValuesType];
}
