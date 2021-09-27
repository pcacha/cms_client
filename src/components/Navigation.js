import React, {Component} from 'react';
import {Link, NavLink} from "react-router-dom";
import NavigationItem from "../components/NavigationItem";
import {connect} from "react-redux";
import * as authActions from "../store/authActions";

class Navigation extends Component {

    render() {
        const {user} = this.props;

        return (
            <div className="position-fixed w-100 fixed-header">
                <nav className="blue-nav navbar navbar-expand-lg navbar-light" id="blue-nav">
                    <div className="container">
                        <Link className="navbar-brand" to="/">Vědecká konference</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"/>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto d-flex align-items-center">
                                <NavigationItem to="/">Úvod</NavigationItem>
                                <NavigationItem to="/clanky">Články</NavigationItem>
                                {
                                    user.isAdmin &&
                                    <li className="nav-item dropdown">
                                        <a href="#" className="nav-link" id="navbarDropdown" role="button" data-toggle="dropdown"
                                           aria-haspopup="true" aria-expanded="false">
                                            SPRAVOVAT
                                        </a>
                                        <div className="my-dropdown dropdown-menu" aria-labelledby="navbarDropdown">
                                            <NavLink className="dropdown-item" to="/spravceClanku">Články</NavLink>
                                            <div className="dropdown-divider" />
                                            <NavLink className="dropdown-item" to="/spravceUzivatelu">Uživatele</NavLink>
                                        </div>
                                    </li>
                                }
                                {user.isReviewer && <NavigationItem to="/recenzovat">RECENZOVAT</NavigationItem>}
                                {user.isAuthor && <NavigationItem to="/publikovat">PUBLIKOVAT</NavigationItem>}
                                {
                                    user.isLoggedIn ?
                                        <li className="nav-item dropdown">
                                            <a className="nav-link" id="navbarDropdown" role="button"
                                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                {user.username + " "}
                                                <i className="fa fa-user" aria-hidden="true"/>
                                            </a>

                                            <div className="my-dropdown dropdown-menu" aria-labelledby="navbarDropdown">
                                                {user.isAuthor && <NavLink className="dropdown-item" to="/mojeClanky">Moje Články</NavLink>}
                                                {user.isReviewer && <NavLink className="dropdown-item" to="/mojeRecenze">Moje Recenze</NavLink>}
                                                <NavLink className="dropdown-item" to="/mojeUdaje">Moje Údaje</NavLink>
                                                <div className="dropdown-divider"/>
                                                <a onClick={(e) => {e.preventDefault(); this.props.logout()}} className="dropdown-item" id="logout">Odhlásit</a>
                                            </div>
                                        </li>
                                        :
                                        <NavigationItem to="/login">Přihlášení</NavigationItem>
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
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
        logout: () => dispatch(authActions.logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);