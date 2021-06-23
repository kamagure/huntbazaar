import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import { Redirect, useLocation } from 'react-router-dom';
import api from "../../api";

// FillInvite component 
// This component is the page for guest to filled their data for designer vote
// There are countdown message that appear on screen
const FillInvite = () => {
    const [message, setMessage] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [birthday, setBirthday] = useState("");
    const [designers, setDesigners] = useState([]);
    const [options, setOptions] = useState([]);
    const [errorAlert, setErrorAlert] = useState("");
    const [enableButton, setEnableButton] = useState(true); 
    const [enableForm, setEnableForm] = useState(true);
    const [submit, setSubmit] = useState({
        isSubmitted: false,
        registerCode: ""
    });
    const [timer, setTimer] = useState(null);
    const query = new URLSearchParams(useLocation().search);

    // handleTimer function
    // this asyncrhonous function used to get datetime data from api and 
    // the function will update the message that will appear on screen 
    const handleTimer = async () => {
        try {
            const res = await api.getDate();
            const result = res.data;
            const clock = result.datetime;

            const countDownDate = new Date(clock).getTime();
        
            let timer = setInterval(() => {
                const now = new Date().getTime();
                const distance = countDownDate - now;
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                setMessage(`Expired On: ${days} Days ${hours} h ${minutes} m ${seconds} s`);

                if (distance < 0) {
                    clearInterval(timer);
                    setMessage(`EXPIRED !`);
                    setEnableForm(false);
                }
            }, 1000);
            return timer;
        } catch(error) {
            throw new Error(error.message);
        } 
    }

    const handleDesigner = () => {
        api.getDesigner()
            .then(res => {
                setOptions(res.data.data.map(designer => {
                    return {
                        value: designer,
                        label: designer
                    }
                }));
            }).catch(err => {
                setErrorAlert(
                    <div className="alert alert-danger mx-auto w-100" role="alert">
                        {err.message}
                    </div>
                );
            });
    }

    // useEffect function
    // Tell the React to call handleTimer after render
    useEffect(() => {
        handleDesigner();
        handleTimer()
            .then(timer => {
                setTimer(timer);
            })
            .catch(err => {
                setMessage(
                    <div className="alert alert-danger mx-auto w-100" role="alert">
                        {err.message}
                    </div>
                );
            });
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        if (designers.length === 0) {
            setErrorAlert(
                <div className="alert alert-danger mx-auto w-100" role="alert">
                    {"Choose favorite designers!"}
                </div>
            );
        } else {
            setEnableButton(false);
            api.updateGuest({
                'email': query.get('email'),
                'first_name': firstname,
                'last_name': lastname,
                'birthday': birthday,
                'states': designers.map(data => data.value)
            })
            .then(res => {
                setSubmit({
                    isSubmitted: true,
                    registerCode: res.data.register_code
                });
            }).catch(err => {
                setErrorAlert(
                    <div className="alert alert-danger mx-auto w-100" role="alert">
                        {err.message}
                    </div>
                );
                setEnableButton(true);
            });   
        }
    };

    if (submit.isSubmitted) {
        clearInterval(timer);
        return <Redirect to={`/registration?code=${submit.registerCode}`} />;
    }

    let buttonFill;
    if (enableButton) {
        buttonFill = "SUBMIT";
    } else {
        buttonFill = <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    }

    return (
        <div className="h-100 auth-bg auth-bg-img">
            <div className="container h-100">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-md-6">
                        <div className="text-center mb-1">
                            <div id="timer" style={{fontSize: "1.5rem", lineHeight: "1rem"}} className="text-white font-weight-bold py-1">
                                {message}
                            </div>
                            <div>
                                {errorAlert}
                            </div>
                        </div>
                        <div className="auth-wrapper mx-auto w-100 px-4 py-4 shadow rounded">
                            <form onSubmit={e => handleSubmit(e)}>
                                <h6 className="text-center font-weight-bold">Welcome, Please fill in the form below</h6>
                                <hr className="border-bottom-0 border-secondary my-4" />
                                <div className="form-group">
                                    <label className="text-uppercase auth-text-xs font-weight-bold">Email</label>
                                    <input type="email" value={query.get('email')} className="form-control shadow-sm" placeholder="Email" disabled />
                                </div>
                                <div className="row">
                                    <div className="form-group col-6">
                                        <label className="text-uppercase auth-text-xs font-weight-bold">First Name</label>
                                        <input type="text" className="form-control shadow-sm" placeholder="First Name" onChange={e => setFirstname(e.target.value)} required={true} disabled={!enableForm} />
                                    </div>
                                    <div className="form-group col-6">
                                        <label className="text-uppercase auth-text-xs font-weight-bold">Last Name</label>
                                        <input type="text" className="form-control shadow-sm" placeholder="Last Name" onChange={e => setLastname(e.target.value)} required={true} disabled={!enableForm} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="text-uppercase auth-text-xs font-weight-bold">Birth Day</label>
                                    <input 
                                        type="date" 
                                        className="form-control shadow-sm" 
                                        id="date"
                                        onChange={e => setBirthday(e.target.value)}
                                        required={true}
                                        disabled={!enableForm} />
                                </div>
                                <div className="form-group">
                                    <label className="text-uppercase auth-text-xs font-weight-bold">Choose Favorite Designer</label>
                                    <Select
                                        isMulti
                                        options={options}
                                        className="basic-multi-select shadow-sm"
                                        classNamePrefix="select"
                                        required
                                        onChange={selected => setDesigners(selected)}
                                        disabled={!enableForm}
                                    />
                                </div>
                                <button type="submit" className="font-weight-bold btn auth-bg text-white btn-block shadow-sm mt-4" disabled={!enableButton || !enableForm}>
                                    {buttonFill}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FillInvite;