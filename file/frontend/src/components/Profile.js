import React from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Profile = () => {
    // Get the current user from the Redux store
    const { user: currentUser } = useSelector((state) => state.auth);

    // If there's no authenticated user, redirect to the login page
    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="container mt-5">
            <Row>
                <Col lg={4}>
                    <Card className="mb-4">
                        <Card.Body className="text-center">
                            <Card.Img
                                src={currentUser.user.photo ? currentUser.user.photo : "https://i.ibb.co/4pDNDK1/avatar.png"}
                                alt="avatar"
                                className="rounded-circle"
                                style={{ width: '150px' }}
                                fluid
                            />
                            <p className="text-muted mb-1">House No: 12345</p>
                            <div className="d-flex justify-content-center mb-2">
                                <Button>Edit Profile</Button>
                                <Button variant="outline-primary" className="ms-1">Message</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={8}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Row>
                                <Col sm={3}>
                                    <Card.Text>Full Name</Card.Text>
                                </Col>
                                <Col sm={9}>
                                    <Card.Text className="text-muted">{currentUser.user.name}</Card.Text>
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col sm={3}>
                                    <Card.Text>Email</Card.Text>
                                </Col>
                                <Col sm={9}>
                                    <Card.Text className="text-muted">{currentUser.user.email}</Card.Text>
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col sm={3}>
                                    <Card.Text>Phone</Card.Text>
                                </Col>
                                <Col sm={9}>
                                    <Card.Text className="text-muted">{currentUser.user.phone}</Card.Text>
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col sm={3}>
                                    <Card.Text>Role</Card.Text>
                                </Col>
                                <Col sm={9}>
                                    <Card.Text className="text-muted">{currentUser.user.role}</Card.Text>
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col sm={3}>
                                    <Card.Text>Address</Card.Text>
                                </Col>
                                <Col sm={9}>
                                    <Card.Text className="text-muted">{currentUser.user.address}</Card.Text>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Profile;
