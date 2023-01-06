import DataCrud from "../src/components/DataCrud";
import { getFields } from "../src/utils/dbTools";

const citiesPage = () => {
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

  const fields = getFields(["id", "name", "code", "status"]);

  return (
    <>
      <DataCrud
        title="Country"
        modulo="countries"
        columns={columns}
        formList={fields}
      />
    </>
  );
};

export default citiesPage;
citiesPage.auth = true;
