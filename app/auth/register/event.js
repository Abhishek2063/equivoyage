import { post } from "@/common/api";
import { fieldValidator } from "@/common/custom";
import { API_CREATE_USER, LOGIN } from "@/routeConstant";
import { message } from "antd";

export const handleInputChange = (
  event,
  type,
  maxLength,
  minLength,
  state,
  setState,
  errorState,
  setErrorState
) => {
  let value = event.target.value;
  if (type === "password" || type === "email") {
    value = value.replace(/\s+/g, "");
  }
  let error = checkValidation(
    event.target.name,
    value,
    type,
    maxLength,
    minLength,
    state
  );
  setErrorState({
    ...errorState,
    [error.fieldNameErr]: error.errorMsg,
    [error.fieldCls]: error.setClassName,
  });
  setState({
    ...state,
    [event.target.name]: value,
  });
};

// Check Validation Function
export const checkValidation = (
  field,
  value,
  type,
  maxLength,
  minLength,
  state
) => {
  return fieldValidator(
    field,
    value,
    type,
    maxLength,
    minLength,
    state.password
  );
};

export const handleSubmitButton = async (
  event,
  state,
  setState,
  setErrorState,
  router
) => {
  event.preventDefault();
  const isFormValid = validateForm(state, setErrorState);
  if (isFormValid) {
    const newData = {
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      password: state.password,
    };
    const createdUser = await post(API_CREATE_USER, newData, false);
    if (createdUser.success) {
      message.success(createdUser.message);
      setState({
        ...state,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      router.push(LOGIN);
    } else {
      message.error(createdUser.message);
    }
  }
};

export const validateForm = (state, setErrorState) => {
  const errors = {};
  for (const key in state) {
    if (state.hasOwnProperty(key)) {
      let type = "";
      let maxLength = null;
      let minLength = null;
      if (key === "firstName" || key === "lastName") {
        type = "alphabetics";
        maxLength = 20;
        minLength = null;
      }
      if (key === "email") {
        type = "email";
        maxLength = 255;
        minLength = null;
      }
      if (key === "password" || key === "confirmPassword") {
        type = "password";
        maxLength = 20;
        minLength = 8;
      }
      const error = checkValidation(
        key,
        state[key],
        type,
        maxLength,
        minLength,
        state
      );
      if (error.errorMsg) {
        errors[error.fieldNameErr] = error.errorMsg;
        errors[error.fieldCls] = error.setClassName;
      }
    }
  }
  setErrorState(errors);
  return Object.keys(errors).length === 0; // Form is valid if no errors are present
};

export const handleKeyDown = (event, state, setState, setErrorState,router) => {
  if (event.key === "Enter" || event.key === "enter") {
    handleSubmitButton(event, state, setState, setErrorState,router);
  }
};
