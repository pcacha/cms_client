import * as actions from "./actionsTypes";

const initialState = {
    id: 0,
    username: "",
    createdAt: null,
    isAuthor: false,
    isReviewer: false,
    isAdmin: false,
    isLoggedIn: false,
    token: "",
    expiredAt: null,
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case actions.LOGOUT_SUCCESS:
            return {...initialState};
        case actions.LOGIN_SUCCESS:
            return {
                ...action.payload,
            }
        case actions.SET_USERNAME:
            return {
                ...state,
                username: action.payload,
            }
        default:
            return state;
    }
}
