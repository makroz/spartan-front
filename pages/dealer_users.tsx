import { Avatar } from "flowbite-react";
import { useState } from "react";
import DataCrud from "../src/components/DataCrud";
import useAxios from "../src/hooks/useAxios";
import { getFields } from "../src/utils/dbTools";
import { initialsName } from "../src/utils/string";

const dealerUsersPage = () => {
  const { data, loaded }: any = useAxios("/dealers", "GET", {
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
    "role_id|Role|_h_",
    "dealer_id*|_h_",
    "company_id|Company|_h_",
    "status|_h_",
  ]);

  fields["role_id"].readOnly = true;
  fields["role_id"].value = "2";
  fields["dealer_id"].options = data?.data;
  fields["dealer_id"].optionLabel = "title";
  fields["dealer_id"].actions = ["add", "view"];
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
  fields["company_id"].render = (value, row, key, index) =>
    row.dealer.company.title;
  fields["_actions"].render = (value, row, index) => {
    if (value == "view") return true;
    return false;
  };

  return (
    <>
      <DataCrud
        title="Users of Dealers"
        modulo="dealer-users"
        columns={fields}
        formState={formState}
        setFormState={setFormState}
        errorsForm={errorsForm}
        setErrorsForm={setErrorsForm}
        param={{ relations: "role,dealer.company" }}
      />
    </>
  );
};

export default dealerUsersPage;
dealerUsersPage.auth = true;
