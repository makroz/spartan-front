import React from "react";

const TextArea = (props: any) => {
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
      <textarea
        name={props.name}
        id={props.name}
        placeholder={props.placeholder || ""}
        className={claser}
        required={props.required}
        disabled={props.disabled}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
      />
      <p className="px-2 mt-0 mb-1 text-xs text-red-600 dark:text-red-500">
        {props.error[props.name] || null} &nbsp;
      </p>
    </div>
  );
};

export default TextArea;
