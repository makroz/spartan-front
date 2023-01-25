import { Card, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { getDefaultFormState } from "../utils/dbTools";
import { capitalize } from "../utils/string";
import t from "../utils/traductor";
import DataModal from "./DataModal";
import DataTable from "./DataTable";
import DbForm from "./forms/DbForm";

const DataCrud = ({
  modulo,
  columns,
  title = "",
  msg = "",
  formState,
  setFormState,
  errorsForm,
  setErrorsForm,
  param = {},
  onClickRowChildren = null,
}: any) => {
  const [openModal, setOpenModal] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [errorForm, setErrorForm] = useState({});
  const [action, setAction] = useState("view");
  title = capitalize(title || modulo);
  const [params, setParams] = useState({
    page: 1,
    perPage: 10,
    sortBy: "id",
    orderBy: "asc",
    searchBy: "",
    relations: [],
    ...param,
  });
  const { data, error, loaded, execute, reLoad } = useAxios(
    "/" + modulo,
    "GET",
    { ...params }
  );

  useEffect(() => {
    setFormState(getDefaultFormState(columns));
    reLoad({ ...params, origen: "reLoad" }, true);
  }, [params]);

  const validRule = (value, rules) => {
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
        return !new RegExp(param[0]).test(value)
          ? t("is not a valid value")
          : "";
      default:
        return "";
    }
  };
  const checkRules = () => {
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
            const error = validRule(formState[key], rule);
            if (error) {
              errors = { ...errors, [key]: el.label + " " + error };
            }
          }
        }
      }
    }
    return errors;
  };

  const handleChangeInput = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    if (columns[e.target.name].onChange) {
      columns[e.target.name].onChange(e.target.value, formState, setFormState);
    }
  };
  const onChangeSort = (sortBy, orderBy) => {
    if (params.sortBy == sortBy && params.orderBy == orderBy) return;
    setParams({ ...params, sortBy, orderBy });
  };
  const onChangePage = (page) => {
    if (params.page == page) return;
    setParams({ ...params, page });
  };
  const onChangePerPage = (e) => {
    let perPage = e.target.value;
    if (params.perPage == perPage) return;
    if (!perPage) perPage = -1;
    setParams({ ...params, perPage });
  };

  const onSave = (data) => {
    const errors = { ...checkRules(), ...errorsForm };
    setErrorForm(errors);
    if (Object.keys(errors).length > 0) return;
    let payLoad = {};
    Object.keys(columns).map((key) => {
      if (columns[key].actions?.includes(action)) {
        payLoad = { ...payLoad, [key]: formState[key] };
      }
    });
    const url = "/" + modulo + (action != "add" ? "/" + formState["id"] : "");
    let method = action == "edit" ? "PUT" : "POST";
    if (action == "del") {
      method = "DELETE";
    }
    execute(url, method, payLoad, false);
    reLoad({ ...params, origen: "reLoad" });
    onCloseModal();
  };
  const onAdd = () => {
    setFormState(getDefaultFormState(columns));
    setTitleModal(t("Add ") + title);
    setAction("add");
    setErrorsForm({});
    setErrorForm({});
    setOpenModal(true);
  };

  const onEdit = (data) => {
    setFormState(data);
    Object.keys(columns).map((key) => {
      if (columns[key].onChange) {
        columns[key].onChange(data[key]);
      }
    });
    setTitleModal(t("Edit ") + title);
    setAction("edit");
    setErrorsForm({});
    setErrorForm({});
    setOpenModal(true);
  };

  const onView = (data) => {
    setFormState(data);
    Object.keys(columns).map((key) => {
      if (columns[key].onChange) {
        columns[key].onChange(data[key]);
      }
    });
    setTitleModal(t("View ") + title);
    setAction("view");
    setErrorsForm({});
    setErrorForm({});
    setOpenModal(true);
  };

  const onDel = (data, confirmed = false) => {
    setFormState(data);
    setTitleModal(t("Delete ") + title);
    setAction("del");
    setOpenDel(true);
  };

  const onAction = (action, data) => {
    switch (action) {
      case "add":
        onAdd();
        break;
      case "edit":
        onEdit(data);
        break;
      case "view":
        onView(data);
        break;
      case "del":
        onDel(data);
        break;
      default:
        break;
    }
  };

  const onCloseModal = () => {
    setOpenModal(false);
    setOpenDel(false);
  };

  return (
    <>
      <Card className="relative overflow-hidden">
        <h1>{t("List", title)}</h1>
        <Card>
          <div className="flex justify-between items-center">
            <div className="w-[30px] flex-shrink">{!loaded && <Spinner />}</div>
            <div className="flex-grow">{msg}</div>
            {(!columns._actions?.render || columns._actions.render("add")) && (
              <button
                className="btn btn-primary flex-shrink w-fit"
                onClick={onAdd}
              >
                {t("Add ")}
                {title}
              </button>
            )}
          </div>
        </Card>
        {data && (
          <div id={"DataTable_" + modulo}>
            <DataTable
              datas={data.data}
              columns={columns}
              onClickRowChildren={onClickRowChildren}
              params={{ ...params, total: data.total }}
              onChangePage={onChangePage}
              onChangePerPage={onChangePerPage}
              onAction={onAction}
              onChangeSort={onChangeSort}
            />
          </div>
        )}
      </Card>
      <DataModal
        open={openModal}
        title={titleModal}
        onClose={onCloseModal}
        onSave={onSave}
        buttonText={
          action == "add" ? t("Save") : action == "edit" ? t("Update") : ""
        }
      >
        <DbForm
          fields={columns}
          formState={formState}
          handleChangeInput={handleChangeInput}
          action={action}
          errors={{ ...errorForm, ...errorsForm }}
        />
      </DataModal>
      <DataModal
        open={openDel}
        title={titleModal}
        onClose={onCloseModal}
        onSave={onSave}
        buttonText={t("Delete")}
      >
        <h1>{t("are you sure you want to delete the record?")}</h1>
      </DataModal>
    </>
  );
};

export default DataCrud;
