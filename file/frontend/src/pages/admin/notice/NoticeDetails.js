import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import NoticeAddModal from './NoticeAddModal';
import { fetchNotices, deleteNotice } from '../../../redux/actions/noticeAction';
import NoticeUpdateModal from './UpdateNoticeModal';
import Loading from '../../../common/Loading';
import DeleteConfirmationModal from '../user/DeleteConfirmationModal';
import PaginationCustom from '../../../common/PaginationCustom';
import AlertCustom from '../../../common/AlertCustom';

const NoticeDetails = () => {
    const dispatch = useDispatch();
    const { data, isLoading, isError } = useSelector((state) => state.notices);
    const users = useSelector((state) => state.auth);


    console.log(users, 'userssss')
    // define state
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
    const [selectedNotice, setSelectedNotice] = useState(null);


    // alert messagestate
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
                dispatch(fetchNotices(page))
                    .then((response) => {
                        console.log('Fetched maintenance datamaniiii: ', response);
                        const total_count = response.payload.data.total_count;
                        const calculatedTotalPages = Math.ceil(total_count / 10);
                        setAlertType('info');
                        setAlertMessage(response.payload.message);
                        setTotalPages(calculatedTotalPages);
                    })
                    .catch((error) => {
                        console.error('Error fetching maintenance data: ', error);
                        setAlertType('danger');
                        setAlertMessage('Error loading maintenance data.');
                    });
            } catch (error) {
                console.error('Error fetching house data:', error);
            }
        };
        fetchData(currentPage);
    }, [dispatch, currentPage]);



    const handleAddClick = () => {
        setShowAddModal(true);
    };

    const handleEditClick = (notice) => {
        setSelectedNotice(notice);
        setShowEditModal(true);
    };

    const handleUpdateClick = () => {
        setShowEditModal(false);
        setAlertType('success');
        setAlertMessage('Notice updated successfully.');
    };

    const handleDeleteClick = (notice) => {
        setSelectedNotice(notice);
        setDeleteConfirmationModal(true);
        console.log(`Deleting notice with ID: ${notice._id}`);
    };

    const handleDelete = () => {
        if (selectedNotice) {
            dispatch(deleteNotice(selectedNotice._id))
                .then(() => {
                    setDeleteConfirmationModal(false);
                    setAlertType('success');
                    setAlertMessage('Notice deleted successfully.');
                    dispatch(fetchNotices());
                })
                .catch((error) => {
                    console.error('Error deleting notice:', error);
                    setDeleteConfirmationModal(false);
                    setAlertType('danger');
                    setAlertMessage('Error deleting notice.');
                });
        }
    };

    return (
        <div>
            <Button variant="primary" onClick={handleAddClick} className='mb-3'>Add Notice</Button>
            {isLoading ? (
                <Loading />
            ) : isError ? (
                <div className='text-center'>Error loading notice data.</div>
            ) : (
                <>

                    <AlertCustom alertType={alertType} alertMessage={alertMessage} />
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Content</th>
                                <th>Sender</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.length > 0 && data.map((notice) => (
                                <tr key={notice._id}>
                                    <td>{notice.title}</td>
                                    <td>{notice.content}</td>
                                    <td>{(notice.sender.name)}</td>
                                    <td>
                                        <Button variant="outline-warning" size="sm" onClick={() => handleEditClick(notice)}>Edit</Button>{' '}
                                        <Button variant="outline-danger" size="sm" onClick={() => handleDeleteClick(notice)}>Delete</Button>
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

            {/* DeleteConfirmationModal for Notice */}
            <DeleteConfirmationModal selectedNotice={selectedNotice} deleteConfirmationModal={deleteConfirmationModal} setDeleteConfirmationModal={setDeleteConfirmationModal} handleDelete={() => handleDelete()} />
            {/* Add Notice Modal */}
            <NoticeAddModal showAddModal={showAddModal} setShowAddModal={setShowAddModal}
                setAlertType={setAlertType}
                setAlertMessage={setAlertMessage} />
            {/* Edit Notice Modal */}
            <NoticeUpdateModal showEditModal={showEditModal} selectedNotice={selectedNotice}
                handleUpdateClick={handleUpdateClick} setShowEditModal={setShowEditModal}
                setAlertType={setAlertType}
                setAlertMessage={setAlertMessage}
            />
        </div>
    );
};

export default NoticeDetails;
