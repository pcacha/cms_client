import React, {Component} from 'react';
import {fetchArticleById, fetchReviewById} from "../apiCalls/apiCalls";
import Spinner from "../components/Spinner";
import {Redirect} from "react-router-dom";
import ButtonWithProgress from "../components/ButtonWithProgress";
import * as apiCalls from "../apiCalls/apiCalls";
import handleError from "../shared/failureHandler";

class ReviewPage extends Component {

    state = {
        id: this.props.match.params.id,
        starCount: 1,
        recommended: true,
        evaluation: "",
        articleName: "",
        pendingApiCall: false,
        errors: {},
        created: false,
        reviewFetchFailed: false,
        pendingReviewFetch: false,
    }

    componentDidMount() {
        const {id} = this.state;
        this.setState({pendingReviewFetch: true});
        fetchReviewById(id).then(response => {
            const {evaluation, recommended, starCount, articleName, editable} = response.data;
            if(editable === false) {
                this.setState({reviewFetchFailed: true});
            } else {
                this.setState({articleName});
            }
            if (evaluation !== null) {
                this.setState({evaluation, recommended, starCount});
            }
            this.setState({pendingReviewFetch: false});
        }).catch(error => {
            return handleError(error);
        }).catch((error) => {
            this.setState({reviewFetchFailed: true, pendingReviewFetch: false});
        });
    }


    onClickPublish = () => {
        this.setState({pendingApiCall: true});
        const {id, evaluation, starCount, recommended} = this.state;

        apiCalls.updateReview({id, evaluation, starCount, recommended}).then(response => {
            this.setState({pendingApiCall: false, created: true});
        }).catch(error => {
            return handleError(error);
        }).catch(error => {
            if (error.response && error.response.data && error.response.data.validationErrors) {
                this.setState({errors: error.response.data.validationErrors, pendingApiCall: false});
            } else {
                this.props.history.push("/");
            }
        });
    }

    onTextareaChange = (e) => {
        const errors = {...this.state.errors};
        delete errors[e.target.name];
        this.setState({[e.target.name]: e.target.value, errors, created: false});
    }

    onRecommendedChange = (e) => {
        if (e.target.name === "yes" && !!e.target.value) {
            this.setState({recommended: true, created: false});
        } else {
            this.setState({recommended: false, created: false});
        }
    }

    onStarCountChange = (e) => {
        const starCount = Number(e.target.value);
        this.setState({starCount, created: false});
    }

    render() {
        const {
            starCount,
            recommended,
            evaluation,
            articleName,
            pendingApiCall,
            errors,
            created,
            reviewFetchFailed,
            pendingReviewFetch
        } = this.state;

        let disabledSubmit = false;
        if (!evaluation || pendingApiCall) {
            disabledSubmit = true;
        }

        let exceptionContent = null;
        if (pendingReviewFetch) {
            exceptionContent = <Spinner/>
        } else if (reviewFetchFailed) {
            exceptionContent = <Redirect to="/"/>
        }

        return (
            <div className="mx-auto mt-5 border rounded p-md-5 p-2 container gray-noise-background">
                <h2 className="mb-5">Recenzovat Článek</h2>

                {
                    created &&
                    <div className="alert alert-success" role="alert">
                        Recenze byla úspěšně odeslána
                    </div>
                }

                {
                    !!exceptionContent ?
                        exceptionContent
                        :
                        <>
                            <h3 className="mb-3">{articleName}</h3>

                            <form>
                                <div className="form-group">
                                    <label className="font-weight-bold">
                                        {"Počet hvězd: "}
                                        {
                                            Array.from({length: starCount}, (x, i) =>
                                                <span key={i} className="fa fa-star text-warning star"/>
                                            )
                                        }
                                    </label>
                                    <select className="form-control" onChange={this.onStarCountChange}>
                                        {
                                            Array.from({length: 5}, (x, i) =>
                                                <option key={i} value={i + 1} selected={(i + 1) === starCount}>{i + 1}</option>
                                            )
                                        }
                                    </select>
                                </div>

                                <p className="font-weight-bold">Doporučit k publikaci:</p>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" checked={recommended} name="yes"
                                           onChange={this.onRecommendedChange}/>
                                    <label className="form-check-label">
                                        Ano
                                    </label>
                                </div>

                                <div className="form-check">
                                    <input className="form-check-input" type="radio" checked={!recommended} name="no"
                                           onChange={this.onRecommendedChange}/>
                                    <label className="form-check-label">
                                        Ne
                                    </label>
                                </div>

                                <div className="form-group mt-3">
                                    <label className="font-weight-bold">Zhodnocení: </label>
                                    <textarea className="form-control" rows="5" name="evaluation"
                                              placeholder="Zde napište své hodnocení" onChange={this.onTextareaChange}>
                            {
                                !!evaluation ? evaluation : null
                            }
                        </textarea>
                                    <span className="text-danger small">{errors.evaluation}</span>
                                </div>

                                <p className="text-center mt-5">
                                    <ButtonWithProgress
                                        className="btn btn-lg btn-primary"
                                        onClick={this.onClickPublish}
                                        disabled={disabledSubmit}
                                        text="Odeslat Recenzi"
                                        pendingApiCall={pendingApiCall}
                                    />
                                </p>
                            </form>
                        </>
                }
            </div>
        );
    }
}

export default ReviewPage;