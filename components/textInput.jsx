import React from "react";

const TextInput = (props) => {
  const isError = props.error ? "border-red-500" : "";
  const labelClassName = props.isRequired
    ? "block text-sm font-medium "
    : "block text-sm font-medium ";

  return (
    <div className="mb-4">
      <label htmlFor={props.name} className={labelClassName}>
        <span className="text-dark">{props.label}</span>
        {props.isRequired && <span className="text-red-600">*</span>}
      </label>
      <input
        type="text"
        id={props.name}
        name={props.name}
        value={props.value}
        className={`p-2 w-full border ${isError} rounded-2xl inputTextField bg-transparent border-gray-900`}
        onChange={props.onChange}
        onBlur={props.onBlur}
        onKeyDown={props.onKeyDown}
        placeholder={props.placeholder}
        maxLength={props.maxLength}
      />
      {props.error && <p className="text-red-600">{props.error}</p>}
    </div>
  );
};

export default TextInput;
