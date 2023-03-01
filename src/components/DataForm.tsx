import t from "../utils/traductor";
import DataModal from "./DataModal";
import DbForm from "./forms/DbForm";

const DataForm = ({
  setFormState,
  formState,
  columns,
  openModal,
  titleModal,
  onCloseModal,
  onSave,
  action,
  errorsForm,
  openDel,
}) => {
  const handleChangeInput = (e) => {
    let value = e.target.value;
    if (e.target.type == "checkbox") {
      value = e.target.checked
        ? columns[e.target.name].optionValue[0] || "Y"
        : columns[e.target.name].optionValue[1] || "N";
    }
    setFormState({ ...formState, [e.target.name]: value });
    if (columns[e.target.name]?.onChange) {
      columns[e.target.name].onChange(value, formState, setFormState);
    }
    //console.log("formState", e);
  };

  return (
    <>
      <DataModal
        open={openModal}
        title={titleModal}
        onClose={onCloseModal}
        onSave={onSave}
        buttonText={
          action == "add" ? t("Save") : action == "edit" ? t("Update") : ""
        }
      >
        <DbForm
          fields={columns}
          formState={formState}
          handleChangeInput={handleChangeInput}
          action={action}
          errors={errorsForm}
          open={openModal}
        />
      </DataModal>
      <DataModal
        open={openDel}
        title={titleModal}
        onClose={onCloseModal}
        onSave={onSave}
        buttonText={t("Delete")}
      >
        <h1>{t("are you sure you want to delete the record?")}</h1>
      </DataModal>
    </>
  );
};

export default DataForm;
