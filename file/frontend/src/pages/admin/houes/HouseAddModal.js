import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { createHouse, fetchHouses } from '../../../redux/actions/houseAction';
import { getUsers } from '../../../redux/actions/authAction';

const HouseAddModal = ({ showAddModal, setShowAddModal, setAlertMessage, setAlertType }) => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.auth.data);
    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    const initialValues = {
        houseNumber: '', // Initialize with an empty string
        owner: '',
        residents: [],
        propertyType: '',
    };

    const validationSchema = Yup.object().shape({
        houseNumber: Yup.string().required('House Number is required'),
        owner: Yup.string().required('Owner is required'),
        residents: Yup.array().min(1, 'At least one resident is required'),
        propertyType: Yup.string().required('Property Type is required'),
    });

    const handleSubmit = async (values, { resetForm }) => {
        console.log(values, 'vaaaaaaaaaaaaaaaaaaaaaa');

        try {
            const response = await dispatch(createHouse(values));

            if (response) {
                console.log('House added successfully');
                setAlertType('success');
                setAlertMessage(response.payload.message);
                dispatch(fetchHouses());
                setShowAddModal(false);
                resetForm();
            } else {
                console.error('Failed to add house:', response.payload.message);
                setAlertType('danger');
                setAlertMessage(response.payload.message);
            }
        } catch (error) {
            console.error('Error adding house:', error);
            setAlertType('danger');
            setAlertMessage('Internal Server Error'); // Set a generic error message for unhandled errors
        }
    };




    return (
        <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Add New House</Modal.Title>
            </Modal.Header>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit, handleChange, setFieldValue, values, touched, errors }) => (
                    <Form onSubmit={handleSubmit}>
                        <Modal.Body>
                            <div>
                                <Form.Group controlId="houseNumber">
                                    <Form.Label>House Number</Form.Label>
                                    <Field
                                        type="text"
                                        name="houseNumber"
                                        value={values.houseNumber}
                                        onChange={handleChange}
                                        className={`form-control ${touched.houseNumber && errors.houseNumber
                                            ? 'is-invalid'
                                            : ''
                                            }`}
                                    />
                                    <ErrorMessage
                                        name="houseNumber"
                                        component="div"
                                        className="invalid-feedback"
                                    />
                                </Form.Group>
                                <Form.Group controlId="owner">
                                    <Form.Label>Owner</Form.Label>
                                    <Field
                                        as="select"
                                        name="owner"
                                        value={values.owner}
                                        onChange={handleChange}
                                        className={`form-control ${touched.owner && errors.owner ? 'is-invalid' : ''
                                            }`}
                                        required
                                    >
                                        <option value="">Select Owner</option>
                                        {data?.map((user) => (
                                            <option key={user._id} value={user._id}>
                                                {user.name}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage
                                        name="owner"
                                        component="div"
                                        className="invalid-feedback"
                                    />
                                </Form.Group>
                                <Form.Group controlId="residents">
                                    <Form.Label>Residents</Form.Label>
                                    <Select
                                        name="residents"
                                        isMulti
                                        value={values.residents.map((residentId) => ({
                                            label: data.find((user) => user._id === residentId)?.name || '',
                                            value: residentId,
                                        }))}
                                        options={data?.map((user) => ({
                                            label: user.name,
                                            value: user._id,
                                        }))}
                                        onChange={(selectedOptions) => {
                                            setFieldValue(
                                                'residents',
                                                selectedOptions
                                                    ? selectedOptions.map((option) => option.value)
                                                    : []
                                            );
                                        }}
                                        className={`form-control ${touched.residents && errors.residents
                                            ? 'is-invalid'
                                            : ''
                                            }`}
                                    />
                                    <ErrorMessage
                                        name="residents"
                                        component="div"
                                        className="invalid-feedback"
                                    />
                                </Form.Group>
                                <Form.Group controlId="propertyType">
                                    <Form.Label>Property Type</Form.Label>
                                    <Field
                                        as="select"
                                        name="propertyType"
                                        value={values.propertyType}
                                        onChange={handleChange}
                                        className={`form-control ${touched.propertyType && errors.propertyType
                                            ? 'is-invalid'
                                            : ''
                                            }`}
                                    >
                                        <option value="">Select Property Type</option>
                                        <option value="Single-Family Home">Single-Family Home</option>
                                        <option value="Apartment">Apartment</option>
                                        <option value="Condo">Condo</option>
                                        <option value="Townhouse">Townhouse</option>
                                        <option value="Duplex">Duplex</option>
                                    </Field>
                                    <ErrorMessage
                                        name="propertyType"
                                        component="div"
                                        className="invalid-feedback"
                                    />
                                </Form.Group>
                            </div>
                        </Modal.Body>
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
        </Modal>
    );
};

export default HouseAddModal;
