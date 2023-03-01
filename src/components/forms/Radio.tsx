import ControlLabel from "./ControlLabel";

const Radio = (props: any) => {
  if (!props.options) return null;
  return (
    <ControlLabel {...props}>
      <div className="flex">
        {props.options.map((option: any) => (
          <div
            key={option.value}
            className={` flex items-center mr-4 ${props.classDiv}`}
          >
            <input
              name={props.name}
              id={option.name + option.value}
              type="radio"
              value={option.value}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              checked={props.value === option.value}
              onChange={props.onChange}
              onBlur={props.onBlur}
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
    </ControlLabel>
  );
};

export default Radio;
