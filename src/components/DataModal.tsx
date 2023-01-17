import { Modal } from "flowbite-react";
import React from "react";
import t from "../utils/traductor";

const DataModal = (props) => {
  //  const { t }: any = useLang();
  return (
    <Modal show={props.open} popup={true} onClose={props.onClose}>
      <Modal.Header>{props.title}</Modal.Header>
      <Modal.Body className="border-y max-h-[480px] overflow-auto">
        {props.children}
      </Modal.Body>
      <Modal.Footer>
        {props.bottobText != "" && (
          <button
            className="btn btn-primary flex-shrink w-fit"
            onClick={() => props.onSave("save")}
          >
            {props.buttonText}
          </button>
        )}
        <button
          className="btn bg-gray-400 text-white  flex-shrink w-fit"
          onClick={props.onClose}
        >
          {t("Cancel")}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default DataModal;
