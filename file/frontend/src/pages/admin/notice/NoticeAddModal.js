import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { createNotice } from '../../../redux/actions/noticeAction'; // Replace with your actual notice action
import Select from 'react-select';

const NoticeAddModal = ({ showAddModal, setShowAddModal }) => {
    const data = useSelector((state) => state.auth.data);
    const data1 = useSelector((state) => state.auth);

    console.log(data1, 'valueeeeeeeeeeeeeeeee')
    const dispatch = useDispatch();

    // Initialize the notice object with default values
    const initialNotice = {
        title: '',
        content: '',
        selectedUsers: [],
    };

    const [notice, setNotice] = useState(initialNotice);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNotice({ ...notice, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { title, content, selectedUsers } = notice;
        if (!title || !content) {
            alert('Please fill in all fields');
            return;
        }

        // Dispatch the createNotice action with the notice data
        dispatch(createNotice(notice))
            .then(() => {
                console.log('Notice added successfully');
                setShowAddModal(false);
                // Reset the form after successful submission
                setNotice(initialNotice);
            })
            .catch((error) => {
                console.error('Error adding notice:', error);
            });
    };

    const userOptions = data.map((user) => ({
        value: user._id,
        label: user.name,
    }));
    console.log(userOptions, 'valjsldksl')

    return (
        <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Notice</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={notice.title}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="content">
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="content"
                            value={notice.content}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="selectedUsers">
                        <Form.Label>Selected Users</Form.Label>
                        <Select
                            name="selectedUsers"
                            options={userOptions}
                            value={Array.isArray(notice.selectedUsers)
                                ? userOptions.filter((option) =>
                                    notice.selectedUsers.includes(option.value)
                                ).map((option) => ({ label: option.label, value: option.value }))
                                : []
                            }
                            onChange={(selectedOptions) =>
                                setNotice({
                                    ...notice,
                                    selectedUsers: selectedOptions.map((option) => option.value),
                                })
                            }
                            isMulti
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSubmit}>
                    Add
                </Button>
                <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default NoticeAddModal;
