import store from "../store/store";
import * as authActions from "../store/authActions";

export default function handleError(error) {
    return new Promise((resolve, reject) => {
        const status = error.response.status;
        if (status === 403) {
            store.dispatch(authActions.getFreshToken(store.getState().token));
        } else if(status === 401) {
            store.dispatch(authActions.logout());
        }
        reject(error);
    });
}