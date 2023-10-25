import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { register, getUsers } from '../../../redux/actions/authAction';

const UserAddModal = ({ showAddModal, setShowAddModal, setAlertType
    , setAlertMessage }) => {
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        name: '',
        email: '',
        role: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, role } = user;

        if (!name || !email || !password || !role) {
            alert('Please fill in all fields');
            return;
        }

        try {
            const response = await dispatch(register({ name, email, password, role }));
            console.log(response, 'resgisiteee')
            if (response.status === 'success') {
                setShowAddModal(false);
                setAlertType('success');
                setAlertMessage(response.data.message);
            } else {
                setShowAddModal(false);
                setAlertType('danger');
                setAlertMessage(response.data.message);
            }
        } catch (error) {
            setShowAddModal(false);
            setAlertType('danger');
            setAlertMessage('An error occurred during registration.');
        }
    };


    return (
        <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Add New User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter Name"
                        />
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter Email"
                        />
                    </Form.Group>
                    <Form.Group controlId="role">
                        <Form.Label>Role</Form.Label>
                        <Form.Select
                            name="role"
                            value={user.role}
                            onChange={handleChange}
                            required
                            placeholder="Select a Role"
                        >
                            <option value="">Select a role</option>
                            <option value="admin">Admin</option>
                            <option value="customer">Customer</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            placeholder="Enter Password"
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Add
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UserAddModal;
