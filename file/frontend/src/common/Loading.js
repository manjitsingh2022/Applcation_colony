import React from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
const Loading = () => {
    return (
        <div className="text-center">
            <Spinner animation="grow" />
        </div>
    );
};

export default Loading;
