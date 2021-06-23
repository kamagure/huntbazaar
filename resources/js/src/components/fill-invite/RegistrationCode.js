import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useLocation } from 'react-router-dom';


//Registration page component
//This component is used for  guest that have filled voting form to see their registration code
//The code is sent from the fill invite page as params
const RegistrationCode = () => {
    const query = new URLSearchParams(useLocation().search);

    return (
        <div className="h-100 auth-bg auth-bg-img">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="card mx-auto border-1 text-center" style={{width: "40rem"}}>
                        <h3 className="card-header bg-primary text-white">Your Registration Code</h3>
                        <div className="card-body">
                            {/* Get the code from URL */}
                            <p style={{fontSize: "4rem", lineHeight: "3rem"}} className="card-text mt-4 p-3 font-weight-bold">{query.get('code')}</p>
                            {/* Button to copy the code */}
                            <CopyToClipboard text={query.get('code')}>
                                <button type="button" className="btn btn-primary mt-4 bg-primary">Copy to clipboard</button>
                            </CopyToClipboard>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default RegistrationCode;