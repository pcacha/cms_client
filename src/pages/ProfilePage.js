import React, {Component} from 'react';
import Input from "../components/Input";
import * as authActions from "../store/authActions";
import {connect} from "react-redux";
import ButtonWithProgress from "../components/ButtonWithProgress";
import * as apiCalls from "../apiCalls/apiCalls";
import handleError from "../shared/failureHandler";

class ProfilePage extends Component {

    state = {
        username: this.props.user.username,
        password: "",
        passwordRepeat: "",
        pendingApiCall: false,
        errors: {},
        passwordRepeatConfirmed: true,
        updated: false,
        updatePass: false,
    }

    onChange = (event) => {
        if (event.target.name === "passwordRepeat") {
            const value = event.target.value;
            const passwordRepeatConfirmed = this.state.password === value;
            const errors = {...this.state.errors};
            errors.passwordRepeat = passwordRepeatConfirmed ? "" : "Hesla se neshodují";
            this.setState({passwordRepeatConfirmed, errors});
        } else if (event.target.name === "password") {
            const value = event.target.value;
            const passwordRepeatConfirmed = this.state.passwordRepeat === value;
            const errors = {...this.state.errors};
            errors.passwordRepeat = passwordRepeatConfirmed ? "" : "Hesla se neshodují";
            delete errors["password"];
            if (value === "") {
                errors.password = "Heslo nesmí být prázdné";
                if (passwordRepeatConfirmed) {
                    errors.passwordRepeat = "Heslo nesmí být prázdné";
                }
            }
            this.setState({passwordRepeatConfirmed, errors});
        } else {
            const errors = {...this.state.errors};
            delete errors[event.target.name];
            this.setState({errors});
        }
        this.setState({[event.target.name]: event.target.value, updated: false});
    }

    onCheckboxChange = (e) => {
        let checked = e.currentTarget.checked;
        this.setState({updatePass: checked, updated: false})

        if (!checked) {
            let errors = {...this.state.errors};
            delete errors["password"];
            delete errors["passwordRepeat"];
            this.setState({password: "", passwordRepeat: "", errors});
        } else {
            const passwordRepeatConfirmed = this.state.password === this.state.passwordRepeat;
            const errors = {...this.state.errors};
            errors.passwordRepeat = passwordRepeatConfirmed ? undefined : "Hesla se neshodují";
            this.setState({passwordRepeatConfirmed, errors});
        }
    }

    handleApiError = (apiError) => {
        if (apiError.response.data && apiError.response.data.validationErrors) {
            let errors = {...apiError.response.data.validationErrors};
            this.setState({
                pendingApiCall: false,
                errors
            });
        }
    }

    onClickUpdate = () => {
        this.setState({pendingApiCall: true});
        let newUsername = this.state.username;
        let password = this.state.password;

        if (!this.state.updatePass) {
            apiCalls.updateUsername(newUsername).then(response => {
                this.setState({pendingApiCall: false, updated: true});
                this.props.setUsername(newUsername);
            }).catch(error => {
                return handleError(error);
            }).catch(apiError => {
                    this.handleApiError(apiError);
                }
            );
        } else {
            apiCalls.updateUser({username: newUsername, password}).then(response => {
                this.setState({pendingApiCall: false, updated: true});
                this.props.setUsername(newUsername);
            }).catch(error => {
                return handleError(error);
            }).catch(apiError => {
                    this.handleApiError(apiError);
                }
            );
        }
    }

    render() {
        const {
            username,
            password,
            passwordRepeat,
            pendingApiCall,
            errors,
            passwordRepeatConfirmed,
            updated,
            updatePass
        } = this.state;
        const {user} = this.props;
        let disabledSubmit = false;
        if (username === "" || pendingApiCall) {
            disabledSubmit = true;
        }
        if (updatePass && (!passwordRepeatConfirmed || password === "")) {
            disabledSubmit = true;
        }

        return (
            <div className="mx-auto mt-5 border rounded p-md-5 p-2 container gray-noise-background">
                <h2 className="mb-5">Moje Údaje</h2>

                {
                    updated &&
                    <div className="alert alert-success" role="alert">
                        Údaje byly aktualizovány
                    </div>
                }

                <form>
                    <div>
                        <span className="font-weight-bold">datum registrace: </span>
                        {new Date(user.createdAt * 1).toLocaleDateString("cs-CZ")}
                    </div>
                    <br/>

                    <div className="form-group">
                        <Input label="Jméno" name="username"
                               value={username}
                               onChange={this.onChange} hasError={errors.username && true}
                               error={errors.username}/>
                    </div>

                    <div className="form-check my-2">
                        <input type="checkbox" className="form-check-input" onChange={this.onCheckboxChange}/>
                        <label className="form-check-label">Změnit také heslo</label>
                    </div>

                    <div className="form-group">
                        <Input
                            label="Heslo"
                            placeholder="Zadej nové heslo" name="password" value={password}
                            onChange={this.onChange} type="password"
                            hasError={errors.password && true}
                            error={errors.password}
                        />
                    </div>

                    <div className="form-group">
                        <Input
                            label="Potvrdit Heslo"
                            placeholder="Zadej heslo znovu" name="passwordRepeat" value={passwordRepeat}
                            onChange={this.onChange} type="password"
                            hasError={errors.passwordRepeat && true}
                            error={errors.passwordRepeat}
                        />
                    </div>

                    <ButtonWithProgress onClick={this.onClickUpdate}
                                        className="btn btn-primary w-100 my-2"
                                        disabled={disabledSubmit}
                                        pendingApiCall={pendingApiCall}
                                        text="Aktualizovat údaje"/>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUsername: (username) => dispatch(authActions.setUsername(username)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);