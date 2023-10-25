import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { updateMaintenance, fetchMaintenances } from '../../../redux/actions/maintenanceAction';

const UpdateMaintenanceModal = ({ selectedRecord, showEditModal, setShowEditModal }) => {

    const dispatch = useDispatch();
    const [editedUser, setEditedUser] = useState({ ...selectedRecord });

    useEffect(() => {
        setEditedUser({ ...selectedRecord });
    }, [selectedRecord]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditedUser((prevEditedUser) => ({
            ...prevEditedUser,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleUpdateUser = async () => {
        try {
            const { _id, status } = editedUser;
            const updatedUser = {
                userId: _id,
                status,
            };

            const updatedUserData = await dispatch(updateMaintenance(updatedUser));

            // Assuming you have a Redux action called fetchMaintenances that fetches the user data
            await dispatch(fetchMaintenances());

            // Close the edit modal
            setShowEditModal(false);

            console.log('User status updated successfully:', updatedUserData);
        } catch (error) {
            console.error('Error updating user status:', error);
        }
    };

    return (
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Update Maintenance</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        type="hidden"
                        name="_id"
                        value={editedUser._id || ''}
                        onChange={handleChange}
                    />

                    <Form.Group controlId="status">
                        <Form.Label>Status</Form.Label>
                        <Form.Select
                            name="status"
                            value={editedUser.status || ''}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a status</option>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleUpdateUser}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateMaintenanceModal;
