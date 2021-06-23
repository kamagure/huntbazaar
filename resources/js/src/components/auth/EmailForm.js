import React from 'react';

//functional component of email form
const EmailForm = (props) => {
    return (
        <div className="form-group">
            <label className="text-uppercase auth-text-xs font-weight-bold">Email</label>
            <input type="email" className="form-control shadow-sm" placeholder="Email" onChange={e => props.onChange(e)} />
        </div>
    );
};

export default EmailForm;