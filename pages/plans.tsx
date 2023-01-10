import { useState } from "react";
import DataCrud from "../src/components/DataCrud";
import { getFields } from "../src/utils/dbTools";

const plansPage = () => {
  const [formState, setFormState] = useState({});
  const [errorsForm, setErrorsForm] = useState({});
  const fields = getFields([
    "id",
    "name*|_h_::Plan",
    "description",
    "price*|_h_",
    "duration*|duration (months)|_h_",
    "status|_h_",
  ]);
  return (
    <>
      <DataCrud
        title="Plan"
        modulo="plans"
        columns={fields}
        formState={formState}
        setFormState={setFormState}
        errorsForm={errorsForm}
        setErrorsForm={setErrorsForm}
      />
    </>
  );
};

export default plansPage;
plansPage.auth = true;
