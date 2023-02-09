import { useState } from "react";
import DataCrud from "../src/components/DataCrud";
import useAxios from "../src/hooks/useAxios";
import { getFields } from "../src/utils/dbTools";

const rolesPage = () => {
  const [formState, setFormState] = useState({});
  const [errorsForm, setErrorsForm] = useState({});
  const { data, loaded } = useAxios("/abilities", "GET", {
    perPage: -1,
    sortBy: "name",
    orderBy: "asc",
    cols: ["id", "name", "description"],
  });

  const abilitiesL: any = [
    { label: "Create", value: "C" },
    { label: "Read", value: "R" },
    { label: "Update", value: "U" },
    { label: "Delete", value: "D" },
  ];
  const fields = getFields([
    "name*|Role|_h_",
    "description*|_h_",
    "abilities|inputType::subSelect|optionsSub::" + JSON.stringify(abilitiesL),
    "status*|_h_",
  ]);

  fields["abilities"].optionValue = "name";
  fields["abilities"].optionLabel = "description";
  fields["abilities"].options = data?.data;
  fields["_actions"].render = (value, row, index) => {
    if (row?.id == 1) {
      return false;
    }
    return true;
  };

  return (
    <>
      <DataCrud
        title="Roles"
        modulo="roles"
        columns={fields}
        formState={formState}
        setFormState={setFormState}
        errorsForm={errorsForm}
        setErrorsForm={setErrorsForm}
      />
    </>
  );
};

export default rolesPage;
rolesPage.auth = true;
