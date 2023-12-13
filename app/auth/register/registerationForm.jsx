import React from "react";
import SubmitButton from "@/components/submitButton";
import EmailInput from "@/components/emailInput";
import PasswordInput from "@/components/passwordInput";
import TextInput from "@/components/textInput";
import { handleInputChange, handleKeyDown, handleSubmitButton } from "./event";

const RegisterationForm = (props) => {
  return (
    <div>
      <form>
        {/* Form fields */}

        <TextInput
          name="firstName"
          isRequired={true}
          value={props.registerDataState.firstName}
          placeholder="Enter first name."
          label="First Name"
          maxLength={20}
          error={props.registerErrState.firstName}
          onChange={(e) =>
            handleInputChange(
              e,
              "alphabetics",
              20,
              null,
              props.registerDataState,
              props.setRegisterDataState,
              props.registerErrState,
              props.setRegisterErrState
            )
          }
          onBlur={(e) =>
            handleInputChange(
              e,
              "alphabetics",
              20,
              null,
              props.registerDataState,
              props.setRegisterDataState,
              props.registerErrState,
              props.setRegisterErrState
            )
          }
          onKeyDown={(e) =>
            handleKeyDown(
              e,
              props.registerDataState,
              props.setRegisterDataState,
              props.setRegisterErrState,
              props.router
            )
          }
        />
        <TextInput
          name="lastName"
          isRequired={false}
          value={props.registerDataState.lastName}
          placeholder="Enter last name."
          label="Last Name"
          maxLength={20}
          error={props.registerErrState.lastName}
          onChange={(e) =>
            handleInputChange(
              e,
              "alphabetics",
              20,
              null,
              props.registerDataState,
              props.setRegisterDataState,
              props.registerErrState,
              props.setRegisterErrState
            )
          }
          onBlur={(e) =>
            handleInputChange(
              e,
              "alphabetics",
              20,
              null,
              props.registerDataState,
              props.setRegisterDataState,
              props.registerErrState,
              props.setRegisterErrState
            )
          }
          onKeyDown={(e) =>
            handleKeyDown(
              e,
              props.registerDataState,
              props.setRegisterDataState,
              props.setRegisterErrState,
              props.router
            )
          }
        />
        <EmailInput
          name="email"
          isRequired={true}
          value={props.registerDataState.email}
          placeholder="Enter email."
          label="Email"
          maxLength={255}
          error={props.registerErrState.email}
          onChange={(e) =>
            handleInputChange(
              e,
              "email",
              225,
              null,
              props.registerDataState,
              props.setRegisterDataState,
              props.registerErrState,
              props.setRegisterErrState
            )
          }
          onBlur={(e) =>
            handleInputChange(
              e,
              "email",
              225,
              null,
              props.registerDataState,
              props.setRegisterDataState,
              props.registerErrState,
              props.setRegisterErrState
            )
          }
          onKeyDown={(e) =>
            handleKeyDown(
              e,
              props.registerDataState,
              props.setRegisterDataState,
              props.setRegisterErrState,
              props.router
            )
          }
        />
        <PasswordInput
          name="password"
          isRequired={true}
          value={props.registerDataState.password}
          placeholder="Enter Password."
          label="Password"
          maxLength={255}
          error={props.registerErrState.password}
          onChange={(e) =>
            handleInputChange(
              e,
              "password",
              20,
              8,
              props.registerDataState,
              props.setRegisterDataState,
              props.registerErrState,
              props.setRegisterErrState
            )
          }
          onBlur={(e) =>
            handleInputChange(
              e,
              "password",
              20,
              8,
              props.registerDataState,
              props.setRegisterDataState,
              props.registerErrState,
              props.setRegisterErrState
            )
          }
          onKeyDown={(e) =>
            handleKeyDown(
              e,
              props.registerDataState,
              props.setRegisterDataState,
              props.setRegisterErrState,
              props.router
            )
          }
        />

        <PasswordInput
          name="confirmPassword"
          isRequired={true}
          value={props.registerDataState.confirmPassword}
          placeholder="Enter confirm password."
          label="Confirm Password"
          maxLength={255}
          error={props.registerErrState.confirmPassword}
          onChange={(e) =>
            handleInputChange(
              e,
              "password",
              20,
              8,
              props.registerDataState,
              props.setRegisterDataState,
              props.registerErrState,
              props.setRegisterErrState
            )
          }
          onBlur={(e) =>
            handleInputChange(
              e,
              "password",
              20,
              8,
              props.registerDataState,
              props.setRegisterDataState,
              props.registerErrState,
              props.setRegisterErrState
            )
          }
          onKeyDown={(e) =>
            handleKeyDown(
              e,
              props.registerDataState,
              props.setRegisterDataState,
              props.setRegisterErrState,
              props.router
            )
          }
        />
        {/* Register button */}
        <SubmitButton
          buttonName="Sign Up"
          onClick={(e) =>
            handleSubmitButton(
              e,
              props.registerDataState,
              props.setRegisterDataState,
              props.setRegisterErrState,
              props.router
            )
          }
        />
      </form>
    </div>
  );
};

export default RegisterationForm;
