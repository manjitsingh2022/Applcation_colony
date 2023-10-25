import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMaintenance } from '../../../redux/actions/maintenanceAction';
import AlertCustom from '../../../common/AlertCustom';
import Loading from '../../../common/Loading';
import MaintenanceRequestList from './MaintenanceRequestList';

function MaintenanceRequestCard() {
  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');

  const [maintenanceRequest, setMaintenanceRequest] = useState({
    title: '',
    description: '',
  });

  const dispatch = useDispatch();
  const { isLoading, isError, message } = useSelector((state) => state.auth);
  const userId = useSelector((state) => state.auth.user.user._id);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMaintenanceRequest({ ...maintenanceRequest, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!maintenanceRequest.title || !maintenanceRequest.description) {
      setAlertType('danger');
      setAlertMessage('Please fill in all required fields.');
      return;
    }

    if (maintenanceRequest.title && maintenanceRequest.description) {
      const maintenanceData = {
        title: maintenanceRequest.title,
        description: maintenanceRequest.description,
        requester: userId,
      };

      try {
        await dispatch(createMaintenance(maintenanceData)).then((response) => {
          if (response.payload.success) {
            setAlertType('success');
            setAlertMessage(response.payload.message);
            setMaintenanceRequest({
              title: '',
              description: '',
            });
          } else {
            setAlertType('danger');
            setAlertMessage('An error occurred while submitting the maintenance request.');
          }
        });
      } catch (error) {
        setAlertType('danger');
        setAlertMessage('An error occurred while submitting the maintenance request.');
      }
    }
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <div className="text-center">{message || "Error loading House data."}</div>
      ) : (
        <>
          <AlertCustom alertType={alertType} alertMessage={alertMessage} />
          <div className="row">
            <div className="col-7">
              <div className="card bg-light">
                <div className="card-body">
                  <h5 className="card-title">Maintenance Request</h5>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">
                        Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={maintenanceRequest.title}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">
                        Description
                      </label>
                      <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={maintenanceRequest.description}
                        onChange={handleInputChange}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Submit Request</button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-5">
              <MaintenanceRequestList />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MaintenanceRequestCard;
