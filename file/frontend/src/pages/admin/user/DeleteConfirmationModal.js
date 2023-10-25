import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const DeleteConfirmationModal = ({ selectedRecord, deleteConfirmationModal, setDeleteConfirmationModal, handleDelete }) => {


    const onDelete = () => {
        handleDelete(selectedRecord);
        setDeleteConfirmationModal(false);
    };

    return (
        <Modal show={deleteConfirmationModal} onHide={() => setDeleteConfirmationModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setDeleteConfirmationModal(false)}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={onDelete}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteConfirmationModal;
