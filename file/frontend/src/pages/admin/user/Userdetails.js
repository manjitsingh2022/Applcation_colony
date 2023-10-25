import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import UserAddModal from './UserAddModal';
import Image from 'react-bootstrap/Image';

import { getUsers, deleteUserById } from '../../../redux/actions/authAction';
import UpdateUserModal from './UpdateUserModal';
import Loading from '../../../common/Loading';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import AlertCustom from '../../../common/AlertCustom';
import PaginationCustom from '../../../common/PaginationCustom';

const Userdetails = () => {
    const dispatch = useDispatch();
    const { data, isLoading, isError } = useSelector((state) => state.auth);
    //First check reject define (isError), then check console again and then remove it
    console.log(isError, 'error')
    console.log(data, 'data')

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);



    const [alertType, setAlertType] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');



    // paginationstate
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    useEffect(() => {
        const fetchData = async (page) => {
            try {
                const response = await dispatch(getUsers(page));
                if (response) {
                    console.log(response, 'paylsdsdsdsdsosdddd')
                    const total_count = response.payload.data.total_count;
                    console.log(total_count)
                    const calculatedTotalPages = Math.ceil(total_count / 10);
                    setAlertType('info');
                    setAlertMessage(response.payload.message);
                    setTotalPages(calculatedTotalPages);
                } else {
                    setAlertType('warning');
                    setAlertMessage('No user data found.');
                }

            } catch (error) {
                if (error.response && error.response.status === 404) {
                    // Handle 404 Not Found error here
                    setAlertType('warning');
                    setAlertMessage('Resource not found.');
                } else {
                    // Handle other errors
                    setAlertType('danger');
                    setAlertMessage(error.message);
                }
            }
        };
        fetchData(currentPage);
    }, [dispatch, currentPage]);



    const handleAddClick = () => {
        setShowAddModal(true);
    };

    const handleEditClick = (user) => {
        console.log(user, 'user')
        setSelectedRecord(user);
        setShowEditModal(true);
    };


    const handleUpdateClick = () => {
        setShowEditModal(false);
        setAlertType('success');
        setAlertMessage('User updated successfully.');
    };


    const handleDeleteClick = (user) => {
        setSelectedRecord(user);
        setDeleteConfirmationModal(true);
        console.log(`Deleting user with ID: ${user._id}`);
    };

    const handleDelete = () => {
        if (selectedRecord) {
            dispatch(deleteUserById({ userId: selectedRecord._id }))
                .then((response) => {
                    setDeleteConfirmationModal(false);
                    setAlertType('danger');
                    setAlertMessage(response.payload.message);
                })
                .catch((error) => {
                    console.error('Error deleting user:', error);
                    setDeleteConfirmationModal(false);
                    setAlertType('danger');
                    setAlertMessage(error);
                });
        }
    };


    return (
        <div>
            <Button variant="primary" onClick={handleAddClick} className='mb-3'>Add User</Button>
            {isLoading ? (
                <Loading />
            ) : isError ? (
                <div className='text-center'>Error loading user data.</div>
            ) : (

                <>
                    {/* {alertType && (
                        <div className={`alert alert-${alertType}`} role="alert">
                            {alertMessage}
                        </div>
                    )} */}
                    <AlertCustom alertType={alertType} alertMessage={alertMessage} />
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>

                                <th>Name</th>
                                <th>Phone</th>
                                <th>Role</th>
                                <th>Photo</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.length > 0 && data?.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.role}</td>
                                    <td> <Image src={user.photo} roundedCircle width={40} height={40} /></td>
                                    <td>{user.address}</td>
                                    <td >
                                        <Button variant="outline-warning" size="sm" onClick={() => handleEditClick(user)}>Edit</Button>{' '}
                                        <Button variant="outline-danger" size="sm" onClick={() => handleDeleteClick(user)}>Delete</Button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <PaginationCustom
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </>
            )}

            {/* DeleteConfirmationModal User Modal */}
            <DeleteConfirmationModal
                selectedRecord={selectedRecord} deleteConfirmationModal={deleteConfirmationModal}
                setDeleteConfirmationModal={setDeleteConfirmationModal}
                handleDelete={() => handleDelete()} />
            {/* Add User Modal */}
            <UserAddModal
                showAddModal={showAddModal} setShowAddModal={setShowAddModal}
                setAlertType={setAlertType}
                setAlertMessage={setAlertMessage}
            />
            {/* Edit User Modal */}
            <UpdateUserModal
                showEditModal={showEditModal} selectedRecord={selectedRecord}
                handleUpdateClick={handleUpdateClick} setShowEditModal={setShowEditModal}
                setAlertType={setAlertType}
                setAlertMessage={setAlertMessage}
            />
        </div>
    );
};

export default Userdetails;
