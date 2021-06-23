import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Global from '../layouts/Global';

const APP_URL = process.env.MIX_APP_URL;
const BASE_API_URL = process.env.MIX_BASE_API_URL;

class Detail extends Component {

    constructor(){
        super()
        this.state = {
            details: []
        }
    }

    //axios method to call api GET detail guest from api/guest/favorites/$id
    componentDidMount(){
        const detailId = this.props.match.params.id

        axios.get(`${BASE_API_URL}/guest/favorites/${detailId}`).then((response) => {
            this.setState({
                details:response.data.data
            })
        })
    }


    render(){
        const {details} = this.state
        console.log({details})
        return (
            <Global title="Detail Person">
                <div className="d-flex flex-wrap mt-4">
                    <div className='w-100 mb-12 px-4'>
                        <div className='position-relative flex flex-col bg-white w-100 mb-6 rounded min-vw-0'>
                            <div className='rounded-top mb-0 px-4 py-3 border-0'>
                                <div className='d-flex flex-wrap align-items-center'>
                                    <div className='position-relative w-100 px-4 flex-1 flex-grow'>
                                        <h3 className='font-weight-bold'>
                                        Detail Person
                                        </h3>
                                        {/* Button to go back to Guest List page */}
                                        <div className='position-relative w-100 px-4 max-w-100 flex-grow flex-1 text-right'>
                                            <Link to='/guest/list' className='bg-warning text-black font-weight-bold px-3 py-1 rounded-pill mr-1 mb-1' type="button">BACK</Link>
                                        </div>
                                    </div>                                
                                </div>
                            </div>
                        <div className="table-responsive w-100">
                            {/* Projects table */}
                            <table className="table align-items-center mt-6 bg-transparent border-0">
                                <thead>
                                    <tr>
                                        <th className='px-4 bg-light text-gray align-middle border border-light py-3 border-left-0 border-right-0 text-left font-weight-bold'>
                                            STATUS
                                        </th>
                                        <th className='px-4 bg-light text-gray align-middle border border-light py-3 border-left-0 border-right-0 text-left font-weight-bold'>
                                            BIRTHDAY
                                        </th>
                                        <th className='px-4 bg-light text-gray align-middle border border-light py-3 border-left-0 border-right-0 text-left font-weight-bold'>
                                            EMAIL
                                        </th>
                                        <th className='px-4 bg-light text-gray align-middle border border-light py-3 border-left-0 border-right-0 text-left font-weight-bold'>
                                            SELECTED DESIGNER
                                        </th>
                                    </tr>
                                </thead>
                                {/* Results from api GET detail gues guest shown on this table */}
                                <tbody>
                                    {details.map((detail, i) => (
                                        <tr key={detail.id}>
                                            <th className='border-top-0 px-4 align-middle border border-light py-4 border-left-0 border-right-0 text-left'>
                                                {detail.tokens.status}
                                            </th>
                                            <td className='border-top-0 px-4 align-middle border border-light py-4 border-left-0 border-right-0'>
                                                {detail.birthday}
                                            </td>
                                            <td className='border-top-0 px-4 align-middle border border-light py-4 border-left-0 border-right-0'>
                                                {detail.email}
                                            </td>
                                            <td className='border-top-0 px-4 align-middle border border-light py-4 border-left-0 border-right-0'>
                                                <ol>
                                                    {detail.designers.map((designer, i) => 
                                                        <li key = {designer.id}>
                                                            {designer.name_designer}
                                                        </li>
                                                    )}
                                                </ol>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                </div>
            </Global>
        );
    }
}

export default Detail;

if (document.getElementById('detail')) {
    ReactDOM.render(<Detail />, document.getElementById('detail'));
}
