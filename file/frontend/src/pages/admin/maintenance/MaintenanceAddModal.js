import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { createMaintenance, fetchMaintenances } from '../../../redux/actions/maintenanceAction';
import { getUsers } from '../../../redux/actions/authAction';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';

const MaintenanceAddModal = ({ showAddModal, setShowAddModal, userId }) => {

    console.log(userId, 'useriddddd')
    const dispatch = useDispatch();
    const { data, role } = useSelector((state) => state.auth);

    const initialValues = {
        requester: role === 'admin' ? [] : [userId],
        description: '',
    };

    const validationSchema = Yup.object().shape({
        requester: Yup.array().required('Requester is required'),
        description: Yup.string().required('Description is required'),
    });

    const handleSubmit = async (values) => {
        try {
            await dispatch(createMaintenance(values));
            console.log('Maintenance request created successfully');
            await dispatch(fetchMaintenances());
            setShowAddModal(false);
        } catch (error) {
            console.error('Error creating maintenance request:', error);
        }
    };

    useEffect(() => {
        if (role === 'admin') {
            dispatch(getUsers()).catch((error) => {
                console.error('Error fetching users:', error);
            });
        }
    }, [dispatch, role]);

    return (
        <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Maintenance Request</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleSubmit, setFieldValue, values }) => (
                        <Form onSubmit={handleSubmit}>
                            {role === 'admin' && (
                                <Form.Group controlId="requester">
                                    <Form.Label>Requester</Form.Label>
                                    <Select
                                        name="requester"
                                        isMulti
                                        options={data?.map((user) => ({
                                            label: user.name,
                                            value: user._id,
                                        }))}
                                        value={values.requester.map((requesterId) => ({
                                            label: data.find((user) => user._id === requesterId)?.name || '',
                                            value: requesterId,
                                        }))}
                                        onChange={(selectedOptions) => {
                                            setFieldValue(
                                                'requester',
                                                selectedOptions
                                                    ? selectedOptions.map((option) => option.value)
                                                    : []
                                            );
                                        }}
                                    />
                                    <ErrorMessage
                                        name="requester"
                                        component="div"
                                        className="text-danger"
                                    />
                                </Form.Group>
                            )}
                            <Form.Group controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Field
                                    as="textarea"
                                    name="description"
                                    className="form-control"
                                />
                                <ErrorMessage
                                    name="description"
                                    component="div"
                                    className="text-danger"
                                />
                            </Form.Group>
                            <Modal.Footer>
                                <Button variant="primary" type="submit">
                                    Add
                                </Button>
                                <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
};

export default MaintenanceAddModal;
