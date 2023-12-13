import React from "react";
import SubmitButton from "@/components/submitButton";
import EmailInput from "@/components/emailInput";
import PasswordInput from "@/components/passwordInput";
import TextInput from "@/components/textInput";
import { handleInputChange, handleKeyDown, handleSubmitButton } from "./event";

const LoginForm = (props) => {
  return (
    <div>
      <form>
        {/* Form fields */}

        <EmailInput
          name="email"
          isRequired={true}
          value={props.loginDataState.email}
          placeholder="Enter email."
          label="Email"
          maxLength={255}
          error={props.loginErrState.email}
          onChange={(e) =>
            handleInputChange(
              e,
              "email",
              225,
              null,
              props.loginDataState,
              props.setLoginDataState,
              props.loginErrState,
              props.setLoginErrState
            )
          }
          onBlur={(e) =>
            handleInputChange(
              e,
              "email",
              225,
              null,
              props.loginDataState,
              props.setLoginDataState,
              props.loginErrState,
              props.setLoginErrState
            )
          }
          onKeyDown={(e) =>
            handleKeyDown(
              e,
              props.loginDataState,
              props.setLoginDataState,
              props.setLoginErrState,
              props.router
            )
          }
        />
        <PasswordInput
          name="password"
          isRequired={true}
          value={props.loginDataState.password}
          placeholder="Enter Password."
          label="Password"
          maxLength={255}
          error={props.loginErrState.password}
          onChange={(e) =>
            handleInputChange(
              e,
              "password",
              20,
              8,
              props.loginDataState,
              props.setLoginDataState,
              props.loginErrState,
              props.setLoginErrState
            )
          }
          onBlur={(e) =>
            handleInputChange(
              e,
              "password",
              20,
              8,
              props.loginDataState,
              props.setLoginDataState,
              props.loginErrState,
              props.setLoginErrState
            )
          }
          onKeyDown={(e) =>
            handleKeyDown(
              e,
              props.loginDataState,
              props.setLoginDataState,
              props.setLoginErrState,
              props.router
            )
          }
        />

        {/* Login button */}
        <SubmitButton
          buttonName="Sign In"
          onClick={(e) =>
            handleSubmitButton(
              e,
              props.loginDataState,
              props.setLoginDataState,
              props.setLoginErrState,
              props.router
            )
          }
        />
      </form>
    </div>
  );
};

export default LoginForm;
