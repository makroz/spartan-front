import { Avatar } from "flowbite-react";
import { useState } from "react";
import DataCrud from "../src/components/DataCrud";
import useAxios from "../src/hooks/useAxios";
import { getFields } from "../src/utils/dbTools";
import { initialsName } from "../src/utils/string";

const ciaUsersPage = () => {
  const { data, loaded }: any = useAxios("/companies", "GET", {
    perPage: 0,
    cols: "id,title",
    sortBy: "title",
    sortDir: "asc",
  });
  const [formState, setFormState] = useState({});
  const [errorsForm, setErrorsForm] = useState({});
  const fields = getFields([
    "id",
    "name*|_h_::User",
    "email*",
    "password*",
    "rol|Role|_h_",
    "company_id*|_h_",
    "status|_h_",
  ]);

  fields["rol"].readOnly = true;
  fields["rol"].value = "team";
  fields["company_id"].options = data?.data;
  fields["company_id"].optionLabel = "title";
  fields["company_id"].actions = ["add", "view"];
  fields["name"].render = (value, row, key, index) => {
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
  };
  fields["name"].className =
    "whitespace-nowrap text-gray-900 dark:text-white  flex items-start";
  fields["_actions"].render = (value, row, index) => {
    if (value == "view") return true;
    return false;
  };

  return (
    <>
      <DataCrud
        title="Users of Cias"
        modulo="cia_users"
        columns={fields}
        formState={formState}
        setFormState={setFormState}
        errorsForm={errorsForm}
        setErrorsForm={setErrorsForm}
      />
    </>
  );
};

export default ciaUsersPage;
ciaUsersPage.auth = true;
