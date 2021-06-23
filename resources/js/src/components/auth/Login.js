import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { login } from '../../services/auth';
import AuthLayout from './AuthLayout';
import AuthFooter from './AuthFooter';
import AuthForm from './AuthForm';
import EmailForm from './EmailForm';
import PasswordForm from './PasswordForm';
import { Link } from 'react-router-dom';

//functional component of Login
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [enableButton, setEnableButton] = useState(true);
    const [error, setError] = useState("");

    //this function is to handle login submit action
    const handleSubmit = e => {
        e.preventDefault();
        setEnableButton(false);
        login(email, password)       //call login services from services/auth
            .then(res => {
                setIsLoggedin(res);
            }).catch(err => {
                setEnableButton(true);
                setError(err.message);
            });
    }

    // Redirect to dashboard if the user is logged in
    if (isLoggedin) {
        return <Redirect to="/dashboard" />;
    }

    // Show spinner while calling login service
    let buttonFill;
    if (enableButton) {
        buttonFill = "SIGN IN";
    } else {
        buttonFill = <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    }

    // Rendering part of login page
    return (
        <div className="h-100 auth-bg auth-bg-img">
            <AuthLayout error={error}>
                <AuthForm title="Welcome" onSubmit={e => handleSubmit(e)}>
                    <EmailForm onChange={e => setEmail(e.target.value)} />
                    <PasswordForm label="Password" onChange={e => setPassword(e.target.value)} />
                    <button type="submit" className="font-weight-bold btn auth-bg text-white btn-block shadow-sm mt-4" disabled={!enableButton}>
                        {buttonFill}
                    </button>
                    <p className="text-center mt-4">
                        <Link to="/forgot-password">Forgot password?</Link>
                    </p>
                </AuthForm>
            </AuthLayout>
            <AuthFooter copyright="APJP" />
        </div>
    );
};

export default Login;