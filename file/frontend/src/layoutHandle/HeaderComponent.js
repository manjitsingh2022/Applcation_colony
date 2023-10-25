import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { NavDropdown, Modal, Button, Container, Navbar, Nav, Dropdown, Form, Alert, Image } from 'react-bootstrap';
import { logout, changePassword } from '../redux/actions/authAction';

const HeaderComponent = () => {
    const [showModal, setShowModal] = useState(false);
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState('info');

    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const logOut = useCallback(() => {
        dispatch(logout());
        window.location.reload();
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!password || !newPassword || !confirmNewPassword) {
            showAlert("Please fill in all fields");
            return;
        }

        if (newPassword !== confirmNewPassword) {
            showAlert("New passwords don't match");
            return;
        }

        try {
            const response = await dispatch(changePassword({ password, newPassword }));

            if (response.payload.success === true) {
                showAlert(response.payload.message, "success");
                setTimeout(() => {
                    handleModalClose();
                }, 2000);
            } else {
                showAlert(response.payload.message, "danger");
            }

        } catch (error) {
            showAlert("Error updating password. Please try again.", "danger");
        }
    };

    const showAlert = (message, variant = "info") => {
        setAlertVisible(true);
        setAlertMessage(message);
        setAlertVariant(variant);
    };
    const handleModalOpen = () => {
        setShowModal(true);
    };
    const handleModalClose = () => {
        setShowModal(false);
        setPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setAlertVisible(false);
    };
    return (
        <>
            <Navbar bg="light" expand="sm" fixed="top">
                <Navbar.Brand>
                    <Link to={'/'} className="d-flex align-items-center link-body-emphasis text-decoration-none">
                        <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
                            <use xlinkHref="#bootstrap"></use>
                        </svg>
                    </Link>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbarNavDarkDropdown" />

                <Navbar.Collapse id="navbarNavDarkDropdown">
                    <Nav className="col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <Nav.Link as={Link} to="/" className="nav-link px-2 link-secondary">Home</Nav.Link>
                        {/* Add more Nav.Link components for other menu items */}
                    </Nav>

                    <Nav>
                        {currentUser ? (
                            <NavDropdown
                                className='d-flex px-4'
                                id="nav-dropdown-dark-example"
                                title={(
                                    <span className="align-items-center">
                                        <Image src={currentUser.user.photo} alt="mdo" width="32" height="32" className="rounded-circle me-2" />
                                        <span>{currentUser.user.name}</span>
                                    </span>
                                )}

                                drop='down-centered'
                                variant="secondary"
                            >
                                <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="" onClick={handleModalOpen}>
                                    Change Password
                                </NavDropdown.Item>
                                <Dropdown.Divider />
                                <NavDropdown.Item as={Link} to="/logout" onClick={logOut}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>



            <Modal show={showModal} onHide={handleModalClose}>
                <Alert
                    variant={alertVariant}
                    show={alertVisible}
                    onClose={() => setAlertVisible(false)}
                    dismissible
                >
                    {alertMessage}
                </Alert>
                <Modal.Header closeButton>
                    <Modal.Title>Change Password {currentUser.user.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="password">
                            <Form.Label>Old Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="newPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="confirmNewPassword">
                            <Form.Label>Confirm New Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button type="submit">Update Password</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </>);
};

export default HeaderComponent;
