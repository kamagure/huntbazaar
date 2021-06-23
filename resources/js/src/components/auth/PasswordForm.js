import React from 'react';

//functional component of Password Form
const PasswordForm = (props) => {
    return (
        <div className="form-group">
            <label className="text-uppercase auth-text-xs font-weight-bold">{props.label}</label>
            <input type="password" className="form-control shadow-sm" placeholder={props.label} onChange={e => props.onChange(e)} />
        </div>
    );
};

export default PasswordForm;