import React from 'react';

function ReviewCard(props) {
    return (
        <div className="card mb-4">
            <div className="card-body border rounded">
                <div className="row">
                    <div className="col-12 col-md-3">
                        <span className="card-text text-secondary">autor recenze:</span>
                        <p className="card-text text-info">{props.reviewAuthor}</p>
                        <h4 className="text-warning">
                            {
                                Array.from({length: props.starCount}, (x, i) =>
                                    <i key={i} className="fa fa-star"/>
                                )
                            }
                        </h4>

                        <h4>
                            {"Doporučit: "}
                            {
                                props.recommended ?
                                    <i className="fa fa-thumbs-up text-success"/>
                                    :
                                    <i className="fa fa-thumbs-down text-danger"/>
                            }
                        </h4>
                    </div>

                    <div className="col-12 col-md-9 mt-3 mt-md-0">
                        <h4 className="card-title font-italic">{props.articleName}</h4>
                        <hr/>
                        <h5 className=" mt-3">Recenze:</h5>
                        <p className=" mt-3 mt-1">
                            {props.evaluation}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReviewCard;