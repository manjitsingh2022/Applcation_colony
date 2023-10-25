import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useWindowSize } from '../hooks/useWindowSize';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Image } from 'react-bootstrap';
import { logout } from '../redux/actions/authAction';
import './sidebar.css'
const Sidebar = () => {
    const { noticeId } = useParams();
    const size = useWindowSize();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { role, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    useEffect(() => {
        if (size.width && size.width < 1080) {
            setSidebarOpen(false);
        } else {
            setSidebarOpen(true);
        }
    }, [size]);

    return (
        <div className={`sidebar${sidebarOpen ? 'active' : ''}`}>
            <nav>
                <hr />
                <ul className="nav nav-pills flex-column ">
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link">
                            <span className='fs-6'>Home</span>
                        </NavLink>
                    </li>
                    <li>
                        <div onClick={toggleSidebar} className='d-flex'>
                            <span className='fs-6 nav-link me-4'>Request</span>
                            <span className='mt-2'>{!sidebarOpen ? '▲' : '▼'}</span>
                        </div>
                        {sidebarOpen && (
                            <ul className="nav flex-column ms-3">
                                <li className="nav-item">
                                    <NavLink to="/user/request" className="nav-link">
                                        <span className='fs-6'>Maintenance</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to={`/notices`} className="nav-link">
                                        <span className='fs-6'>Notices</span>
                                    </NavLink>

                                </li>


                            </ul>
                        )}
                    </li>
                    <li className="nav-item">
                        <NavLink to="/contact" className="nav-link ">
                            <span className='fs-6'>Contact</span>
                        </NavLink>
                    </li>
                    {role === 'admin' && (
                        <li>
                            <div onClick={toggleSidebar} className='d-flex'>
                                <span className='fs-6 nav-link me-4'>Admin Board</span>
                                <span className='mt-2'>{!sidebarOpen ? '▲' : '▼'}</span>
                            </div>
                            {sidebarOpen && (
                                <ul className="nav flex-column ms-3">
                                    <li className="nav-item">
                                        <NavLink to="/admin/users" className="nav-link">
                                            <span className='fs-6'>Users</span>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/admin/house" className="nav-link">
                                            <span className='fs-6'>Houses</span>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/admin/maintenance" className="nav-link">
                                            <span className='fs-6'>Maintenances</span>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/admin/notices" className="nav-link">
                                            <span className='fs-6'>Notices</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            )}
                        </li>
                    )}
                    <li className="nav-item">
                        <NavLink to="/profile" className="nav-link ">
                            <span className='fs-6'>Profile</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/event" className="nav-link ">
                            <span className='fs-6'>Events</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <hr />
            <div className="d-flex align-items-center text-black text-decoration-none dropdown mt-auto" >
                <Image src={user.user.photo} alt="User Avatar" roundedCircle width="32" height="32" className="me-2" />
                <Dropdown className="custom-dropdown">
                    <Dropdown.Toggle id="dropdown-basic" as="div">
                        <strong>{user.user.name}</strong>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item as="button">Settings</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item as="button" onClick={handleLogout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <div className="b-example-divider b-example-vr"></div>
        </div>
    );
};

export default Sidebar;
