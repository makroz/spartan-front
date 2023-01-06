import { Card, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { capitalize } from "../utils/string";
import DataModal from "./DataModal";
import DataTable from "./DataTable";
import DbForm from "./forms/DbForm";

  

const DataCrud = ({modulo,columns,formList,title=''}) => {
  const [openModal, setOpenModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [formState, setFormState] = useState(formList.formState);
  const [fields, setFields] = useState(formList.fields);
  title=capitalize(title||modulo);
    const [params, setParams] = useState({
    page: 1,
    perPage: 10,
    sortBy: "id",
    orderBy: "asc",
    searchBy: "",
  });
  const {
    data,
    error,
    loaded,
    execute,
    reLoad,
  } = useAxios("/"+modulo, "GET", { ...params, origen: "useAxios" });

  useEffect(() => {
    reLoad({ ...params, origen: "reLoad" }, true);
  }, [params]);

  
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
    setTitleModal("Add "+title);
    setOpenModal(true);
  };

  const onEdit = (data) => {
    console.log(data);
    setTitleModal("Edit "+title);
    setOpenModal(true);
  };

  const onShow = (data) => {
    console.log(data);
    setTitleModal("View "+title);
    setOpenModal(true);
  };

  const onDelete = (data) => {
    setTitleModal("Delete "+title);
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
      case "show":
        onShow(data);
        break;
      case "delete":
        onDelete(data);
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
        <DbForm fields={fields} />
      </DataModal>
    </>
  );
};

export default DataCrud;

