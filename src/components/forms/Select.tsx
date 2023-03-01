import ControlLabel from "./ControlLabel";

const Select = (props: any) => {
  if (!props.options) return null;
  let valueText = "";
  if (props.readOnly) {
    if (props.options.filter) {
      valueText = props.options.filter(
        (o: any) => o[props.optionValue || "id"] === props.value
      )[0];
      if (valueText) {
        valueText = valueText[props.optionLabel || "name"];
      }
    } else {
      valueText = props.options[props.value]?.label || "";
    }
  }
  return (
    <ControlLabel {...props}>
      {props.readOnly ? (
        <input
          type="text"
          name={props.name}
          id={props.name}
          className={props.className}
          required={props.required}
          disabled={true}
          readOnly={true}
          value={valueText || ""}
        />
      ) : (
        <select
          name={props.name}
          id={props.name}
          className={props.className}
          placeholder={props.placeholder || ""}
          required={props.required}
          onChange={props.onChange}
          onBlur={props.onBlur}
          value={props.value}
        >
          <option value="">{props.placeholder || "Seleccione..."}</option>
          {props.options.map
            ? props.options.map((option: any, key) => (
                <option
                  key={option[props.optionValue] || option.value || key}
                  value={option[props.optionValue] || option.value || key}
                  disabled={props.optionsDisabled?.includes(
                    option[props.optionValue] + ""
                  )}
                >
                  {option[props.optionLabel] || option.label}
                </option>
              ))
            : Object.keys(props.options).map((key) => (
                <option
                  key={key}
                  value={props.options[key][props.optionValue] || key}
                  disabled={props.optionsDisabled?.includes(
                    props.options[key][props.optionValue]
                  )}
                >
                  {props.options[key][props.optionValue] ||
                    props.options[key].label}
                </option>
              ))}
        </select>
      )}
    </ControlLabel>
  );
};

export default Select;
