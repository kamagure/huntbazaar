import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom'
import SweetAlert from 'react-bootstrap-sweetalert';
import Global from '../layouts/Global';

const APP_URL = process.env.MIX_APP_URL;
const BASE_API_URL = process.env.MIX_BASE_API_URL;

class GuestIndex extends Component {
    
    constructor(){
        super()
        this.state = {
            all: []
        }
    }
    
    //axios method to call GET api for getting all guest data from api/guest/delete/$id
    componentDidMount(){
        axios.get(`${BASE_API_URL}/guest/list`).then((response) => {
            this.setState({
                all:response.data.data
            })
        })
    }

    //method for hiding the alert overlay
    hideAlert() {
        this.setState({
            alert: null
        });
    }


    //method to show overlay alert when delete button is clicked
    confirmDelete(id){
        const getAlert = () => (
            <SweetAlert
                warning
                showCancel
                confirmBtnText="Yes"
                cancelBtnText="No"
                confirmBtnBsStyle="default"
                cancelBtnBsStyle="danger"
                title="Are you sure to delete this data?"
                onConfirm={() => this.deleteItem(id)}
                onCancel={() => this.hideAlert()}
                focusCancelBtn
                >
            </SweetAlert>
        );
        this.setState({
            alert: getAlert()
        });
    }

    //axios method to call DELETE api for deleting guest from api/guest/delete/$id
    deleteItem(id) {
        axios.delete(`${BASE_API_URL}/guest/delete/${id}`).then(response => {
            var msg = response.data.success;
            if(msg == true){
                this.hideAlert();
                this.goToHome();
            }
        })
    }

    //method to show overlay when data has succesfully deleted
    //reroute the page to /guest/list
    goToHome(){
        const getAlert = () => (
            <SweetAlert
                success
                title="Success!"
                onConfirm={() => this.onSuccess() }
                onCancel={this.hideAlert()}
                timeout={2000}
                confirmBtnText="Yes"
                >
                Data successfully deleted
            </SweetAlert>
        );
        this.setState({
            alert: getAlert()
        });
    }

    onSuccess(){
        this.componentDidMount();
        this.hideAlert();
    }

    render(){
        const {all} = this.state
        console.log({all})
        return(
            <Global title="Guest List">
                <div className="d-flex flex-wrap mt-4 mb-5">
                    <div className="w-100 mb-8 px-4" >
                        <div className='position-relative flex flex-col bg-white w-100 mb-6 rounded min-vw-0'>
                            <div className='rounded-top mb-0 px-4 py-3 border-0'>
                                <div className='d-flex flex-wrap align-items-center'>
                                    <div className='position-relative w-100 px-4 flex-1 flex-grow'>
                                        <h3 className='font-weight-bold'>
                                            Guest List
                                        </h3>
                                        {/* Button to route the page to Invite Guest Page */}
                                        <div className='position-relative w-100 px-4 max-w-100 flex-grow flex-1 text-right'>
                                            <Link to='/guest/add' className='bg-primary text-white font-weight-bold uppercase px-3 py-1 rounded-pill mr-1 mb-1' type="button">Invite Guest</Link>
                                        </div>
                                    </div>                                
                                </div>
                            </div>
                        <div className="table-responsive">
                            {/* Projects table */}
                            <table className="table table-striped">
                                <thead className="bg-dark">
                                    <tr>
                                        <th className='px-4 bg-light text-gray align-middle border border-light py-3 uppercase border-left-0 border-right-0 text-left font-weight-bold'>
                                        NAME
                                        </th>
                                        <th className='px-4 bg-light text-gray align-middle border border-light py-3 uppercase border-left-0 border-right-0 text-left font-weight-bold'>
                                        E-MAIL
                                        </th>
                                        <th className='px-4 bg-light text-gray align-middle border border-light py-3 uppercase border-left-0 border-right-0 text-left font-weight-bold'>
                                        STATUS
                                        </th>
                                        <th className='px-4 bg-light text-gray align-middle border border-light py-3 uppercase border-left-0 border-right-0 text-left font-weight-bold'>
                                        ACTION
                                        </th>
                                    </tr>
                                </thead>
                                {/* Results from api GET all detail guest shown on this table */}
                                <tbody>
                                    {all.map((item, i) => (
                                        <tr key={i}>
                                            <th className='border-top-0 px-4 align-middle border border-light py-4 border-left-0 border-right-0 text-left'>
                                                {item.name}
                                            </th>
                                            <td className='border-top-0 px-4 align-middle border border-light py-4 border-left-0 border-right-0 text-left'>
                                                {item.email}
                                            </td>
                                            <td className='border-top-0 px-4 align-middle border border-light py-4 border-left-0 border-right-0 text-left'>
                                                    {item.tokens.status}
                                            </td>
                                            <td className='border-top-0 px-4 align-middle border border-light py-4 border-left-0 border-right-0 text-left'>       
                                                {/* Button to reroute to Guest Detail Page */}                      
                                                <Link
                                                    className='btn btn-primary text-white font-bold uppercase px-3 py-1 rounded-pill mr-1 mb-1'
                                                    to={`/guest/favorites/${item.id}`}
                                                    >Detail
                                                </Link>
                                                {/* Button to delte guests */} 
                                                <button
                                                    className='btn btn-danger text-white font-bold uppercase px-3 py-1 rounded-pill mr-1 mb-1'
                                                    onClick={() => this.confirmDelete(item.id)}
                                                    >Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                    )}
                                </tbody>
                            </table>
                            {this.state.alert}
                            </div>
                        </div>
                    </div>
                </div>
            </Global>
        )
    }

}

export default GuestIndex

// if (document.getElementById('guestIndex')) {
//     ReactDOM.render(<GuestIndex />, document.getElementById('guestIndex'));
// }