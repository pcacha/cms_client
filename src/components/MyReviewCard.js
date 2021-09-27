import React from 'react';
import {Link} from "react-router-dom";

const MyReviewCard = (props) => {
    return (
        <div className="card mb-4">
            <div className="card-body border rounded">
                <div className="row">
                    <div className="col-12 col-md-3">
                        <span className="card-text text-secondary">autor článku:</span>
                        <p className="card-text text-info">{props.articleAuthor}</p>
                    </div>

                    <div className="col-12 col-md-9 mt-3 mt-md-0">
                        <h4 className="card-title font-italic">{props.articleName}</h4>
                    </div>
                </div>
                <hr/>

                <div className="row">
                    <div className="col-12 col-md-3">
                        <h4 className="text-warning">
                            {
                                Array.from({length: props.starCount}, (x, i) =>
                                    <i key={i} className="fa fa-star" />
                                )
                            }
                        </h4>
                        <h4>
                            {"Doporučit: "}
                            {
                                props.recommended ?
                                    <i className="fa fa-thumbs-up text-success" />
                                    :
                                    <i className="fa fa-thumbs-down text-danger" />
                            }
                        </h4>

                        {
                            props.editable &&
                            <Link className="btn btn-secondary text-white my-2" to={"/recenzovat/" + props.id}>
                                <i className="fa fa-pencil-square" />
                                {" Upravit Recenzi"}
                            </Link>
                        }
                    </div>

                    <div className="col-12 col-md-9">
                        <p className="mt-3">
                            {props.evaluation}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyReviewCard;