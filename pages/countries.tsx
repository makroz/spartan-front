import { useState } from "react";
import DataCrud from "../src/components/DataCrud";
import { getFields } from "../src/utils/dbTools";

const countriesPage = () => {
  const [formState, setFormState] = useState({});
  const [errorsForm, setErrorsForm] = useState({});
  const fields = getFields(["id", "name*|_h_::Country", "code*|_h_"]);
  return (
    <>
      <DataCrud
        title="Country"
        modulo="countries"
        columns={fields}
        formState={formState}
        setFormState={setFormState}
        errorsForm={errorsForm}
        setErrorsForm={setErrorsForm}
      />
    </>
  );
};

export default countriesPage;
countriesPage.auth = true;
