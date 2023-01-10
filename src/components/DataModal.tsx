import { Modal } from "flowbite-react";
import React from "react";

const DataModal = (props) => {
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
            {props.bottobText}
          </button>
        )}
        <button
          className="btn bg-gray-400 text-white  flex-shrink w-fit"
          onClick={props.onClose}
        >
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default DataModal;
