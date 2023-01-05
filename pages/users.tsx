import { Avatar, Badge, Card } from "flowbite-react";
import { useEffect, useState } from "react";
import DataTable from "../src/components/DataTable";
import Spinner from "../src/components/layouts/Spinner";
import useAxios from "../src/hooks/useAxios";
import { initialsName } from "../src/utils/string";

const usersPage = () => {
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

  //if (!users) return null;

  return (
    <>
      <h1>Users List</h1>
      <Card className="relative">
        {!loaded && <Spinner />}
        {loaded && (
          <DataTable
            datas={users.data}
            columns={columns}
            params={{ ...params, total: users.total }}
            onChangePage={onChangePage}
            onChangePerPage={onChangePerPage}
          />
        )}
      </Card>
    </>
  );
};

export default usersPage;
usersPage.auth = true;
