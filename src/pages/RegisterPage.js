import React, {Component} from 'react';
import {connect} from "react-redux";
import ButtonWithProgress from "../components/ButtonWithProgress";
import * as authActions from "../store/authActions";
import Input from "../components/Input";

class RegisterPage extends Component {

    state = {
        username: "",
        password: "",
        passwordRepeat: "",
        pendingApiCall: false,
        errors: {},
        passwordRepeatConfirmed: true,
    }

    onChange = (event) => {
        if (event.target.name === "passwordRepeat") {
            const value = event.target.value;
            const passwordRepeatConfirmed = this.state.password === value;
            const errors = {...this.state.errors};
            errors.passwordRepeat = passwordRepeatConfirmed ? "" : "Hesla se neshodují";
            this.setState({passwordRepeatConfirmed, errors});
        }
        else if (event.target.name === "password") {
            const value = event.target.value;
            const passwordRepeatConfirmed = this.state.passwordRepeat === value;
            const errors = {...this.state.errors};
            errors.passwordRepeat = passwordRepeatConfirmed ? "" : "Hesla se neshodují";
            this.setState({passwordRepeatConfirmed, errors});
        }
        else {
            const errors = {...this.state.errors};
            delete errors[event.target.name];
            this.setState({errors});
        }
        this.setState({[event.target.name]: event.target.value});
    }

    onClickSignup = () => {
        const user = {
            username: this.state.username,
            password: this.state.password
        }
        this.setState({pendingApiCall: true});

        this.props.signup(user).then(response => {
            this.setState({pendingApiCall: false}, () => this.props.history.push("/"));
        }).catch(apiError => {
                let errors = {...this.state.errors};
                if (apiError.response.data && apiError.response.data.validationErrors) {
                    errors = {...apiError.response.data.validationErrors}
                }

                this.setState({
                    pendingApiCall: false,
                    errors
                })
            }
        );
    }

    render() {
        let disabledSubmit = false;
        if (this.state.username === "" || this.state.password === "" || this.state.passwordRepeat === "") {
            disabledSubmit = true;
        }

        return (
            <div className="mx-auto bg-white mt-5 border rounded p-2 p-md-5 container auth-div gray-noise-background">
                <form>
                    <h4>Registrovat se</h4>
                    <div className="form-group">
                        <Input
                            label="Jméno"
                            placeholder="Zadej jméno" name="username" value={this.state.username}
                            onChange={this.onChange}
                            hasError={this.state.errors.username && true}
                            error={this.state.errors.username}
                        />
                    </div>
                    <div className="form-group">
                        <Input
                            label="Heslo"
                            placeholder="Zadej heslo" name="password" value={this.state.password}
                            onChange={this.onChange} type="password"
                            hasError={this.state.errors.password && true}
                            error={this.state.errors.password}
                        />
                    </div>
                    <div className="form-group">
                        <Input
                            label="Potvrdit Heslo"
                            placeholder="Zadej heslo znovu" name="passwordRepeat" value={this.state.passwordRepeat}
                            onChange={this.onChange} type="password"
                            hasError={this.state.errors.passwordRepeat && true}
                            error={this.state.errors.passwordRepeat}
                        />
                    </div>

                    <ButtonWithProgress  onClick={this.onClickSignup}
                                         className="btn btn-primary w-100 my-2"
                                         disabled={this.state.pendingApiCall || !this.state.passwordRepeatConfirmed || disabledSubmit}
                                         pendingApiCall={this.state.pendingApiCall}
                                         text="Registrovat se" />
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signup: (user) => dispatch(authActions.signup(user)),
    }
}

export default connect(null, mapDispatchToProps)(RegisterPage);