import { Button, Modal } from 'flowbite-react'
import React from 'react'

const DataModal = (props) => {
  return (
    <Modal
    show={props.open}
    size="md"
    popup={true}
    onClose={props.onClose}
  >
     <Modal.Header>
      {props.title}
    </Modal.Header>
    <Modal.Body>
        {props.children}
     </Modal.Body>
    <Modal.Footer>
      <Button onClick={props.onSave}>
        Save
      </Button>
      <Button
        color="gray"
        onClick={props.onClose}
      >
        Cancel
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default DataModal