import DataCrud from "../src/components/DataCrud";
import { getFields } from "../src/utils/dbTools";

const statesPage = () => {
  const columns = {
    name: {
      header: "State",
      className: "",
    },
    abv: {
      header: "ABV",
      className: "",
    },
    country_name: {
      header: "Country",
      className: "",
      render: (value, row) => row.country.code,
    },
  };

  const fields = getFields(["id", "name", "abv", "country_id", "status"]);

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
