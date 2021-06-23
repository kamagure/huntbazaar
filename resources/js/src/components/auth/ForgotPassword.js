import React, { useState } from 'react';
import { forgotPassword } from '../../services/auth';
import AuthLayout from './AuthLayout';
import AuthFooter from './AuthFooter';
import AuthForm from './AuthForm';
import EmailForm from './EmailForm';
import { Link } from 'react-router-dom';

//functional component of Forgot Password
const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [enableButton, setEnableButton] = useState(true);
    const [status, setStatus] = useState({
        success: "",
        error: ""
    });

    //this function is to handle submit action 
    const handleSubmit = e => {
        e.preventDefault();
        setEnableButton(false);
        forgotPassword(email)                  //call forgot password from services auth 
            .then(res => {
                setEnableButton(true);
                setStatus({
                    success: res.message,
                    error: ""
                });
            }).catch(err => {
                setEnableButton(true);
                setStatus({
                    success: "",
                    error: err.message
                });
            });
    };

    // Show spinner while calling forgot password service
    let buttonFill;
    if (enableButton) {
        buttonFill = "SUBMIT";
    } else {
        buttonFill = <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    }

    // Rendering part of forgot password page
    return (
        <div className="h-100 auth-bg auth-bg-img">
            <AuthLayout success={status.success} error={status.error}>
                <AuthForm title="Reset Password Account" onSubmit={e => handleSubmit(e)}>
                    <EmailForm onChange={e => setEmail(e.target.value)} />
                    <button type="submit" className="font-weight-bold btn auth-bg text-white btn-block shadow-sm mt-4" disabled={!enableButton}>
                        {buttonFill}
                    </button>
                    <p className="text-center mt-4">
                        <Link to="/login">Back to Login?</Link>
                    </p>
                </AuthForm>
            </AuthLayout>
            <AuthFooter copyright="Megalodon" />
        </div>
    );
};

export default ForgotPassword;