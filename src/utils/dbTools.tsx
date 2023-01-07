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
    let required = false;
    let auxN = -1;
    let auxS = "";

    auxN = key.indexOf("*");
    if (auxN >= 0) {
      required = true;
      key = key.replace("*", "");
    }

    const field: any = {
      id: key,
      inputType: "text",
      label: capitalize(key),
      required: required,
      readOnly: false,
      actions: ["add", "edit", "view"],
      className: "",
      rules: "",
      options: [],
    };

    if (key == "id") {
      field.inputType = "hidden";
    }
    if (key == "password") {
      field.inputType = "password";
      field.rules = "min:6|max:20";
      field.actions = ["add"];
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
      field.value = "A";
    }
    if (key == "email") {
      field.rules = "email";
    }
    auxN = key.indexOf("_id");
    if (auxN >= 0) {
      field.label = field.label.substring(0, auxN);
      field.inputType = "select";
    }

    result[key] = field;
    formSchema[key] = "";
  });
  return result;
};
