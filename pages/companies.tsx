import { Avatar } from "flowbite-react";
import { useEffect, useState } from "react";
import DataCrud from "../src/components/DataCrud";
import useAuth from "../src/hooks/useAuth";
import useAxios from "../src/hooks/useAxios";
import { getFields } from "../src/utils/dbTools";
import { initialsName } from "../src/utils/string";

const companiesPage = () => {
  const { user }: any = useAuth();
  const [state, setState] = useState("");
  const { data: countries, loaded: loadedCountries }: any = useAxios(
    "/countries",
    "GET",
    { perPage: 0 }
  );
  const { data: states, loaded: loadedStates }: any = useAxios(
    "/states",
    "GET",
    { perPage: 0 }
  );
  const {
    data: cities,
    loaded,
    execute,
  }: any = useAxios("/cities", "GET", {
    perPage: 0,
    searchBy: ["state_id", "=", state],
  });

  const fields = getFields([
    "id",
    "first_name*",
    "last_name*",
    "title*|_h_::Company",
    "description",
    "address",
    "office",
    "country_id*",
    "state_id*|_h_",
    "city_id*|_h_",
    "zip*|_h_|rules::number",
    "phone*",
    "licence*|_h_",
    "activation_date|Activate",
    "user_id",
    "price*|rules::number",
    "plan_id",
    "email*",
    "password*",
    "status|_h_",
  ]);
  fields["user_id"].value = user?.id;
  fields["country_id"].options = countries?.data;
  fields["country_id"].value = 1;
  fields["country_id"].readOnly = true;
  fields["activation_date"].inputType = "hidden";
  fields["state_id"].options = states?.data;
  fields["state_id"].onChange = setState;
  fields["city_id"].options = cities?.data;
  fields["city_id"].render = (value, row, key, index) => row.city.name;

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

  useEffect(() => {
    const cargar = async () => {
      const { data: cities, loaded }: any = await execute("/cities", "GET", {
        perpAge: 0,
        searchBy: ["state_id", "=", state],
      });
      fields["city_id"].options = cities?.data;
    };
    cargar();
  }, [state]);

  return (
    <>
      <DataCrud title="Company" modulo="companies" columns={fields} />
    </>
  );
};

export default companiesPage;
companiesPage.auth = true;