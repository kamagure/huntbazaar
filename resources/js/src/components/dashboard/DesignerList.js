import React, { useState } from 'react';

// Functional component of favorite designer table
const DesignerList = (props) => {
    // State variable to store value currently written in the search box
    const [searchParam, setSearchParam] = useState("");

    // Function to render rows of designer table
    const renderDesigners = (designers) => {
        if (!designers) { 
            return ( // Render spinner while fetching data
            <tr>
                <td colSpan="2" style={{textAlign: "center"}}>
                    <div className="spinner-border" role="status">
                    </div>
                </td>
            </tr>
            );
        }

        if (designers.length === 0) { // Render message if no data available
            return (
            <tr>
                <td colSpan="2" style={{textAlign: "center"}}>
                    No data found.
                </td>
            </tr>
            );
        }
        
        return designers.map((designer, idx) => { // Render table row for each designer
            return (
            <tr key={`Post__${idx}`}>
                <td className="px-4">{designer.name_designer}</td>
                <td className="px-4">{designer.total}</td>
            </tr>
        )});
    };

    let designers;
    if (props.designers) { // Filter designers that match the search pattern
        const pattern = new RegExp(searchParam, "i");
        designers = props.designers.filter(designer => pattern.test(designer.name_designer));
    }

    // Rendering part of designer table
    return (
        <div className="bg-white mb-5 rounded shadow">
            <h5 className="pl-4 pt-4 font-weight-bold">Designer Favorite List</h5>
            <div className="form-group row mx-auto">
                <div className="col-8">
                </div>
                <div className="col-4">
                    <input className="form-control" type="text" placeholder="Search" onChange={e => setSearchParam(e.target.value)}></input>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-striped mt-4 mb-0">
                <thead className="thead-dark">
                    <tr>
                    <th className="px-4">Designer Name</th>
                    <th className="px-4">Polling Total</th>
                    </tr>
                </thead>
                <tbody>
                    {renderDesigners(designers)}
                </tbody>
                </table>
            </div>
        </div>
    );
}

export default DesignerList;