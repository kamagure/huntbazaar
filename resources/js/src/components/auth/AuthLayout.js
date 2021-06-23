import React from 'react';

//functional component of authentication layout 
const AuthLayout = (props) => {
    let success;
    if (props.success) { // Show success message if there is one
        success = (
            <div className="alert alert-success mx-auto w-75" role="alert">
                {props.success}
            </div>
        );
    }

    let error;
    if (props.error) { // Show error message if there is one
        error = (
            <div className="alert alert-danger mx-auto w-75" role="alert">
                {props.error}
            </div>
        );
    }

    // Rendering part of authentication layout
    return (
        <div className="container h-100">
            <div className="row justify-content-center align-items-center h-100">
                <div className="col-md-6">
                    {success}
                    {error}
                    <div className="auth-wrapper mx-auto w-75 px-4 py-4 shadow rounded">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;