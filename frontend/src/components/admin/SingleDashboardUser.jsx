import React from 'react';



const SingleDashboardUser = ({ fullName, email, role, id }) => {
    return (
        <tr>
            <td className='text-capitalize' style={{ fontSize: "1rem" }}>{fullName}</td>
            <td>{email}</td>
            <td>
                <div class={role == "admin" ? "badge badge-outline-success" : "badge badge-outline-danger"}>{role}</div>
            </td>
            <td><i className="fa fa-ellipsis-vertical"></i></td>
        </tr>
    );
}

export default SingleDashboardUser;