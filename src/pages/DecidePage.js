import React, {Component} from 'react';
import * as apiCalls from "../apiCalls/apiCalls";
import Spinner from "../components/Spinner";
import {Redirect} from "react-router-dom";
import ButtonWithProgress from "../components/ButtonWithProgress";
import handleError from "../shared/failureHandler";

class DecidePage extends Component {

    state = {
        id: this.props.match.params.id,
        recommend: true,
        evaluation: "",
        articleName: "",
        pendingApiCall: false,
        errors: {},
        articleFetchFailed: false,
        pendingArticleFetch: false,
    }

    componentDidMount() {
        const {id} = this.state;
        this.setState({pendingArticleFetch: true});
        apiCalls.fetchArticleById(id).then(response => {
            const {name} = response.data;
            this.setState({articleName: name, pendingArticleFetch: false});
        }).catch(error => {
            return handleError(error);
        }).catch((error) => {
            this.setState({articleFetchFailed: true, pendingArticleFetch: false});
        });
    }

    onRecommendedChange = (e) => {
        if (e.target.name === "yes" && !!e.target.value) {
            this.setState({recommend: true});
        } else {
            this.setState({recommend: false});
        }
    }

    onTextareaChange = (e) => {
        const errors = {...this.state.errors};
        delete errors[e.target.name];
        this.setState({[e.target.name]: e.target.value, errors});
    }

    onClickPublish = () => {
        this.setState({pendingApiCall: true});
        const {id, evaluation, recommend} = this.state;

        apiCalls.sendDecide({articleId: id, evaluation, recommend}).then(response => {
            this.setState({pendingApiCall: false}, () => this.props.history.push("/clanky"));
        }).catch(error => {
            if (error.response && error.response.data && error.response.data.validationErrors) {
                this.setState({errors: error.response.data.validationErrors, pendingApiCall: false});
            } else {
                this.props.history.push("/");
            }
        });
    }

    render() {
        const {recommend, evaluation, articleName, pendingApiCall, errors, articleFetchFailed, pendingArticleFetch} = this.state;

        let disabledSubmit = false;
        if (!evaluation || pendingApiCall) {
            disabledSubmit = true;
        }

        let exceptionContent = null;
        if (pendingArticleFetch) {
            exceptionContent = <Spinner/>
        } else if (articleFetchFailed) {
            exceptionContent = <Redirect to="/"/>
        }

        return (
            <div className="mx-auto mt-5 border rounded p-md-5 p-2 container gray-noise-background">
                <h2 className="mb-5">Publikovat/Odmítnout Článek</h2>

                {
                    !!exceptionContent ?
                        exceptionContent
                        :
                        <>
                            <h3 className="mb-3">{articleName}</h3>

                            <form>
                                <p className="font-weight-bold">Publikovat:</p>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" checked={recommend} name="yes"
                                           onChange={this.onRecommendedChange} />
                                    <label className="form-check-label">
                                        Ano
                                    </label>
                                </div>

                                <div className="form-check">
                                    <input className="form-check-input" type="radio" checked={!recommend} name="no"
                                           onChange={this.onRecommendedChange}/>
                                    <label className="form-check-label">
                                        Ne
                                    </label>
                                </div>

                                <div className="form-group mt-3">
                                    <label className="font-weight-bold">Zhodnocení: </label>
                                    <textarea className="form-control" rows="5" placeholder="Zde napište své hodnocení" onChange={this.onTextareaChange} name="evaluation">
                                        {evaluation}
                                    </textarea>
                                    <span className="text-danger small">{errors.evaluation}</span>
                                </div>

                                <p className="text-center mt-5">
                                    <ButtonWithProgress
                                        className="btn btn-lg btn-primary"
                                        onClick={this.onClickPublish}
                                        disabled={disabledSubmit}
                                        text="Odeslat Hodnocení"
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

export default DecidePage;