import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom'
import SweetAlert from 'react-bootstrap-sweetalert';
import Global from '../layouts/Global';

const APP_URL = process.env.MIX_APP_URL;
const BASE_API_URL = process.env.MIX_BASE_API_URL;

class Create extends Component {


    constructor (props) {
        super(props)
        this.state = {
            email: '',
            alert: null,
            errors: [],
            loading: false
        }
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleInvite = this.handleInvite.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
    }
 
    //Method for handling form for email
    handleFieldChange (event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    //Method to show alert overlay when guest succesfully invited
    goToHome(){
        const getAlert = () => (
            <SweetAlert
                success
                title="Success!"
                onConfirm={() => this.onSuccess() }
                onCancel={this.hideAlert()}
                timeout={2000}
                confirmBtnText="Continue"
                >
                The email has been invited.
            </SweetAlert>
        );
        this.setState({
            alert: getAlert()
        });
    }

    //Method to show alert overlay when guest was failed to be invited because the email is already exist in database
    invitationFailed(){
        const getAlert = () => (
            <SweetAlert
                error
                title="Invitation Failed"
                onConfirm={() => this.onFailed()}
                onCancel={this.hideAlert()}
                timeout={2000}
                confirmBtnText="Continue"
                >
                This email already exists.
            </SweetAlert>
        );
        this.setState({
            alert: getAlert()
        });
    }

    //Method to reroute to guest/list when guest succesfully invited
    onSuccess() {
        this.props.history.push(`/guest/list`);
    }

    //Method to reroute to guest/list when guest failed to be invited
    onFailed() {
        this.props.history.push(`/guest/list`);
    }

    //Method to hide overlay alert
    hideAlert() {
        this.setState({
            alert: null
        });
    }

    //Axios method to call api PUSH invite guest from api/guest/invite
    //This method will show overlay based on the message it get from the api call
    handleInvite (event) {
        this.setState({loading: true});
        event.preventDefault()
        const mail = {
          email: this.state.email
        }
        axios.post(`${BASE_API_URL}/guest/invite`, mail).then(response => { 
            var msg = response.data.success;
            this.setState({loading: false});
            if(msg == true){
                return this.goToHome();
            }
            else{
                return this.invitationFailed();
            }
        })
    }

    //method to check if field of form has error in it
    hasErrorFor (field) {
        return !!this.state.errors[field]
    }
 
    //method to show if field of form has error in it
    renderErrorFor (field) {
        if (this.hasErrorFor(field)) {
            return (
            <span className='invalid-feedback'>
                <strong>{this.state.errors[field][0]}</strong>
            </span>
            )
        }
    }

    
    render(){
        // Show spinner while calling post create
        let buttonFill;
        if (!this.state.loading) {
            buttonFill = "Invite";
        } else {
            buttonFill = <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        }
        
        return(
            <Global title="Invitate Guest">
                <div className="d-flex flex-wrap mt-4">
                    <div className='w-100 mb-12 px-4 mx-auto'>
                        <div className='position-relative flex flex-col bg-white w-100 mb-6 rounded min-vw-0'>
                            <div className="rounded-top mb-0 px-4 py-3 border-0">
                                <div className='d-flex flex-wrap align-items-center'>
                                    <div className='position-relative w-100 position-relative w-100 px-4 flex-1 flex-grow'>
                                        <h3 className = 'font-weight-bold'>
                                        Invitate Guest
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        <div className = 'w-100 mt-6 mx-6 px-4 pb-3'>
                            {/* Field of form to fill email */}
                            <form onSubmit={this.handleInvite}>
                                <div className='form-group'>
                                    {/* Validation for email is automated */}
                                    <label htmlFor='email' className='mt-2 text-gray-600 uppercase font-weight-bold'>E-MAIL</label>
                                    <input
                                    id='email'
                                    type='email'
                                    placeholder="user@email.com"
                                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,}$"
                                    className={`form-control bg-light ${this.hasErrorFor('email') ? 'is-invalid' : ''}`}
                                    name='email'
                                    value={this.state.email}
                                    onChange={this.handleFieldChange}
                                    />
                                    {this.renderErrorFor('email')}
                                </div>
                                {/* Button to invite email's guest and call api/guest/invite */}
                                <button className='btn w-100 mb-6 mt-6 text-white auth-bg text-uppercase hover:bg-blue-900 font-weight-bold' disabled={this.state.loading}>
                                    {buttonFill}
                                </button>
                                {this.state.alert}
                            </form>
                        </div>
                        </div>
                    </div>
                </div>
            </Global>
        )
    }
}

export default Create;

if (document.getElementById('create')) {
    ReactDOM.render(<Create />, document.getElementById('create'));
}
