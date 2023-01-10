import React from "react";
import Input from "./Input";
import Select from "./Select";

const DbForm = ({
  fields,
  formState,
  errors = {},
  handleChangeInput,
  action,
}: any) => {
  return (
    <div>
      {Object.keys(fields).map((key) => {
        const readOnly = action === "view" || fields[key].readOnly;
        if (fields[key].actions.indexOf(action) < 0) {
          return null;
        }
        if (fields[key].inputType == "select") {
          return (
            <div key={key}>
              <Select
                label={fields[key].label}
                name={key}
                error={errors}
                readOnly={readOnly}
                required={fields[key].required}
                value={formState[key]}
                onChange={handleChangeInput}
                onBlur={fields[key].onBlur}
                options={fields[key].options}
                optionValue={fields[key].optionValue}
                optionLabel={fields[key].optionLabel}
              ></Select>
            </div>
          );
        }
        return (
          <div key={key}>
            <Input
              label={fields[key].label}
              type={fields[key].inputType}
              name={key}
              error={errors}
              readOnly={readOnly}
              required={fields[key].required}
              value={formState[key]}
              onChange={handleChangeInput}
              onBlur={fields[key].onBlur}
            ></Input>
          </div>
        );
      })}
    </div>
  );
};

export default DbForm;
