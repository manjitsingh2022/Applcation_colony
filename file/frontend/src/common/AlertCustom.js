import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
// import Fade from 'react-bootstrap/Fade';
const AlertCustom = ({ alertType, alertMessage }) => {
    const [visible, setVisible] = useState(true);
    // const handleClose = () => setVisible(false);
    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), 3000);
        return () => clearTimeout(timer);
    }, [alertType, alertMessage]);

    return (
        <>
            {/* <Fade in={visible}>
            <Alert variant={alertType} dismissible onClose={handleClose}> */}
            {visible &&

                <Alert variant={alertType}  >
                    {alertMessage}
                </Alert>
            }
            {/* </Fade> */}
        </>
    );
};

export default AlertCustom;
