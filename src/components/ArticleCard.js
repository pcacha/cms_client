import React from "react";
import parse from 'html-react-parser';
import {SERVER_URL} from "../shared/sharedConstants";
import {Link} from "react-router-dom";

const ArticleCard = (props) => (
    <div className="card mb-4">
        <div className="card-body">
            <div className="row">
                <div className="col-12 col-md-3">
                    <a className="btn btn-success" target="_blank" href={SERVER_URL + props.documentName}>
                        <i className="fa fa-floppy-o"/>
                        {" Stáhnout Článek"}
                    </a>

                    {
                        props.toReview &&
                        <Link className="btn btn-secondary mt-2" to={"/recenzovat/" + props.reviewId}>
                            <i className="fa fa-pencil-square"/>
                            {" Recenzovat Článek"}
                        </Link>
                    }

                    <p className="card-text text-info">
                        <br/>
                        <span className="font-weight-bold">{props.username}</span>
                        <br/>
                        {props.createdAt}
                    </p>
                </div>
                <div className="col-12 col-md-9">
                    <h4 className="card-title font-italic mt-3 mt-md-0">
                        <a data-toggle="collapse" href={"#a" + props.id}>
                            <i className="fa fa-sort text-secondary" aria-hidden="true"/>
                            {" " + props.name}
                        </a>
                    </h4>

                    <div id={"a" + props.id} className="collapse">
                        <p>
                            {parse(props.text)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default ArticleCard;