import React from 'react';

function AddReviewerTable(props) {
    return (
        <table className="table table-dark table-striped table-bordered table-hover">
            <thead className="thead-light">
            <tr>
                <th scope="col">Jméno</th>
                <th scope="col">Přidat</th>
            </tr>
            </thead>

            <tbody>
            {
                props.notReviewers.map(nr =>
                    <tr>
                        <td>{nr.username}</td>
                        <td>
                            <button className="btn btn-primary myAdd" onClick={() => props.addReviewer(nr.id)}>
                                Přidat
                            </button>
                        </td>
                    </tr>
                )
            }
            </tbody>
        </table>
    );
}

export default AddReviewerTable;