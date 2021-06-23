import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../services/auth';
import { Redirect, Route } from "react-router-dom";
import Spinner from './Spinner';

const ProtectedRoute = ({ component: Component, ...restOfProps }) => {
    const [authCheck, setAuthCheck] = useState({
        isResponded: false,
        isAuth: false
    });

    useEffect(() => {
        if (!authCheck.isResponded) {
            isAuthenticated()
                .then(res => {
                    setAuthCheck({
                        isResponded: true,
                        isAuth: res
                    });
                });
        }
    });

    return (
        <Route
            {...restOfProps}
            render={(props) => {
                if (!authCheck.isResponded) {
                    return <Spinner />
                }

                if (!authCheck.isAuth) {
                    return <Redirect to="/login" />;
                }

                return (
                    <Component {...props} />
                );
            }}
        />
    );
};

export default ProtectedRoute;