import * as AuthActions from './ActionTypes/AuthTypes';
import axios from "axios";

export const reqUrl = process.env.REACT_APP_REQUEST_URL;

export const authRequest = () => {
    // console.log("Sending Auth Request")
    return {
        type: AuthActions.USER_AUTH_REQUEST
    }
}

export const authSuccess = (user) => {
    return {
        type: AuthActions.USER_AUTH_SUCCESS,
        user
    }
}


export const authFail = (msg) => {
    return {
        type: AuthActions.USER_AUTH_FAIL,
        msg
    }
}

export const authLogout = () => {
    return {
        type: AuthActions.USER_LOGOUT
    }
}


export const authenticateUSer = (email, password) => {

    return (dispatch) => {
        const url = process.env.REACT_APP_SERVER_URL;

        dispatch(authRequest());
        const params = {email, password}
        const qs = require('qs');
        axios.post(url + 'api/auth/user', qs.stringify(params))
            .then(response => {
                // console.log("User Authenticated")
                // console.log(response)
                if (response.data.isValid) {
                    dispatch(authSuccess(response.data.user))
                } else {
                    dispatch(authFail(response.data.msg))
                }

            })
            .catch(error => {
                // console.log("Error Occured")
                dispatch(authFail("Unable to Connect to Server"))
            })


    }
}

export const logout = () => {

}