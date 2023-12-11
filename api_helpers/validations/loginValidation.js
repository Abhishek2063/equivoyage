import validator from "validator";

const validateLoginInput = ({ email, password }) => {
  const errors = [];

  if (!validator.isEmail(email)) {
    errors.push("Invalid email address.");
  }

  if (!validator.isLength(password, { min: 1, max: 255 })) {
    errors.push("Password must be between 1 and 255 characters.");
  }

  return errors;
};
export { validateLoginInput };
