import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Loading from '../../../common/Loading';
import DeleteConfirmationModal from '../user/DeleteConfirmationModal';
import { deleteMaintenance, fetchMaintenances } from '../../../redux/actions/maintenanceAction';
import MaintenanceAddModal from './MaintenanceAddModal';
import UpdateMaintenanceModal from './UpdateMaintenanceModal';
import PaginationCustom from '../../../common/PaginationCustom';
import AlertCustom from '../../../common/AlertCustom';

const MaintenanceDetails = () => {
    const dispatch = useDispatch();
    const { data, isLoading, isError, message } = useSelector((state) => state.maintenances);

    console.log(data, 'data111111111')
    // const users = useSelector((state) => state.auth.data);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

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
                dispatch(fetchMaintenances(page))
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

    const handleEditClick = (maintenance) => {

        setSelectedRecord(maintenance);
        setShowEditModal(true);
    };

    const handleUpdateClick = () => {
        setShowEditModal(false);
        setAlertType('success');
        setAlertMessage('Maintenance updated successfully.');
    };

    const handleDeleteClick = (maintenance) => {
        setSelectedRecord(maintenance);
        setDeleteConfirmationModal(true);
    };

    const handleDelete = () => {
        if (selectedRecord) {

            dispatch(deleteMaintenance(selectedRecord._id))
                .then((response) => {
                    console.log(response, 'responslsndatamain')
                    setDeleteConfirmationModal(false);
                    setAlertType('success');
                    setAlertMessage(response.payload.message);
                })
                .catch((error) => {
                    console.error('Error deleting maintenance:', error);
                    setDeleteConfirmationModal(false);
                    setAlertType('danger');
                    setAlertMessage('Error deleting maintenance.');
                });
        }
    };

    return (
        <div>
            <Button variant="primary" onClick={handleAddClick} className='mb-3'>Add Maintenance</Button>
            {isLoading ? (
                <Loading />
            ) : isError ? (
                <div className='text-center'>Error loading Maintenance data.</div>
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
                                <th>Requester</th>
                                <th>Description</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.length > 0 && data.map((maintenance) => (
                                <tr key={maintenance._id}>
                                    <td>
                                        {maintenance.requester.name}
                                    </td>
                                    <td>{maintenance.description}</td>
                                    <td>{maintenance.status}</td>
                                    <td>
                                        <Button variant="outline-warning" size="sm" onClick={() => handleEditClick(maintenance)}>Edit</Button>{' '}
                                        <Button variant="outline-danger" size="sm" onClick={() => handleDeleteClick(maintenance)}>Delete</Button>
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

            {/* DeleteConfirmationModal Maintenance Modal */}
            <DeleteConfirmationModal
                selectedRecord={selectedRecord} deleteConfirmationModal={deleteConfirmationModal}
                setDeleteConfirmationModal={setDeleteConfirmationModal}
                handleDelete={() => handleDelete()}

            />

            {/* Add Maintenance Modal */}
            <MaintenanceAddModal
                showAddModal={showAddModal}
                setShowAddModal={setShowAddModal}
                setAlertType={setAlertType}
                setAlertMessage={setAlertMessage} />

            {/* Edit Maintenance Modal */}
            <UpdateMaintenanceModal
                showEditModal={showEditModal} selectedRecord={selectedRecord}
                handleUpdateClick={handleUpdateClick} setShowEditModal={setShowEditModal}
                setAlertType={setAlertType}
                setAlertMessage={setAlertMessage} />
        </div>
    );
};

export default MaintenanceDetails;
