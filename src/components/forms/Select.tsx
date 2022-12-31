import React from "react";

const Select = (props: any) => {
  if (!props.options) return null;
  const clase = props.classDiv || "";
  const claser =
    (props.classInput || "") +
    " " +
    (props.rounded
      ? props.rounded === "l"
        ? "rounded-l-lg"
        : "rounded-r-lg"
      : "rounded-lg");
  const lista = [
    { value: "-1", label: props.placeholder || "Select" },
    ...props.options,
  ];

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

      <select
        name={props.name}
        id={props.name}
        className={claser}
        placeholder={props.placeholder || ""}
        required={props.required}
        onChange={props.onChange}
        value={props.value}
      >
        {lista.map((option: any) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <p className="px-2 mt-0 mb-1 text-xs text-red-600 dark:text-red-500">
        {props.error[props.name] || null} &nbsp;
      </p>
    </div>
  );
};

export default Select;
