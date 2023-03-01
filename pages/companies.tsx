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
  const [city, setCity] = useState("");
  const [formState, setFormState] = useState({});
  const [errorsForm, setErrorsForm] = useState({});
  const { data: plans }: any = useAxios("/plans", "GET", {
    perPage: 0,
    sortBy: "name",
    orderBy: "asc",
    cols: ["id", "name"],
  });
  const { data: countries }: any = useAxios("/countries", "GET", {
    perPage: 0,
    sortBy: "name",
    orderBy: "asc",
    cols: ["id", "name"],
  });
  const { data: states }: any = useAxios("/states", "GET", {
    perPage: 0,
    sortBy: "name",
    orderBy: "asc",
    cols: ["id", "name"],
  });
  const { data: cities, loaded, execute }: any = useAxios("/cities", "GET", {
    perPage: 0,
    searchBy: ["state_id", "=", state],
    sortBy: "name",
    orderBy: "asc",
    cols: ["id", "name"],
  });

  const onBlurZip = async (e) => {
    const zip = e.target.value;
    if (zip.length == 5) {
      const { data, loaded }: any = await execute(
        "https://us-zipcode.api.smartystreets.com/lookup?key=151874489769002591&zipcode=" +
          zip,
        "GET",
        {},
        false
      );
      if (data[0].zipcodes) {
        const state = data[0].zipcodes[0].state;
        const city = data[0].zipcodes[0].default_city;
        const state_id = states.data.find((s) => s.name == state).id;
        setErrorsForm({});
        if (state_id == state) setState("");
        setState(state_id);
        setCity(city);
      } else {
        setErrorsForm({ ...errorsForm, zip: "Zip code not found" });
      }
    } else {
      if (zip.length > 0)
        setErrorsForm({
          ...errorsForm,
          zip: "Zip code require 5 numbers only",
        });
    }
  };
  const fields = getFields([
    "id",
    "title*|Name of Company|_h_::Company",
    "description",
    "first_name*",
    "last_name*",
    "phone*",
    "country_id*",
    "zip*|_h_|rules::number",
    "state_id*|_h_",
    "city_id*|_h_",
    "address",
    "office|rules::max,6",
    "licence*|_h_",
    "activation_date|Activate",
    "user_id",
    "plan_id",
    "price*|rules::number",
    "email*",
    "password*",
    "link*|rules::noSpaces",
    "domain",
    "color_primary|Primary color|_h_|inputType::color|value::#0d2643",
    "color_secondary|Secondary color|_h_|inputType::color|value::#f4c60c",
    "status|_h_",
  ]);
  fields["link"].onBlur = (link) => {
    if (link.target.value)
      setFormState({ ...formState, link: link.target.value.toLowerCase() });
  };
  fields["user_id"].value = user?.id;
  fields["plan_id"].options = plans?.data;
  fields["country_id"].options = countries?.data;
  fields["country_id"].value = 1;
  fields["country_id"].readOnly = true;
  fields["activation_date"].inputType = "hidden";
  fields["state_id"].options = states?.data;
  fields["state_id"].onChange = setState;
  fields["city_id"].options = cities?.data;
  fields["city_id"].render = ({ row }) => row.city.name;
  fields["zip"].onBlur = onBlurZip;
  fields["title"].render = ({ row }) => {
    return (
      <Avatar
        img=""
        placeholderInitials={initialsName(row.title)}
        rounded={true}
        className="flex-shrink-0"
      >
        <div className="space-y-1 font-medium dark:text-white">
          <div>{row.title}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {row.first_name} {row.last_name} <br />
            {row.email} <br />
            Link:{" "}
            <a
              target="_blank"
              href={`https://company.myspartanhome.com/${row.link}`}
              className="text-blue-800"
            >
              https://company.myspartanhome.com/{row.link}
            </a>
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
        sortBy: "name",
        orderBy: "asc",
      });
      fields["city_id"].options = cities?.data;
      if (city != "") {
        const city_id = cities.data.find((c) => c.name == city)?.id;
        fields["city_id"].value = city_id;
        setFormState({ ...formState, city_id, state_id: state });
      }
    };
    if (state != "") cargar();
  }, [state]);

  return (
    <>
      <DataCrud
        title="Company"
        modulo="companies"
        columns={fields}
        formState={formState}
        setFormState={setFormState}
        errorsForm={errorsForm}
        setErrorsForm={setErrorsForm}
      />
    </>
  );
};

export default companiesPage;
companiesPage.auth = true;
