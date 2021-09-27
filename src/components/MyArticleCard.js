import React from "react";
import parse from 'html-react-parser';
import {Link} from "react-router-dom";
import {SERVER_URL} from "../shared/sharedConstants";

const MyArticleCard = (props) => {
    let borderColor;
    switch (props.state) {
        case "REVIEWED":
            borderColor = "border-info";
            break;
        case "ACCEPTED":
            borderColor = "border-success";
            break;
        case "REJECTED":
            borderColor = "border-danger";
            break;
    }

    return (
        <div className="card mb-4" id="my-articles">
            <div className={borderColor + " card-body border rounded"} id="my-article-card">
                <div className="row">
                    <div className="col-12 col-md-3">
                        <a className="btn btn-success" target="_blank" href={SERVER_URL + props.documentName} rel="noopener noreferrer">
                            <i className="fa fa-floppy-o"/>
                            {" Stáhnout Článek"}
                        </a>

                        {
                            props.state === "REVIEWED" &&
                            <Link className="btn btn-secondary text-white my-2" to={"/publikovat/" + props.id}>
                                <i className="fa fa-pencil-square"/>
                                {" Upravit Článek"}
                            </Link>
                        }

                        <p className="card-text text-info">
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
                            {parse(props.text)}
                        </div>
                    </div>
                </div>

                {
                    props.state !== "REVIEWED" &&
                    <>
                        <hr/>
                        <div className="row">
                            <div className="col-3">
                                <p className="card-text text-info">
                                    {props.publishedAt}
                                </p>
                            </div>
                            <div className="col-9">
                                {
                                    props.state === "ACCEPTED" &&
                                    <h4 className="text-success">
                                        <i className="fa fa-check-circle"/>
                                        {" Akceptováno"}
                                    </h4>
                                }

                                {
                                    props.state === "REJECTED" &&
                                    <h4 className="text-danger">
                                        <i className="fa fa-times-circle"/>
                                        {" Zamítnuto"}
                                    </h4>
                                }

                                {props.evaluation}
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    );
};

export default MyArticleCard;