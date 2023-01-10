import { Card, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { getDefaultFormState } from "../utils/dbTools";
import { capitalize } from "../utils/string";
import DataModal from "./DataModal";
import DataTable from "./DataTable";
import DbForm from "./forms/DbForm";

const DataCrud = ({ modulo, columns, title = "" }) => {
  const [openModal, setOpenModal] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [formState, setFormState]: any = useState(getDefaultFormState(columns));
  const [errorsForm, setErrorsForm] = useState({});
  const [action, setAction] = useState("view");
  title = capitalize(title || modulo);
  const [params, setParams] = useState({
    page: 1,
    perPage: 10,
    sortBy: "id",
    orderBy: "asc",
    searchBy: "",
  });
  const { data, error, loaded, execute, reLoad } = useAxios(
    "/" + modulo,
    "GET",
    { ...params, origen: "useAxios" }
  );

  useEffect(() => {
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
        return !value ? "is Required" : "";
      case "min":
        return value.length < param[0] ? "min " + param[0] + " characters" : "";
      case "max":
        return value.length > param[0] ? "max " + param[0] + " characters" : "";
      case "email":
        return !/\S+@\S+\.\S+/.test(value) ? "is not a valid email" : "";
      case "number":
        return !/^\d+$/.test(value) ? "is not a number" : "";
      case "alpha":
        return !/^[a-zA-Z]+$/.test(value) ? "is not a valid text" : "";
      case "greater":
        return value < param[0] ? "must be greater than " + param[0] : "";
      case "less":
        return value > param[0] ? "must be less than " + param[0] : "";
      case "between":
        return value < param[0] || value > param[1]
          ? "must be between " + param[0] + " and " + param[1]
          : "";
      case "regex":
        return !new RegExp(param[0]).test(value) ? "is not a valid value" : "";
      default:
        return "";
    }
  };
  const checkRules = () => {
    let errors = {};
    for (const key in columns) {
      const el = columns[key];
      if (el.actions.includes(action)) {
        const el = columns[key];

        if (el.required && !formState[key]) {
          errors = { ...errors, [key]: el.label + " is Required" };
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
  const onChangePage = (page) => {
    if (params.page == page) return;
    setParams({ ...params, page });
  };
  const onChangePerPage = (perPage) => {
    if (params.perPage == perPage) return;
    if (!perPage) perPage = -1;
    setParams({ ...params, perPage });
  };

  const onSave = (data) => {
    console.log(data);
    const errors = checkRules();
    setErrorsForm(errors);
    console.log("error", errors);
    if (Object.keys(errors).length > 0) return;
    console.log("no error");
    let payLoad = {};
    Object.keys(columns).map((key) => {
      if (columns[key].actions.includes(action)) {
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
    setTitleModal("Add " + title);
    setAction("add");
    setErrorsForm({});
    setOpenModal(true);
  };

  const onEdit = (data) => {
    setFormState(data);
    Object.keys(columns).map((key) => {
      if (columns[key].onChange) {
        columns[key].onChange(data[key]);
      }
    });
    setTitleModal("Edit " + title);
    setAction("edit");
    setErrorsForm({});
    setOpenModal(true);
  };

  const onView = (data) => {
    setFormState(data);
    Object.keys(columns).map((key) => {
      if (columns[key].onChange) {
        columns[key].onChange(data[key]);
      }
    });
    setTitleModal("View " + title);
    setAction("view");
    setErrorsForm({});
    setOpenModal(true);
  };

  const onDel = (data, confirmed = false) => {
    setFormState(data);
    setTitleModal("Delete " + title);
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
      <h1>{title} List</h1>
      <Card className="relative">
        <Card>
          <div className="flex justify-between">
            <div className="">{!loaded && <Spinner />}</div>
            <button
              className="btn btn-primary flex-shrink w-fit"
              onClick={onAdd}
            >
              Add {title}
            </button>
          </div>
        </Card>
        {data && (
          <>
            <DataTable
              datas={data.data}
              columns={columns}
              params={{ ...params, total: data.total }}
              onChangePage={onChangePage}
              onChangePerPage={onChangePerPage}
              onAction={onAction}
            />
          </>
        )}
      </Card>
      <DataModal
        open={openModal}
        title={titleModal}
        onClose={onCloseModal}
        onSave={onSave}
        bottobText={action == "add" ? "Save" : action == "edit" ? "Update" : ""}
      >
        <DbForm
          fields={columns}
          formState={formState}
          handleChangeInput={handleChangeInput}
          action={action}
          errors={errorsForm}
        />
      </DataModal>
      <DataModal
        open={openDel}
        title={titleModal}
        onClose={onCloseModal}
        onSave={onSave}
        bottobText="Delete"
      >
        <h1>Seguro de eliminar el registro?</h1>
      </DataModal>
    </>
  );
};

export default DataCrud;
