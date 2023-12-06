// api_helpers/validations/userValidation.js

import validator from "validator";

const validateUserInput = ({ firstName, lastName, email, password }) => {
  const errors = [];

  if (!validator.isLength(firstName, { min: 1, max: 20 })) {
    errors.push("First name must be between 1 and 20 characters.");
  }

  if (lastName && !validator.isLength(lastName, { max: 20 })) {
    errors.push("Last name must be less than or equal to 20 characters.");
  }

  if (!validator.isEmail(email)) {
    errors.push("Invalid email address.");
  }

  if (!validator.isLength(password, { min: 1, max: 255 })) {
    errors.push("Password must be between 1 and 255 characters.");
  }

  return errors;
};

const validateUpdateUserInput = ({ firstName, lastName, email, password }) => {
  const errors = [];

  if (firstName && !validator.isLength(firstName, { min: 1, max: 20 })) {
    errors.push("First name must be between 1 and 20 characters.");
  }

  if (lastName && !validator.isLength(lastName, { max: 20 })) {
    errors.push("Last name must be less than or equal to 20 characters.");
  }

  if (email && !validator.isEmail(email)) {
    errors.push("Invalid email address.");
  }

  if (password && !validator.isLength(password, { min: 1, max: 255 })) {
    errors.push("Password must be between 1 and 255 characters.");
  }

  return errors;
};
export { validateUserInput, validateUpdateUserInput };
