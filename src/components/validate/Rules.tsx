import t from "../../utils/traductor";

export const validRule = (value, rules, formState) => {
  if (!rules) return "";
  const [rule, params] = (rules + ":").split(":");
  let param: any = [];
  if (params && params.length > 0) {
    param = (params + "" + ",").split(",");
  }

  switch (rule) {
    case "required":
      return !value ? t("is Required") : "";
    case "same":
      return value != formState[param[0]] ? t("must be the same") : "";
    case "min":
      return value.length < param[0]
        ? t("min ") + param[0] + t(" characters")
        : "";
    case "max":
      return value.length > param[0]
        ? t("max ") + param[0] + t(" characters")
        : "";
    case "email":
      return !/\S+@\S+\.\S+/.test(value) ? t("is not a valid email") : "";
    case "number":
      return !/^[0-9.,-]+$/.test(value) ? t("is not a valid number") : "";
    case "alpha":
      return !/^[a-zA-Z]+$/.test(value) ? t("is not a valid text") : "";
    case "noSpaces":
      return !/^\S+$/.test(value) ? t("is not a valid text") : "";
    case "greater":
      return value < param[0] ? t("must be greater than ") + param[0] : "";
    case "less":
      return value > param[0] ? t("must be less than ") + param[0] : "";
    case "between":
      return value < param[0] || value > param[1]
        ? t("must be between ") + param[0] + t(" and ") + param[1]
        : "";
    case "regex":
      return !new RegExp(param[0]).test(value) ? t("is not a valid value") : "";
    default:
      return "";
  }
};

export const checkRules = (columns, action, formState) => {
  let errors = {};
  for (const key in columns) {
    const el = columns[key];
    if (el.actions?.includes(action)) {
      const el = columns[key];

      if (el.required && !formState[key]) {
        errors = { ...errors, [key]: el.label + t(" is Required") };
      }
      if (el.rules) {
        const rules = (el.rules + "|").split("|");
        for (const rule of rules) {
          const error = validRule(formState[key], rule, formState);
          if (error) {
            errors = { ...errors, [key]: el.label + " " + error };
          }
        }
      }
    }
  }
  return errors;
};
