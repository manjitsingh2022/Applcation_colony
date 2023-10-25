import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../../common/Loading';
import { fetchMaintenances } from '../../../redux/actions/maintenanceAction';
import AlertCustom from '../../../common/AlertCustom';

function MaintenanceRequestList() {
    const dispatch = useDispatch();
    const { data, isLoading, isError, message } = useSelector((state) => state.maintenances);
    const userIdCheck = useSelector((state) => state.auth.user.user._id);

    // State for alert message
    const [alertType, setAlertType] = useState(null);
    const [alertMessage, setAlertMessage] = useState(null);

    const handleAlert = (type, message) => {
        setAlertType(type);
        setAlertMessage(message);
    };

    // UseEffect
    useEffect(() => {
        dispatch(fetchMaintenances())
            .then((response) => {
                if (response.payload.success) {
                    handleAlert('success', response.payload.message);
                } else {
                    handleAlert('danger', response.payload.message);
                }
            })
            .catch((error) => {
                handleAlert('danger', 'An error occurred while loading maintenance requests.');
            });
    }, [dispatch,]);

    // Loading
    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return (
            <div className='text-center'>
                {message || "Error loading maintenance requests."}
            </div>
        );
    }

    const filteredData = data.filter((request) => request?.requester._id === userIdCheck);

    return (
        <div>
            <AlertCustom alertType={alertType} alertMessage={alertMessage} />
            <h3>Check your maintenance requests</h3>
            {filteredData?.length === 0 ? (
                <p>No maintenance requests found for this user.</p>
            ) : (
                <ul className="list-group">
                    {filteredData?.map((request) => (
                        <li
                            key={request._id}
                            className="list-group-item"
                        >
                            <strong>Title:</strong> {request.title} <br />
                            <strong>Description:</strong> {request.description} <br />
                            <strong>Status:</strong> {request.status} <br />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default MaintenanceRequestList;
