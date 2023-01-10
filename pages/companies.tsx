import { Avatar } from "flowbite-react";
import DataCrud from "../src/components/DataCrud";
import { getFields } from "../src/utils/dbTools";
import { initialsName } from "../src/utils/string";

const companiesPage = () => {
  const fields = getFields([
    "id",
    "first_name*",
    "last_name*",
    "title*|_h_::Company",
    "description",
    "address",
    "office",
    "country_id*",
    "city_id*|_h_",
    "state_id*",
    "zip*|_h_",
    "phone*|_h_",
    "licence*|_h_",
    "activation_date|Activate|_h_",
    "user_id|_h_",
    "price*|_h_",
    "plan_id|_h_",
    "email*",
    "password*",
  ]);

  fields["title"].render = (value, row, key, index) => {
    return (
      <Avatar
        img=""
        placeholderInitials={initialsName(row.first_name + " " + row.last_name)}
        rounded={true}
        className="flex-shrink-0"
      >
        <div className="space-y-1 font-medium dark:text-white">
          <div>{row.title}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {row.first_name} {row.last_name} <br />
            {row.email}
          </div>
        </div>
      </Avatar>
    );
  };
  fields["title"].className =
    "whitespace-nowrap text-gray-900 dark:text-white  flex items-start";

  return (
    <>
      <DataCrud title="Company" modulo="companies" columns={fields} />
    </>
  );
};

export default companiesPage;
companiesPage.auth = true;
