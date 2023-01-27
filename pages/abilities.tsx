import { useState } from "react";
import DataCrud from "../src/components/DataCrud";
import { getFields } from "../src/utils/dbTools";

const abilitiesPage = () => {
  const [formState, setFormState] = useState({});
  const [errorsForm, setErrorsForm] = useState({});

  const fields = getFields([
    "name*|Nombre del Permiso|_h_|rules::max:10",
    "description|Descripcion|_h_",
  ]);

  return (
    <>
      <DataCrud
        title="Permisos"
        modulo="abilities"
        columns={fields}
        formState={formState}
        setFormState={setFormState}
        errorsForm={errorsForm}
        setErrorsForm={setErrorsForm}
      />
    </>
  );
};

export default abilitiesPage;
abilitiesPage.auth = true;
