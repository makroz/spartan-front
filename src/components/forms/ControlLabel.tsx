const ControlLabel = (props) => {
  const clase = props.classDiv || "";

  return (
    <div className={`input ${clase} relative`}>
      {props.type === "hidden" ? null : (
        <label
          htmlFor={props.name}
          className={`input-label ${
            props.required ? "text-black font-bold" : null
          }`}
        >
          {props.label} {props.required ? "*" : null}
        </label>
      )}
      {props.children}
      {props.type === "hidden" || !props.error ? null : (
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
      )}
    </div>
  );
};

export default ControlLabel;
