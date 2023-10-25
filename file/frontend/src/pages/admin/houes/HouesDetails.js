import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Loading from '../../../common/Loading';
import DeleteConfirmationModal from '../user/DeleteConfirmationModal';
import { deleteHouse, fetchHouses } from '../../../redux/actions/houseAction';
import HouseAddModal from './HouseAddModal';
import UpdateHouseModal from './UpdateHouesModal';
import PaginationCustom from '../../../common/PaginationCustom';
import AlertCustom from '../../../common/AlertCustom';

const HouseDetails = () => {
    const dispatch = useDispatch();
    const { data, isLoading, isError } = useSelector((state) => state.houses);
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
                const response = await dispatch(fetchHouses(page));
                console.log(response, 'paylosdddd')
                const total_count = response.payload.data.total_count;
                const calculatedTotalPages = Math.ceil(total_count / 10);
                setAlertType('info');
                setAlertMessage(response.payload.message);
                setTotalPages(calculatedTotalPages);
            } catch (error) {
                console.error('Error fetching house data:', error);
            }
        };
        fetchData(currentPage);
    }, [dispatch, currentPage]);




    // Handle adding a new house
    const handleAddClick = () => {
        setShowAddModal(true);
    };

    // Handle editing a house
    const handleEditClick = (house) => {
        setSelectedRecord(house);
        setShowEditModal(true);
    };

    // Handle successful house update
    const handleUpdateClick = () => {
        setShowEditModal(false);
        setAlertType('success');
        setAlertMessage('House updated successfully.');
    };

    // Handle deleting a house
    const handleDeleteClick = (house) => {
        setSelectedRecord(house);
        setDeleteConfirmationModal(true);
    };

    // Handle confirming and executing the delete action
    const handleDelete = async () => {
        if (selectedRecord) {
            try {
                const response = await dispatch(deleteHouse(selectedRecord._id));
                setDeleteConfirmationModal(false);
                setAlertType('danger');
                setAlertMessage(response.payload.message);

            } catch (error) {
                console.log(error)
                setDeleteConfirmationModal(false);
                setAlertType('danger');
                setAlertMessage(error);
            }
        }
    };

    return (
        <div>
            <Button variant="primary" onClick={handleAddClick} className='mb-3'>Add house</Button>
            {isLoading ? (
                <Loading />
            ) : isError ? (
                <div className='text-center'>Error loading House data.</div>
            ) : (
                <>

                    <AlertCustom alertType={alertType} alertMessage={alertMessage} />
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>HouseNumber</th>
                                <th>Owner</th>
                                <th>PropertyType</th>
                                <th>Residents</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.length > 0 && data.map((house) => (
                                <tr key={house._id}>
                                    <td>{house.houseNumber}</td>
                                    <td>{house.owner.name}</td>
                                    <td>{house.propertyType}</td>
                                    <td>
                                        {house.residents.map((resident) => (
                                            <span key={resident._id}>{resident.name}</span>
                                        ))}
                                    </td>

                                    <td>
                                        <Button variant="outline-warning" size="sm" onClick={() => handleEditClick(house)}>Edit</Button>{' '}
                                        <Button variant="outline-danger" size="sm" onClick={() => handleDeleteClick(house)}>Delete</Button>
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

            {/* DeleteConfirmationModal house Modal */}
            <DeleteConfirmationModal
                selectedRecord={selectedRecord}
                deleteConfirmationModal={deleteConfirmationModal}
                setDeleteConfirmationModal={setDeleteConfirmationModal}
                handleDelete={handleDelete}
            />

            {/* Add House Modal */}
            <HouseAddModal
                showAddModal={showAddModal}
                setShowAddModal={setShowAddModal}
                setAlertType={setAlertType}
                setAlertMessage={setAlertMessage}
            />
            {/* Edit House Modal */}
            <UpdateHouseModal
                showEditModal={showEditModal}
                selectedRecord={selectedRecord}
                handleUpdateClick={handleUpdateClick}
                setShowEditModal={setShowEditModal}
                setAlertType={setAlertType}
                setAlertMessage={setAlertMessage}
            />
        </div>
    );
};

export default HouseDetails;
