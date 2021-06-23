import React from 'react';

//functional component of Spinner
const Spinner = () => {
    return (
        <div className="h-100 d-flex justify-content-center align-items-center">
            <div className="spinner-border" role="status">
            </div>
        </div>
    );
};

export default Spinner;