import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { updateHouse, fetchHouses } from '../../../redux/actions/houseAction';
import Select from 'react-select';

const UpdateHouseModal = ({ selectedRecord, showEditModal, setShowEditModal, setAlertType, setAlertMessage }) => {
    const dispatch = useDispatch();
    const [editedHouse, setEditedHouse] = useState(selectedRecord || {});
    const data = useSelector((state) => state.auth.data);

    useEffect(() => {
        setEditedHouse(selectedRecord || {});
    }, [selectedRecord]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditedHouse((prevEditedHouse) => ({
            ...prevEditedHouse,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleUpdateHouse = async () => {
        try {
            const { _id, houseNumber, owner, residents, propertyType } = editedHouse;
            const updatedHouse = {
                houseId: _id,
                houseNumber,
                owner,
                residents,
                propertyType,
            };

            const actionResult = await dispatch(updateHouse(updatedHouse));
            console.log(actionResult, 'checkupdatehouses')
            if (actionResult) {

                console.log(actionResult, 'actionResult')
                setShowEditModal(false);
                setAlertType('success');
                setAlertMessage(actionResult.payload.message);
            } else {
                console.log('Failed to update house');
            }
        } catch (error) {
            console.error('Error updating house:', error);
        }
    };

    const userOptions = data?.map((user) => ({
        value: user._id,
        label: user.name,
    }));

    return (
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Edit House</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {/* Hidden input for _id */}
                    <Form.Control
                        type="hidden"
                        name="_id"
                        value={editedHouse._id || ''}
                        onChange={handleChange}
                    />

                    {/* House Number */}
                    <Form.Group className="mb-3" controlId="formBasicHouseNumber">
                        <Form.Label>House Number</Form.Label>
                        <Form.Control
                            type="text"
                            name="houseNumber"
                            value={editedHouse.houseNumber || ''}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* Owner */}
                    <Form.Group className="mb-3" controlId="formBasicOwner">
                        <Form.Label>Owner</Form.Label>
                        <Select
                            name="owner"
                            options={userOptions}
                            value={userOptions.find((option) => option.value === editedHouse.owner)}
                            onChange={(selectedOption) =>
                                setEditedHouse({ ...editedHouse, owner: selectedOption.value })
                            }
                        />
                    </Form.Group>

                    {/* Residents (Multi-select) */}
                    <Form.Group className="mb-3" controlId="formBasicResidents">
                        <Form.Label>Residents</Form.Label>
                        <Select
                            name="residents"
                            options={userOptions}
                            value={Array.isArray(editedHouse.residents)
                                ? userOptions.filter((option) =>
                                    editedHouse.residents.includes(option.value)
                                ).map((option) => ({ label: option.label, value: option.value }))
                                : []
                            }
                            onChange={(selectedOptions) =>
                                setEditedHouse({
                                    ...editedHouse,
                                    residents: selectedOptions.map((option) => option.value),
                                })
                            }
                            isMulti
                        />
                    </Form.Group>

                    {/* Property Type */}
                    <Form.Group controlId="propertyType">
                        <Form.Label>Property Type</Form.Label>
                        <Form.Control as="select" name="propertyType" value={editedHouse.propertyType || ''} onChange={handleChange}>
                            <option value="">Select Property Type</option>
                            <option value="Single-Family Home">Single-Family Home</option>
                            <option value="Apartment">Apartment</option>
                            <option value="Condo">Condo</option>
                            <option value="Townhouse">Townhouse</option>
                            <option value="Duplex">Duplex</option>
                        </Form.Control>
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleUpdateHouse}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateHouseModal;
