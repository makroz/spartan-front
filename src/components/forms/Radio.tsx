import React from "react";

const Radio = (props: any) => {
  if (!props.options) return null;
  const clase = props.classDiv || "";
  // const claser =
  //   props.classNameInput +
  //   " " +
  //   (props.rounded
  //     ? props.rounded === "l"
  //       ? "rounded-l-lg"
  //       : "rounded-r-lg"
  //     : "rounded-lg");

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
      <div className="flex">
        {props.options.map((option: any) => (
          <div
            key={option.value}
            className={` flex items-center mr-4 ${clase}`}
          >
            <input
              name={props.name}
              id={option.name + option.value}
              type="radio"
              value={option.value}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              checked={props.value === option.value}
              onChange={props.onChange}
              required={props.required}
            />
            <label
              htmlFor={option.name + option.value}
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      <p className="px-2 mt-0 mb-1 text-xs text-red-600">
        {props.error[props.name] || null} &nbsp;
      </p>
    </div>
  );
};

export default Radio;
