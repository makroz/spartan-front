import { useState } from "react";
import DataCrud from "../src/components/DataCrud";
import { getFields } from "../src/utils/dbTools";

const dealer_abilitiesPage = () => {
  const [formState, setFormState] = useState({});
  const [errorsForm, setErrorsForm] = useState({});

  const fields = getFields(["name*|_h_|rules::max:10", "description|_h_"]);

  return (
    <>
      <DataCrud
        title="Abilities of Dealer"
        modulo="dealer-abilities"
        columns={fields}
        formState={formState}
        setFormState={setFormState}
        errorsForm={errorsForm}
        setErrorsForm={setErrorsForm}
      />
    </>
  );
};

export default dealer_abilitiesPage;
dealer_abilitiesPage.auth = true;
