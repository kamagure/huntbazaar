import React, { useState } from 'react';
import AuthLayout from './AuthLayout';
import AuthFooter from './AuthFooter';
import AuthForm from './AuthForm';
import EmailForm from './EmailForm';
import PasswordForm from './PasswordForm';
import { useLocation, Redirect } from 'react-router-dom';
import { resetPassword } from '../../services/auth';

//functional component of Reset Password
const ResetPassword = () => {
    const query = new URLSearchParams(useLocation().search);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pwdConfirm, setPwdConfirm] = useState("");
    const [enableButton, setEnableButton] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");

    //this function to handle submit action to reset password
    const handleSubmit = e => {
        e.preventDefault();
        setEnableButton(false);
        resetPassword(query.get('token'), email, password, pwdConfirm)    //call reset password services from services/auth
            .then(res => {
                setIsSuccess(true);
            }).catch(err => {
                setEnableButton(true);
                setError(err.message);
            });
    };

    // Redirect to login page if the user is logged in
    if (isSuccess) {
        return <Redirect to="/login" />
    }

    // Show spinner while calling reset password service
    let buttonFill;
    if (enableButton) {
        buttonFill = "RESET PASSWORD";
    } else {
        buttonFill = <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    }

    // Rendering part of reset password page
    return (
        <div className="h-100 auth-bg auth-bg-img">
            <AuthLayout error={error}>
                <AuthForm title="Welcome" onSubmit={e => handleSubmit(e)}>
                    <EmailForm onChange={e => setEmail(e.target.value)} />
                    <PasswordForm label="Password" onChange={e => setPassword(e.target.value)} />
                    <PasswordForm label="Password Confirmation" onChange={e => setPwdConfirm(e.target.value)} />
                    <button type="submit" className="font-weight-bold btn auth-bg text-white btn-block shadow-sm mt-4 mb-3" disabled={!enableButton}>
                        {buttonFill}
                    </button>
                </AuthForm>
            </AuthLayout>
            <AuthFooter copyright="Megalodon" />
        </div>
    );
};

export default ResetPassword;