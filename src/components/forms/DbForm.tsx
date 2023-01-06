import React from "react";

const DbForm = ({ fields = [] }: any) => {
  return (
    <div>
      {Object.keys(fields).map((key) => (
        <div key={fields[key].id}>
          <label htmlFor={fields[key].id}>{fields[key].label}</label>
          <input
            type={fields[key].inputType}
            id={fields[key].id}
            name={fields[key].id}
          />
        </div>
      ))}
    </div>
  );
};

export default DbForm;
