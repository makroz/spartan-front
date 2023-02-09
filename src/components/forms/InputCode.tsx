import React, { useEffect } from "react";

const InputCode = ({
  setCode,
  type = "text",
  placeholder = "●",
  name,
  label,
  value = "",
}: any) => {
  let inputElements: any[] = [];
  const sendCode = () => {
    inputElements = [...document.querySelectorAll("input.code-input")];
    const code = inputElements.map(({ value }) => value).join("");
    setCode(code.trim());
    // console.log("code interno", code);
  };
  useEffect(() => {
    inputElements = [...document.querySelectorAll("input.code-input")];
    inputElements.forEach((ele, index) => {
      ele.addEventListener("keydown", (e: any) => {
        if (e.keyCode === 8 && e.target.value === "")
          inputElements[Math.max(0, index - 1)].focus();
      });
      ele.addEventListener("input", (e: any) => {
        const first = e.target.value[0];
        const rest = e.target.value.slice(1);

        e.target.value = first ?? "";

        const lastInputBox = index === inputElements.length - 1;
        const didInsertContent = first !== undefined;
        if (!first) {
          if (index > 0) inputElements[index - 1].focus();
          sendCode();
          return;
        }

        if (!rest && !lastInputBox) {
          inputElements[index + 1].focus();
          sendCode();
          return;
        }

        if (didInsertContent && !lastInputBox) {
          inputElements[index + 1].focus();
          inputElements[index + 1].value = rest;
          inputElements[index + 1].dispatchEvent(new Event("input"));
        }
        sendCode();
      });
    });
  }, []);

  const onChange = (e: any) => {};
  return (
    <>
      <div className={`input`}>
        <label htmlFor={name} className={`input-label`}>
          {label}
        </label>
        <div className="flex items-center content-between gap-3 lg:w-96 mb-4">
          <input
            name="code"
            id="code1"
            className="   text-center code-input grow w-6 focus:ring-2 rounded-lg  focus:ring-green-500 focus:outline-none"
            required
            placeholder={placeholder}
            autoComplete="new-password"
            value={value[0] || ""}
            type={type}
            onChange={onChange}
          />
          <input
            name="code"
            id="code2"
            className="  text-center code-input grow w-6 focus:ring-2 rounded-lg  focus:ring-green-500 focus:outline-none "
            required
            placeholder={placeholder}
            autoComplete="new-password"
            value={value[1] || ""}
            type={type}
            onChange={onChange}
          />
          <input
            name="code"
            id="code3"
            className="  text-center code-input grow w-6 focus:ring-2 rounded-lg  focus:ring-green-500 focus:outline-none "
            required
            placeholder={placeholder}
            autoComplete="new-password"
            value={value[2] || ""}
            type={type}
            onChange={onChange}
          />
          <input
            name="code"
            id="code4"
            className="   text-center code-input grow w-6 focus:ring-2 rounded-lg  focus:ring-green-500 focus:outline-none "
            required
            placeholder={placeholder}
            autoComplete="new-password"
            value={value[3] || ""}
            type={type}
            onChange={onChange}
          />
        </div>
      </div>
    </>
  );
};
export default InputCode;
