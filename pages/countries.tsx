import DataCrud from "../src/components/DataCrud";
import { getFields } from "../src/utils/dbTools";

const countriesPage = () => {
 
  const [fields,formState] = getFields(["id", "name", "code",  "status"]);

  const columns = {
    name: {
      header: "Country",
      className: "",
    },
    code: {
      header: "Code",
      className: "",
    },
  };

  
  return (
    <>
      <DataCrud title='Country' modulo='countries' columns={columns} formList={{fields, formState}} />
    </>
  );
};

export default countriesPage;
countriesPage.auth = true;
