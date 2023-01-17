import useLang from "../hooks/useLang";
import { capitalize } from "./string";

export const getDefaultFormState = (fields: any = {}) => {
  let result = {};
  Object.keys(fields).map((key) => {
    result[key] = fields[key].value || "";
  });
  return result;
};

export const getFields = (campos: any = []) => {
  const { t }: any = useLang();
  let result = {};
  let formSchema = {};

  campos.map((key) => {
    let auxN: number = -1;
    let auxS: string = "";
    let auxA: any = [];

    const field: any = {
      inputType: "text",
      required: false,
      readOnly: false,
      actions: ["add", "edit", "view"],
    };
    auxN = key.indexOf("*");
    if (auxN >= 0) {
      field.required = true;
      key = key.replace("*", "");
    }

    auxN = key.indexOf("|");
    if (auxN >= 0) {
      auxA = key.split("|");
      key = auxA[0];
      auxA[0] = "";
      auxA.map((item) => {
        if (item != "" && item.indexOf("::") > 0) {
          let auxA2: any = item.split("::");
          if (auxA2[0] == "_h_") {
            auxA2[0] = "header";
          }
          try {
            field[auxA2[0]] = JSON.parse(auxA2[1]);
          } catch (e) {
            field[auxA2[0]] = auxA2[1].replace("||", "|");
          }
        } else {
          if (item == "_h_") {
            field["header"] = true;
          } else {
            if (item != "") field["label"] = item;
          }
        }
      });
    }

    if (key == "id") {
      field.inputType = "hidden";
    }
    if (key == "password") {
      field.inputType = "password";
      field.rules = field.rules || "min:6|max:20";
      field.actions = ["add"];
    }
    if (key == "rol") {
      field.inputType = "select";
      field.options = field.options || {
        user: { label: t("User") },
        team: { label: t("Team") },
        admin: { label: t("Admin") },
        adm: { label: t("Admin") },
        owner: { label: t("Owner") },
      };
    }
    if (key == "status") {
      field.inputType = "select";
      field.options = field.options || {
        A: { label: t("Active") },
        X: { label: t("Inactive") },
      };
      field.value = field.value || "A";
      field.badge = true;
    }
    if (key == "email") {
      field.inputType = "email";
      field.rules = field.rules || "email";
    }
    auxN = key.indexOf("_id");
    if (auxN >= 0) {
      field.label = field.label || key.substring(0, auxN);
      field.inputType = "select";
      field.optionValue = "id";
      field.optionLabel = "name";
    }

    field.id = key;
    // if (columns && columns[key]) {
    //   if (columns[key].header) {
    //     field.label = field.label || columns[key].header;
    //   } else {
    //     field.label = field.label || capitalize(key);
    //     columns[key].header = field.label;
    //   }
    //   columns[key].type = field.inputType;
    //   if (field.options) {
    //     columns[key].options = field.options;
    //     columns[key].optionValue = field.optionValue;
    //     columns[key].optionLabel = field.optionLabel;
    //   }
    // }
    field.label = field.label || capitalize(key);
    result[key] = field;
    formSchema[key] = "";
  });
  return result;
};
