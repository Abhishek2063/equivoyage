import React from "react";

const SubmitButton = (props) => {
  return (
    <div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-full w-full mt-4"
        onClick={props.onClick}
      >
        {props.buttonName}
      </button>
    </div>
  );
};

export default SubmitButton;
