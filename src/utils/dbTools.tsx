import { capitalize } from "./string";

export const getDefaultFormState = (fields: any = {}) => {
  let result = {};
  Object.keys(fields).map((key) => {
    result[key] = fields[key].value || "";
  });
  return result;
};

export const getFields = (campos: any = []) => {
  let result = {};
  let formSchema = {};
  campos.map((key) => {
    const field: any = {
      id: key,
      inputType: "text",
      label: capitalize(key),
      required: true,
      readOnly: false,
      actions: ["add", "edit", "view"],
      className: "",
      validate: [],
      options: [],
    };
    if (key == "id") {
      field.inputType = "hidden";
    }
    if (key == "password") {
      field.inputType = "password";
    }
    if (key == "email") {
      field.inputType = "email";
    }
    if (key == "rol") {
      field.inputType = "select";
      field.options = [
        { value: "adm", label: "Administrador" },
        { value: "usr", label: "Usuario" },
      ];
    }
    if (key == "status") {
      field.inputType = "select";
      field.options = [
        { value: "A", label: "Activo" },
        { value: "X", label: "Inactivo" },
      ];
    }

    result[key] = field;
    formSchema[key] = "";
  });
  return result;
};
