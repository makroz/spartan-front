import React from "react";

const Input = (props: any) => {
  const clase = props.classDiv || "";
  const claser =
    (props.classInput || "") +
    " " +
    (props.rounded
      ? props.rounded === "l"
        ? "rounded-l-lg"
        : "rounded-r-lg"
      : "rounded-lg");

  return (
    <div className={`input ${clase}`}>
      <label
        htmlFor={props.name}
        className={`input-label ${
          props.required ? "text-black font-bold" : null
        }`}
      >
        {props.label} {props.required ? "*" : null}
      </label>
      <input
        type={props.type || "text"}
        min={props.min}
        max={props.max}
        name={props.name}
        id={props.name}
        placeholder={props.placeholder || ""}
        className={claser}
        required={props.required}
        disabled={props.disabled}
        readOnly={props.readOnly}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
        autoComplete={props.type === "password" ? "off" : "on"}
      />

      <p
        className={`px-2 mt-0 mb-1 text-xs ${
          props.error[props.name]
            ? "text-red-600"
            : props.message
            ? "text-green-600"
            : ""
        }`}
      >
        {props.error[props.name] || props.message || null} &nbsp;
      </p>
    </div>
  );
};

export default Input;
