import { Avatar, Badge, Card } from "flowbite-react";
import { useEffect, useState } from "react";
import DataModal from "../src/components/DataModal";
import DataTable from "../src/components/DataTable";
import Spinner from "../src/components/layouts/Spinner";
import useAxios from "../src/hooks/useAxios";
import { capitalize, initialsName } from "../src/utils/string";

const getFields = (campos: any = []) => {
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

const usersPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [formState, setFormState] = useState({});
  const [fields, setFields] = useState({});
  const [params, setParams] = useState({
    page: 1,
    perPage: 10,
    sortBy: "id",
    orderBy: "asc",
    searchBy: "",
  });
  const {
    data: users,
    error,
    loaded,
    execute,
    reLoad,
  } = useAxios("/users", "GET", { ...params, origen: "useAxios" });

  useEffect(() => {
    reLoad({ ...params, origen: "reLoad" }, true);
  }, [params]);

  const status = {
    A: ["Active", "success"],
    I: ["Inactive", "danger"],
    P: ["Pending", "warning"],
    X: ["Blocked", "grey"],
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
    setTitleModal("Add User");
    setOpenModal(true);
  };

  const onEdit = (data) => {
    console.log(data);
    setTitleModal("Edit User");
    setOpenModal(true);
  };

  const onShow = (data) => {
    console.log(data);
    setTitleModal("View User");
    setOpenModal(true);
  };

  const onDelete = (data) => {
    setTitleModal("Delete User");
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

  const columns = {
    name: {
      header: "User",
      render: (value, row, key, index) => {
        return (
          <Avatar
            img=""
            placeholderInitials={initialsName(row.name)}
            rounded={true}
            className="flex-shrink-0"
          >
            <div className="space-y-1 font-medium dark:text-white">
              <div>{row.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {row.email}
              </div>
            </div>
          </Avatar>
        );
      },
      className:
        "whitespace-nowrap text-gray-900 dark:text-white  flex items-start",
    },
    rol: {
      header: "Role",
    },
    status: {
      header: "Status",
      render: (value, row, key, index) => (
        <Badge
          color={status[row.status][1]}
          className="rounded-full  justify-center"
        >
          {status[row.status][0]}
        </Badge>
      ),
      className: "flex-wrap items-center",
    },
  };

  const fieldsList = getFields(["id", "name", "email", "rol", "status"]);

  useEffect(() => {
    const [fields, forms] = fieldsList;
    setFormState(forms);
    setFields(fields);
  }, []);

  return (
    <>
      <h1>Users List</h1>
      {JSON.stringify(fields)}
      <Card className="relative">
        {!loaded && <Spinner />}
        {loaded && (
          <>
            <Card>
              <div className="flex justify-between">
                <div className=""></div>
                <button
                  className="btn btn-primary flex-shrink w-fit"
                  // onClick={onAdd}
                  onClick={(e) =>
                    getFields(["id", "name", "email", "rol", "status"])
                  }
                >
                  Add User
                </button>
              </div>
            </Card>
            <DataTable
              datas={users.data}
              columns={columns}
              params={{ ...params, total: users.total }}
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
      ></DataModal>
    </>
  );
};

export default usersPage;
usersPage.auth = true;
