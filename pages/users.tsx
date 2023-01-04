import {
  Avatar,
  Badge,
  Card,
  Checkbox,
  Pagination,
  Table,
} from "flowbite-react";
import { useState } from "react";
import { Delete, Edit, Trash } from "react-feather";
import Select from "../src/components/forms/Select";
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
  } = useAxios("/users", "GET", params);

  const status = {
    A: ["Active", "success"],
    I: ["Inactive", "danger"],
    P: ["Pending", "warning"],
    X: ["Blocked", "grey"],
  };

  const onChangePage = (page) => {
    setParams({ ...params, page });
  };
  if (!loaded) return <Spinner />;
  return (
    <>
      <h1>Users List</h1>
      <Card>
        <Table hoverable={true} striped={true}>
          <Table.Head>
            <Table.HeadCell className="!p-4 w-12">
              <Checkbox />
            </Table.HeadCell>
            <Table.HeadCell>User</Table.HeadCell>
            <Table.HeadCell>Role</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell className="w-24">Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {users.data.data.map((row) => (
              <Table.Row
                key={row.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="!p-4">
                  <Checkbox />
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap text-gray-900 dark:text-white flex items-start">
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
                </Table.Cell>
                <Table.Cell>{row.rol}</Table.Cell>
                <Table.Cell className="flex-wrap items-center">
                  <Badge
                    color={status[row.status][1]}
                    className="rounded-full  justify-center"
                  >
                    {status[row.status][0]}
                  </Badge>
                </Table.Cell>
                <Table.Cell className="flex items-center gap-2">
                  <a
                    href="/tables"
                    className="font-medium text-blue-600 hover:-translate-y-1 "
                  >
                    <Edit size={18} />
                  </a>
                  <a
                    href="#"
                    className="font-medium text-red-600 hover:-translate-y-1"
                  >
                    <Trash size={18} />
                  </a>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <div className="flex justify-between">
          <Pagination
            currentPage={params.page}
            onPageChange={onChangePage}
            showIcons={true}
            totalPages={users.data.total}
          />
          <Select
            name="perPage"
            value={params.perPage}
            onChange={(e) => setParams({ ...params, perPage: e.target.value })}
            className="w-24"
            options={[
              { value: "10", label: "10" },
              { value: "20", label: "20" },
              { value: "30", label: "30" },
              { value: "40", label: "40" },
              { value: "50", label: "50" },
              { value: "0", label: "Todos" },
            ]}
          ></Select>
        </div>
      </Card>
    </>
  );
};

export default usersPage;
