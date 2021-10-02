import * as apiCalls from "../apiCalls/apiCalls";
import * as actionsTypes from "./actionsTypes";
import jwt_decode from "jwt-decode";

export const login = (credentials) => {
    return dispatch => {
        return apiCalls.login(credentials).then(response => {
            dispatch(loginSuccess(response.data.token));
            return response;
        })
    }
}

const loginSuccess = (token) => {
    const decodedToken = jwt_decode(token);

    const user = {
        id: decodedToken.id,
        username: decodedToken.username,
        createdAt: decodedToken.createdAt,
        isAuthor: decodedToken.isAuthor,
        isReviewer: decodedToken.isReviewer,
        isAdmin: decodedToken.isAdmin,
        isLoggedIn: true,
        token: token,
        expiredAt: decodedToken.exp,
    }

    return {
        type: actionsTypes.LOGIN_SUCCESS,
        payload: user,
    };
}

export const getFreshToken = (token) => {
    return dispatch => {
        apiCalls.getFreshToken(token).then(response => {
            dispatch(loginSuccess(response.data.token));
        });
    }
}

export const signup = (user) => {
    return dispatch => {
        return apiCalls.signup(user).then(response => {
            return dispatch(login(user));
        });
    }
}

export const logout = () => {
    return {
        type: actionsTypes.LOGOUT_SUCCESS
    }
}

export const setUsername = (username) => {
    return {
        type: actionsTypes.SET_USERNAME,
        payload: username,
    }
}