import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { updateNotice, fetchNotices } from '../../../redux/actions/noticeAction';
import { Field, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const NoticeUpdateModal = ({ selectedNotice, showEditModal, setShowEditModal }) => {
    const dispatch = useDispatch();

    // Initialize editedNotice using selectedNotice or an empty object
    const editedNotice = selectedNotice || {};

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        content: Yup.string().required('Content is required'),
        status: Yup.string().required('Status is required'),
    });

    const handleUpdateNotice = async (values) => {
        try {
            const { _id, title, content, status } = values;
            const updatedNotice = {
                noticeId: _id,
                title,
                content,
                status,
            };

            const response = await dispatch(updateNotice(updatedNotice));

            if (updateNotice.fulfilled.match(response)) {

                console.log(response, 'actionResult')
                setShowEditModal(false);
                await dispatch(fetchNotices());
            } else {
                console.log('Failed to update Notice');
            }

        } catch (error) {
            console.error('Error updating notice:', error);
        }
    };

    return (
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Notice</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        _id: editedNotice._id || '',
                        title: editedNotice.title || '',
                        content: editedNotice.content || '',
                        status: editedNotice.status || '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleUpdateNotice}
                >
                    {({ values, handleChange, handleSubmit, errors, touched }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    value={values.title}
                                    onChange={handleChange}
                                    isInvalid={touched.title && !!errors.title}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.title}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicContent">
                                <Form.Label>Content</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="content"
                                    value={values.content}
                                    onChange={handleChange}
                                    isInvalid={touched.content && !!errors.content}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.content}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <div className="form-group">
                                <label htmlFor="status">Status</label>
                                <Field
                                    name="status"
                                    as="select"
                                    className={`form-select ${touched.status && errors.status ? 'is-invalid' : ''}`}
                                >
                                    <option value="" disabled>
                                        Choose...
                                    </option>
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </Field>
                                <ErrorMessage
                                    name="status"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                                    Close
                                </Button>
                                <Button variant="primary" type="submit">
                                    Update
                                </Button>
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
};

export default NoticeUpdateModal;
