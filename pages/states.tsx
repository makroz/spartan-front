import DataCrud from "../src/components/DataCrud";
import Spinner from "../src/components/layouts/Spinner";
import useAxios from "../src/hooks/useAxios";
import { getFields } from "../src/utils/dbTools";

const statesPage = () => {
  const { data, loaded }: any = useAxios("/countries", "GET", { perPage: 0 });
  const columns = {
    name: {
      header: "State",
      className: "",
    },
    abv: {
      header: "ABV",
      className: "",
    },
    country_id: {
      header: "Country",
      className: "",
      render: (value, row) => row.country.code,
    },
  };
  if (!loaded) return <Spinner />;
  const fields = getFields(["id", "name", "abv", "country_id"]);
  fields["country_id"].inputType = "select";
  fields["country_id"].options = data.data.map((item) => ({
    value: item.id,
    label: item.name + " (" + item.code + ")",
  }));

  return (
    <>
      <DataCrud
        title="State"
        modulo="states"
        columns={columns}
        formList={fields}
      />
    </>
  );
};
export default statesPage;
statesPage.auth = true;
