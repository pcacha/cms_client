import React from 'react';

function UserManagerRow(props) {
    return (
        <tr>
            <td>{props.username}</td>
            <td>{props.createdAt}</td>
            <td>
                <input type="checkbox" checked={props.isAuthor} onChange={(e) => props.onCheckboxChange(props.id, "author", e.currentTarget.checked)} />
            </td>
            <td>
                <input type="checkbox" checked={props.isReviewer} onChange={(e) => props.onCheckboxChange(props.id, "reviewer", e.currentTarget.checked)} />
            </td>
            <td>
                <input type="checkbox" checked={props.isBanned} onChange={(e) => props.onCheckboxChange(props.id, "banned", e.currentTarget.checked)} />
            </td>
            <td>
                <button className="btn btn-primary" onClick={() => props.onDelete(props.id)}>Smazat</button>
            </td>
        </tr>
    );
}

export default UserManagerRow;