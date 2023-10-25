import React from 'react';
import HeaderComponent from './HeaderComponent';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const Layout = () => {
    return (
        <div className="min-vh-100">
            <header className="">
                <HeaderComponent />
            </header>

            <div className=" mt-5 flex-grow-1">
                <Row>
                    <Col md={2} lg={2} className="d-flex flex-column flex-shrink-0 p-3 text-bg-wh">
                        <Sidebar />
                    </Col>
                    <Col md={10} lg={10} className='mt-3'>
                        <main className='mb-5 p-1'>
                            <Outlet />
                        </main>
                    </Col>
                </Row>
            </div>

            <footer className=" fixed-bottom" style={{ bottom: 0 }}>
                <Footer />
            </footer>
        </div>
    );
};

export default Layout;
