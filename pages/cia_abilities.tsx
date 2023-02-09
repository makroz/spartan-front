import { useState } from "react";
import DataCrud from "../src/components/DataCrud";
import { getFields } from "../src/utils/dbTools";

const cia_abilitiesPage = () => {
  const [formState, setFormState] = useState({});
  const [errorsForm, setErrorsForm] = useState({});

  const fields = getFields(["name*|_h_|rules::max:10", "description|_h_"]);

  return (
    <>
      <DataCrud
        title="Abilities of Cias"
        modulo="cia-abilities"
        columns={fields}
        formState={formState}
        setFormState={setFormState}
        errorsForm={errorsForm}
        setErrorsForm={setErrorsForm}
      />
    </>
  );
};

export default cia_abilitiesPage;
cia_abilitiesPage.auth = true;
