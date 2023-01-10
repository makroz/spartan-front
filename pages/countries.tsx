import DataCrud from "../src/components/DataCrud";
import { getFields } from "../src/utils/dbTools";

const countriesPage = () => {
  const fields = getFields(["id", "name*|_h_::Country", "code*|_h_"]);
  return (
    <>
      <DataCrud title="Country" modulo="countries" columns={fields} />
    </>
  );
};

export default countriesPage;
countriesPage.auth = true;
