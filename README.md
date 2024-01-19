# Use Input Easy

A custom hook for React to use input change and validation handler.

## Instalation

npm install @use-input

## How to use

This hook return an array with two elements.

First Element (values): An object contained "value, isValueValid, inputIsInvalid"
value -> Input value
isValueValid -> A boolean variable derived by value returned with your validationFunction
inputIsInvalid -> A boolean variable that indicates whether there is a validation error when it onBlur.

Second Element (setFunctions): An object contained "handleBlur, handleChange"
handleBlur -> Check if the input blur or not.
handleChange -> Input value change handler.

### Example
```typescript
import useInput from "use-input-easy";

//simply validation functions.
function checkConfirmPassword(pass: string, confPass: string) {
  return confPass.trim().length !== 0 && pass === confPass;
}

export default function Form() {
  //you can either pass built-in validation check methods or your own validation function

  //isEmail -->
  const [emailState, setEmailState] = useInput({ isEmail: true });

  //minLength -->
  const [passwordState, setPasswordState] = useInput({ minLength: 5 });

  //own validation function
  const [confPassState, setConfPassState] = useInput({
    validationFnc: (value) => checkConfirmPassword(value, passwordState.value),
  });

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!emailState.isValueValid) setEmailState.handleBlur();
    if (!passwordState.isValueValid) setPasswordState.handleBlur();
    if (!confPassState.isValueValid) setPasswordState.handleBlur();

    if (
      !emailState.isValueValid ||
      !passwordState.isValueValid ||
      !confPassState.isValueValid
    )
      return;

    console.log("[Email]: ", emailState.value);
    console.log("[Password]: ", passwordState.value);
    console.log("[Confirm Password]: ", confPassState.value);

    setEmailState.handleChange("");
    setPasswordState.handleChange("");
    setConfPassState.handleChange("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <p>
          <input
            id="email"
            type="email"
            onBlur={setEmailState.handleBlur}
            value={emailState.value}
            onChange={(e) => setEmailState.handleChange(e.target.value)}
          />
          {emailState.inputIsInvalid && <span>Please enter a valid email</span>}
        </p>
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <p>
          <input
            id="password"
            type="password"
            onBlur={setPasswordState.handleBlur}
            value={passwordState.value}
            onChange={(e) => setPasswordState.handleChange(e.target.value)}
          />
          {passwordState.inputIsInvalid && (
            <span>Please enter a valid password min 6 chars</span>
          )}
        </p>
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <p>
          <input
            id="confirmPassword"
            type="password"
            onBlur={setConfPassState.handleBlur}
            value={confPassState.value}
            onChange={(e) => setConfPassState.handleChange(e.target.value)}
          />
          {confPassState.inputIsInvalid && (
            <span>Passwords should matched.</span>
          )}
        </p>
      </div>
      <div>
        <button>Submit</button>
      </div>
    </form>
  );
}
```

## Check values

isEmail -> true or undefined
isNum -> true or undefined
minLength -> number or undefined
maxLength -> number or undefined
ownFunction -> (value: string) => boolean;
