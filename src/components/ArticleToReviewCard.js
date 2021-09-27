import React from 'react';
import {SERVER_URL} from "../shared/sharedConstants";
import {Link} from "react-router-dom";
import parse from "html-react-parser";
import AddReviewerTable from "./AddReviewerTable";

function ArticleToReviewCard(props) {

    const {article, notReviewers} = props;

    const addReviewer = (userId) => {
        props.addReviewer(article.id, userId);
    }

    return (
        <div className="card mb-4">
            <div className="card-body">
                <div className="row">
                    <div className="col-12 col-md-3">
                        <a className="btn btn-success" target="_blank" href={SERVER_URL + article.documentName}>
                            <i className="fa fa-floppy-o"/>
                            {" Stáhnout Článek"}
                        </a>

                        <Link className="btn btn-secondary my-2" to={"/spravceClanku/recenze/" + article.id}>
                            <i className="fa fa-comments"/>
                            {" Recenze Článku"}
                        </Link>

                        <Link className="btn btn-secondary" to={"/spravceClanku/rozhodnout/" + article.id}>
                            <i className="fa fa-paper-plane"/>
                            {" Rozhodnout"}
                        </Link>

                        <p className="card-text text-info">
                            <br/>
                            <span className="font-weight-bold"> {article.username} </span>
                            <br/>
                            {article.createdAt}
                        </p>

                    </div>

                    <div className="col-12 col-md-9">
                        <h4 className="card-title font-italic mt-3 mt-md-0">
                            <a data-toggle="collapse" href={"#a" + article.id}>
                                <i className="fa fa-sort text-secondary" aria-hidden="true"/>
                                {" " +article.name}
                            </a>
                        </h4>

                        <div id={"a" + article.id} className="collapse">
                            {parse(article.text)}
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col">
                        <h4>Přidat recenzenty:</h4>

                        {
                            notReviewers.length === 0 ?
                                <><h5 className="text-danger">Nemůžeš přidat žádné další recenzenty</h5><br/></>
                                :
                                <AddReviewerTable notReviewers={notReviewers} addReviewer={addReviewer} />
                        }

                        <Link className="btn btn-primary" to={"/spravceClanku/recenzenti/" + article.id}>Přehled
                            recenzentů</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArticleToReviewCard;