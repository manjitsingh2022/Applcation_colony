import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

const Contact = () => {
    return (
        <Row className="mt-5">
            <Col md={4}>
                <h2>Contact Us</h2>
                <p>
                    We'd love to hear from you! Please fill out the form below to get in touch with us.
                </p>
            </Col>
            <Col md={8} >
                <Form >
                    <div className="d-grid gap-3">

                        <Form.Group controlId="formBasicName" >
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter your name" />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter your email" />
                        </Form.Group>

                        <Form.Group controlId="formBasicMessage">
                            <Form.Label>Message</Form.Label>
                            <Form.Control as="textarea" rows={4} placeholder="Enter your message" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </div>
                </Form>
            </Col>
        </Row>
    );
};

export default Contact;
