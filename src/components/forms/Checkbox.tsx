const Checkbox = (props: any) => {
  const clase = props.classDiv || "";
  return (
    <>
      <div className={`${clase} inline-flex `}>
        <label
          htmlFor={props.name}
          className={`input-label mr-2 ${
            props.required ? "text-black font-bold" : null
          }`}
        >
          {props.label} {props.required ? "*" : null}
        </label>

        <div className="relative  items-center   cursor-pointer">
          <input
            type="checkbox"
            name={props.name}
            id={props.name}
            className="sr-only peer"
            required={props.required}
            disabled={props.disabled}
            readOnly={props.readOnly}
            onChange={props.onChange}
            onBlur={props.onBlur}
            value={props.optionValue[0] || "Y"}
            checked={
              props.value == (props.optionValue[0] ? props.optionValue[0] : "Y")
            }
          />
          <div className="w-9 h-5 pt-1 px-1 text-[8px] text-right bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600  peer-checked:text-white peer-checked:text-left">
            {props.value == (props.optionValue[0] ? props.optionValue[0] : "Y")
              ? props.optionLabel[0]
              : props.optionLabel[1]}
          </div>
        </div>
      </div>
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
    </>
  );
};

export default Checkbox;
