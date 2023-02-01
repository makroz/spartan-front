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
    setFormState({ ...formState, [e.target.name]: e.target.value });
    if (columns[e.target.name].onChange) {
      columns[e.target.name].onChange(e.target.value, formState, setFormState);
    }
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
