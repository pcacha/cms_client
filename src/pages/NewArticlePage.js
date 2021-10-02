import React, {Component} from 'react';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ButtonWithProgress from "../components/ButtonWithProgress";
import Input from "../components/Input";
import * as apiCalls from "../apiCalls/apiCalls";
import {fetchArticleById} from "../apiCalls/apiCalls";
import Spinner from "../components/Spinner";
import {Redirect} from "react-router-dom";
import handleError from "../shared/failureHandler";

class NewArticlePage extends Component {

    initState = {
        name: "",
        text: "<p>Napište abstrakt článku</p>",
        documentName: "Vyberte pdf dokument",
        encodedDocument: null,
        pendingApiCall: false,
        errors: {},
        created: false,
        editMode: !!this.props.match.params.id,
        articleFetchFailed: false,
        pendingArticleFetch: false,
    }

    state = this.initState;

    componentDidMount() {
        const id = this.props.match.params.id;
        if (this.state.editMode) {
            this.setState({pendingArticleFetch: true});
            fetchArticleById(id).then(response => {
                const {name, documentName, text} = response.data;
                this.setState({name, documentName, text, pendingArticleFetch: false});
            }).catch(error => {
                return handleError(error);
            }).catch((error) => {
                this.setState({articleFetchFailed: true, pendingArticleFetch: false});
            });
        }
    }

    handleErrors = (apiError) => {
        let errors = {...this.state.errors};
        if (apiError.response.data && apiError.response.data.validationErrors) {
            errors = {...apiError.response.data.validationErrors}
        }

        this.setState({
            pendingApiCall: false,
            errors
        })
    };

    onClickPublish = () => {
        this.setState({pendingApiCall: true});
        const {name, text, documentName, encodedDocument, editMode} = this.state;

        if (editMode) {
            const id = this.props.match.params.id;
            apiCalls.updateArticle({name, text, documentName, encodedDocument, id}).then(response => {
                this.setState({...this.initState}, () => {
                    this.setState({created: true}, () => {
                        this.props.history.push("/mojeClanky");
                    });
                });
            }).catch(error => {
                return handleError(error);
            }).catch(apiError => {
                    this.handleErrors(apiError);
                }
            );
        } else {
            apiCalls.postArticle({name, text, documentName, encodedDocument}).then((response) => {
                this.setState({...this.initState}, () => {
                    this.setState({created: true});
                });

            }).catch(error => {
                return handleError(error);
            }).catch(apiError => {
                    this.handleErrors(apiError);
                }
            );
        }
    }

    onChangeName = (e) => {
        const errors = {...this.state.errors};
        delete errors[e.target.name];
        this.setState({[e.target.name]: e.target.value, errors, created: false});
    }

    onFileSelect = (event) => {
        if (event.target.files.length === 0) {
            return;
        }

        const errors = {...this.state.errors};
        delete errors["documentName"];
        delete errors["encodedDocument"];

        const file = event.target.files[0];
        const documentName = file.name
        let reader = new FileReader();
        reader.onloadend = () => {
            this.setState({
                encodedDocument: reader.result.replace(/^[^,]*,/, ''),
                documentName,
                errors,
                created: false
            });
        }
        reader.readAsDataURL(file);
    }

    onAbstractChange = (event, editor) => {
        const errors = {...this.state.errors};
        delete errors["text"];
        this.setState({text: editor.getData(), created: false, errors});
    }

    render() {
        const {
            name,
            text,
            documentName,
            encodedDocument,
            pendingApiCall,
            created,
            editMode,
            articleFetchFailed,
            pendingArticleFetch
        } = this.state;
        let disabledSubmit = false;
        if (name === "" || text === "" || documentName === "" || encodedDocument === "" || pendingApiCall) {
            disabledSubmit = true;
        }

        let exceptionContent = null;
        if (editMode) {
            if (pendingArticleFetch) {
                exceptionContent = <Spinner/>
            } else if (articleFetchFailed) {
                exceptionContent = <Redirect to="/"/>
            }
        }

        return (
            <div className="mx-auto mt-5 border rounded p-2 p-md-5 container gray-noise-background">
                {
                    editMode ?
                        <h2 className="mb-5">Aktualizovat článek</h2>
                        :
                        <h2 className="mb-5">Vytvořit Nový Článek</h2>
                }

                {
                    created &&
                    <div className="alert alert-success" role="alert">
                        Článek byl úspěšně odeslán
                    </div>
                }

                {
                    exceptionContent !== null ?
                        exceptionContent
                        :
                        <form>
                            <div className="form-group">
                                <Input label="Název Článku:" name="name" placeholder="Zadejte název článku"
                                       value={name} boldLabel={true}
                                       onChange={this.onChangeName} hasError={this.state.errors.name && true}
                                       error={this.state.errors.name}/>
                            </div>

                            <p className="font-weight-bold">Článek:</p>
                            <div className="custom-file">
                                <input type="file" accept="application/pdf" className="custom-file-input"
                                       onChange={this.onFileSelect}/>
                                <label className="custom-file-label">{documentName}</label>
                                {this.state.errors.documentName &&
                                <div><span className="text-danger small">{this.state.errors.documentName}</span></div>}
                                {this.state.errors.encodedDocument &&
                                <div><span className="text-danger small">{this.state.errors.encodedDocument}</span>
                                </div>}
                            </div>


                            <div className="form-group mt-3">
                                <label className="font-weight-bold">Abstrakt:</label>
                                <CKEditor editor={ClassicEditor} data={text} onChange={this.onAbstractChange}/>
                                {this.state.errors.text &&
                                <div><span className="text-danger small">{this.state.errors.text}</span></div>}
                            </div>


                            <p className="text-center mt-5">
                                <ButtonWithProgress
                                    className="btn btn-lg btn-primary"
                                    onClick={this.onClickPublish}
                                    disabled={disabledSubmit || pendingApiCall}
                                    text="Publikovat Článek"
                                    pendingApiCall={pendingApiCall}
                                />
                            </p>
                        </form>
                }
            </div>
        );
    }
}

export default NewArticlePage;