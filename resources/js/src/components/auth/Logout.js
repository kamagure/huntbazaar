import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { logout } from '../../services/auth';
import Spinner from '../Spinner';

//functional component of Logout
const Logout = () => {
    const [isLoggedout, setIsLoggedout] = useState(false);

    useEffect(() => {
        if (!isLoggedout) {
            logout()                        // call logout services from services/auth to log user out
                .then(res => {
                    setIsLoggedout(res);
                });
        }
    });

    // Show spinner while calling logout service
    if (!isLoggedout) {
        return <Spinner />
    }

    // Redirect to login page if logout success
    return <Redirect to="/login" />;
};

export default Logout;