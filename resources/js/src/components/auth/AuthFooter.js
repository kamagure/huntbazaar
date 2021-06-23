import React from 'react';

//functional component of footer
const AuthFooter = (props) => {
    return (
        <footer className="fixed-bottom w-100 auth-bg pb-4">
            <div className="mx-auto px-4">
                <hr className="border-bottom-0 border-dark mt-0 mb-4" />
                <div className="d-flex flex-wrap justify-content-center">
                    <div className="w-100 text-center px-3">
                        <div className="font-weight-bold text-white py-1">
                            Copyright © 2020
                            <a href="#" className="text-white font-weight-bold py-1"> {props.copyright}</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default AuthFooter;