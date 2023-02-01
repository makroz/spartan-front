import { Card } from "flowbite-react";
import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { getDefaultFormState } from "../utils/dbTools";
import { capitalize } from "../utils/string";
import t from "../utils/traductor";
import DataForm from "./DataForm";
import DataHeader from "./DataHeader";
import DataTable from "./DataTable";
import { checkRules } from "./validate/Rules";

const DataCrud = ({
  modulo,
  columns,
  title = "",
  msgTop = "",
  msg = "",
  msgMid = "",
  msgBot = "",
  formState,
  setFormState,
  errorsForm,
  setErrorsForm,
  param = {},
  onClickRowChildren = null,
  _actions = true,
  textBtnAdd = "",
  datas = null,
  reload = null,
  setSearch = null,
}: any) => {
  const [openModal, setOpenModal] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [action, setAction] = useState("view");

  title = capitalize(title || modulo);
  const [params, setParams] = useState({
    page: 1,
    perPage: 10,
    sortBy: "id",
    orderBy: "asc",
    searchBy: "",
    relations: "",
    ...param,
  });
  const [oldSearch, setOldSearch] = useState(JSON.stringify(params.searchBy));
  let url = "/" + modulo;
  if (reload) {
    url = "";
  }
  const { data: dataM, error, loaded, execute, reLoad: _reload } = useAxios(
    url,
    "GET",
    {
      ...params,
    }
  );

  const reLoad = reload || _reload;

  const data: any = datas || dataM;

  useEffect(() => {
    setFormState(getDefaultFormState(columns));
    reLoad({ ...params, origen: "reLoad" }, true);
  }, [params]);

  const onCloseModal = () => {
    setOpenModal(false);
    setOpenDel(false);
  };

  const onSave = () => {
    const errors = { ...checkRules(columns, action, formState) };
    setErrorsForm(errors);
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
    reLoad({ ...params });
    onCloseModal();
  };

  const onAdd = () => {
    setFormState(getDefaultFormState(columns));
    setTitleModal(t("Add ") + title);
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
    setTitleModal(t("Edit ") + title);
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
    setTitleModal(t("View ") + title);
    setAction("view");
    setErrorsForm({});
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
      case "save":
        onSave();
        break;
      default:
        break;
    }
  };

  const _setSearch = (searchBy) => {
    if (JSON.stringify(searchBy) == oldSearch) return;
    const param = setSearch(searchBy);
    setOldSearch(JSON.stringify(searchBy));
    if (param === false) return;

    setParams({
      ...params,
      ...param,
    });
  };

  return (
    <>
      <Card className="relative overflow-hidden">
        <h1>{t("List", title)}</h1>
        {msgTop}
        <DataHeader
          columns={columns}
          msg={msg}
          onAdd={onAdd}
          textBtnAdd={textBtnAdd}
          title={title}
          loaded={loaded}
          setSearch={setSearch ? _setSearch : null}
        />
        {msgMid}
        {data?.data && (
          <div id={"DataTable_" + modulo}>
            <DataTable
              datas={data.data}
              columns={columns}
              onClickRowChildren={onClickRowChildren}
              params={{ ...params, total: data.total }}
              onAction={_actions ? onAction : false}
              setParams={setParams}
            />
          </div>
        )}
        {msgBot}
      </Card>
      <DataForm
        formState={formState}
        setFormState={setFormState}
        action={action}
        columns={columns}
        errorsForm={errorsForm}
        titleModal={titleModal}
        openModal={openModal}
        onCloseModal={onCloseModal}
        onSave={onSave}
        openDel={openDel}
      />
    </>
  );
};

export default DataCrud;
