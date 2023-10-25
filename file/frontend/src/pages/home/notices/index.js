import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loading from '../../../common/Loading';
import AlertCustom from '../../../common/AlertCustom';
import { fetchNotices } from '../../../redux/actions/noticeAction';

const Notices = () => {
    const dispatch = useDispatch();
    const { data, isLoading, isError, message } = useSelector((state) => state.notices);
    const check = useSelector((state) => state.auth.user.user._id);
    const { noticeId } = useParams();

    const [alertType, setAlertType] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // if () {
                const response = await dispatch(fetchNotices());
                if (response.payload.success) {
                    setAlertType('info');
                    setAlertMessage(response.payload.message);
                } else {
                    setAlertType('danger');
                    setAlertMessage('Error fetching the notices.');
                }
                // }
            } catch (error) {
                console.error('Error fetching notice data: ', error);
                setAlertType('danger');
                setAlertMessage('Error loading notice data.');
            }
        };

        fetchData();
    }, [dispatch, noticeId]);

    const filteredData = data

    return (
        <div className="container">
            <h1>Notices</h1>
            {isLoading ? (
                <Loading />
            ) : isError ? (
                <div className='text-center'>Error loading notice data.</div>
            ) : (
                <div>
                    <AlertCustom alertType={alertType} alertMessage={alertMessage} />
                    {filteredData.length === 0 ? (
                        <div>
                            <p className="text-white bg-dark text-center p-4">
                                {noticeId ? 'No notices found for this user.' : 'No notices available.'}
                            </p>
                        </div>
                    ) : (
                        <div className="row">
                            {filteredData.map((notice, index) => (
                                <div key={notice._id} className="col-lg-4 col-md-6 mb-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">{notice.title}</h5>
                                            <p className="card-text">{notice.content}</p>
                                        </div>
                                        <div className="card-footer">
                                            <small className="text-muted">
                                                Sent by {notice.sender.name}
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Notices;
