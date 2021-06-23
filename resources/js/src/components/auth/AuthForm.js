import React from 'react';

//functional component of authentication form
const AuthForm = (props) => {
    return (
        <form onSubmit={e => props.onSubmit(e)}>
            <h6 className="text-center font-weight-bold">{props.title}</h6>
            <hr className="border-bottom-0 border-secondary my-4" />
            {props.children}
        </form>
    );
};

export default AuthForm;