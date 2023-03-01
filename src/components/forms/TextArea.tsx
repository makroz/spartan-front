import ControlLabel from "./ControlLabel";

const TextArea = (props: any) => {
  return (
    <ControlLabel {...props} classDiv={props.classDiv + " flex flex-col"}>
      <textarea
        name={props.name}
        id={props.name}
        placeholder={props.placeholder || ""}
        className={props.className}
        required={props.required}
        disabled={props.disabled}
        readOnly={props.readOnly}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
      />
    </ControlLabel>
  );
};

export default TextArea;
