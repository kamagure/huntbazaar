import React from 'react';

// Functional component of guest list table
const GuestList = (props) => {
    // Function to render rows of guest list table
    const renderGuests = () => {
        if (!props.guests) { // Render spinner while fetching data
            return (
            <tr>
                <td colSpan="3" style={{textAlign: "center"}}>
                    <div className="spinner-border" role="status">
                    </div>
                </td>
            </tr>
            );
        }

        if (props.guests.length === 0) { // Render message if no data available
            return (
            <tr>
                <td colSpan="3" style={{textAlign: "center"}}>
                    There is no guest yet. Add one.
                </td>
            </tr>
            );
        }
        
        // Rendering part of guest list table
        return props.guests.map((guest) => { // Render table row for each guest
            let tokenBg;
            if (guest.tokens.status == "FINISH") { // Change status background based on token's status
            tokenBg = "bg-success";
            } else {
            tokenBg = "bg-danger";
            }
            return (
            <tr key={`Post__${guest.id}`}>
                <td className="px-4">{guest.name}</td>
                <td className="px-4">{guest.email}</td>
                <td className="px-4">
                <span className={`text-white font-weight-bold p-1 rounded-pill ${tokenBg}`}>
                    {guest.tokens.status}
                </span>
                </td>
            </tr>
        )})
    };

    return (
        <div className="bg-white rounded shadow mb-5 mt-4">
            <h5 className="pl-4 pt-4 font-weight-bold">Guest List</h5>
            <div className="table-responsive">
                <table className="table table-striped mt-4 mb-0">
                <thead className="thead-dark">
                    <tr>
                    <th className="px-4">NAME</th>
                    <th className="px-4">EMAIL</th>
                    <th className="px-4">STATUS</th>
                    </tr>
                </thead>
                <tbody>
                    {renderGuests()}
                </tbody>
                </table>
            </div>
        </div>
    );
}

export default GuestList;