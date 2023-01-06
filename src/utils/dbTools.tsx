import { capitalize } from "./string";

export const getFields = (campos: any = []) => {
    let result = {};
    let formSchema = {};
    campos.map((key) => {
      const field = {
        id: key,
        inputType: "text",
        label: capitalize(key),
        required: true,
        readOnly: false,
        actions: ["add", "edit", "show"],
        className: "",
        validate: [],
      };
      if (key == "id") {
        field.inputType = "hidden";
      }
      result[key] = field;
      formSchema[key] = "";
    });
    return [result, formSchema];
  };
  