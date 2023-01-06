import { Spinner } from "flowbite-react";
import DataCrud from "../src/components/DataCrud";
import useAxios from "../src/hooks/useAxios";
import { getFields } from "../src/utils/dbTools";

const citiesPage = () => {
  const { data, loaded }: any = useAxios("/states", "GET", { perPage: 0 });
  const columns = {
    name: {
      header: "Cities",
      className: "",
    },
    state: {
      header: "State",
      className: "",
      render: (value, row) => row.state.name + " (" + row.state.abv + ")",
    },
  };

  if (!loaded) return <Spinner />;
  const fields = getFields(["id", "name", "state_id", "status"]);
  fields["state_id"].inputType = "select";
  fields["state_id"].options = data.data.map((item) => ({
    value: item.id,
    label: item.name + " (" + item.abv + ")",
  }));

  return (
    <>
      <DataCrud
        title="City"
        modulo="cities"
        columns={columns}
        formList={fields}
      />
    </>
  );
};

export default citiesPage;
citiesPage.auth = true;
