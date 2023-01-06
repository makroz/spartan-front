import { Card, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { getDefaultFormState } from "../utils/dbTools";
import { capitalize } from "../utils/string";
import DataModal from "./DataModal";
import DataTable from "./DataTable";
import DbForm from "./forms/DbForm";

const DataCrud = ({ modulo, columns, formList, title = "" }) => {
  const [openModal, setOpenModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [formState, setFormState] = useState(getDefaultFormState(formList));
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

  const handleChangeInput = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  const onChangePage = (page) => {
    if (params.page == page) return;
    setParams({ ...params, page });
  };
  const onChangePerPage = (perPage) => {
    if (params.perPage == perPage) return;
    setParams({ ...params, perPage });
  };

  const onSave = (data) => {
    console.log(data);
    onCloseModal();
  };
  const onAdd = () => {
    setFormState(getDefaultFormState(formList));
    setTitleModal("Add " + title);
    setAction("add");
    setOpenModal(true);
  };

  const onEdit = (data) => {
    setFormState(data);
    setTitleModal("Edit " + title);
    setAction("edit");
    setOpenModal(true);
  };

  const onView = (data) => {
    setFormState(data);
    setTitleModal("View " + title);
    setAction("view");
    setOpenModal(true);
  };

  const onDel = (data) => {
    setTitleModal("Delete " + title);
    setAction("del");
    console.log(data);
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
  };

  return (
    <>
      <h1>{title} List</h1>
      <Card className="relative">
        {!loaded && <Spinner />}
        {loaded && (
          <>
            <Card>
              <div className="flex justify-between">
                <div className=""></div>
                <button
                  className="btn btn-primary flex-shrink w-fit"
                  onClick={onAdd}
                >
                  Add {title}
                </button>
              </div>
            </Card>
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
      >
        <DbForm
          fields={formList}
          formState={formState}
          handleChangeInput={handleChangeInput}
          action={action}
        />
      </DataModal>
    </>
  );
};

export default DataCrud;
