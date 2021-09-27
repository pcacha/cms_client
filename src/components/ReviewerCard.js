import React from 'react';

function ReviewerCard(props) {
    return (
        <div className="card mb-4">
            <div className="card-body">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <h5>{props.username}</h5>
                    </div>
                    <div className="col-12 col-md-6">
                        <span className="font-weight-bold">registrace: </span>
                        {props.createdAt}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReviewerCard;