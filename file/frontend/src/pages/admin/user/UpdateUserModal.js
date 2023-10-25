import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { updateUserById } from '../../../redux/actions/authAction';
import Image from 'react-bootstrap/Image';

const UpdateUserModal = ({ selectedRecord, showEditModal, setShowEditModal, setAlertType, setAlertMessage }) => {
    console.log(selectedRecord, 'valeuueue')
    const dispatch = useDispatch();
    const [editedUser, setEditedUser] = useState(selectedRecord || {});
    const [fileData, setFileData] = useState(null);


    console.log(fileData, 'fileData check')

    const MAX_FILE_SIZE_BYTES = 1024 * 1024;

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > MAX_FILE_SIZE_BYTES) {
                event.target.value = null;
                setFileData(null);
                return;
            }

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setFileData(reader.result);
            };
        }
    };



    useEffect(() => {
        setEditedUser(selectedRecord || {});
        setFileData(null);
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
            const { _id, name, email, password, phone, address, status, role } = editedUser;
            const updatedUser = {
                userId: _id,
                name,
                email,
                password,
                phone,
                address,
                status,
                role,

            };

            if (fileData) {
                updatedUser.photo = fileData;
            }

            dispatch(updateUserById(updatedUser))
                .then((response) => {
                    setShowEditModal(false);
                    setAlertType('success');
                    setAlertMessage(response.payload.message);
                }).catch((error) => {
                    console.error('Error deleting user:', error);
                    setShowEditModal(false);
                    setAlertType('danger');
                    setAlertMessage(error);
                })
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        type="hidden"
                        name="_id"
                        value={editedUser._id || ''}
                        onChange={handleChange}
                    />

                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={editedUser.name ? editedUser.name : ''}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={editedUser.email ? editedUser.email : ''}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={editedUser.password ? editedUser.password : ''}
                            onChange={handleChange}
                            placeholder="Enter new password (optional)"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicRole">
                        <Form.Label>Role</Form.Label>
                        <Form.Select
                            name="role"
                            value={editedUser.role ? editedUser.role : ''}
                            onChange={handleChange}
                            required

                        >
                            <option value="">Select a role</option>
                            <option value="admin">Admin</option>
                            <option value="customer">Customer</option>
                        </Form.Select>
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formBasicPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type="text"
                            name="phone"
                            value={editedUser.phone ? editedUser.phone : ''}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            name="address"
                            value={editedUser.address ? editedUser.address : ''}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicStatus">
                        <Form.Check
                            type="checkbox"
                            label="Status"
                            name="status"
                            checked={editedUser.status ? editedUser.status : false}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Photo Update</Form.Label>
                        <Form.Control
                            type="file"
                            name="photo"
                            accept=".png, .jpg, .jpeg"
                            onChange={handleFileChange}
                        />
                        {fileData && (
                            <Image
                                src={fileData}
                                alt="Selected"
                                thumbnail
                                style={{ marginTop: '10px' }}
                            />
                        )}
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

export default UpdateUserModal;
