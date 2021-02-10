import * as UserActions from './ActionTypes/UserTypes'
import axios from "axios";
import {toast} from "react-toastify";

const qs = require('qs');
const notify = (text) => toast(text);
export const url = process.env.REACT_APP_SERVER_URL;
export const fetchUser = () => {
    return {
        type: UserActions.USER_FETCH_REQUEST
    }
}
export const fetchUserSuccess = (users) => {
    return {
        type: UserActions.USER_FETCH_SUCCESS,
        users
    }
}
export const fetchUserFail = () => {
    return {
        type: UserActions.USER_FETCH_FAIL,

    }
}

export const addUserRequest = () => {
    return {
        type: UserActions.USER_ADD_REQUEST
    }
}

export const addUserSuccess = (user) => {
    return {
        type: UserActions.USER_ADD_SUCCESS,
        user
    }
}
export const addUserFail = (msg) => {
    return {
        type: UserActions.USER_ADD_FAIL,
        msg
    }
}

export const updateUserRequest = () => {
    return {
        type: UserActions.USER_UPDATE_REQUEST
    }
}

export const updateUserSuccess = (user) => {
    return {
        type: UserActions.USER_UPDATE_SUCCESS,
        user
    }
}
export const updateUserFail = (msg) => {
    return {
        type: UserActions.USER_UPDATE_FAIL,
        msg
    }
}

export const deleteUserRequest = () => {
    return {
        type: UserActions.USER_DELETE_REQUEST
    }
}

export const deleteUserSuccess = (userId) => {
    return {
        type: UserActions.USER_DELETE_SUCCESS,
        userId
    }
}
export const deleteUserFail = (msg) => {
    return {
        type: UserActions.USER_DELETE_FAIL,
        msg
    }
}


export const listUsers = () => {

    return (disptach) => {
        disptach(fetchUser())
        return axios.post(url + 'api/get/users')
            .then(response => {
                // console.log(response)
                if (response.data.isValid) {
                    disptach(fetchUserSuccess(response.data.users))

                } else
                    disptach(fetchUserFail())

            })
            .catch(error => {
                disptach(fetchUserFail())
            })
    }

}
export const addUser = (data, history) => {

    return async (dispatch) => {
        // console.log("here")
        dispatch(addUserRequest())
        return axios.post(url + 'api/add/user', qs.stringify(data))
            .then(response => {
                if (response.data.isValid) {
                    dispatch(addUserSuccess(response.data.user))
                    notify("User Successfully Created")
                    setTimeout(()=>{
                        history.push("/user?added=true")
                    },2000)
                } else {
                    notify(response.data.msg)
                    dispatch(addUserFail(response.data.msg))
                }
            })
            .catch(error => {
                notify("Server Error Unable To Create User")
                dispatch(addUserFail())
            })

    }
}
export const updateUser = (userId , data, history) => {

    return (dispatch) => {
        dispatch(updateUserRequest())
        data['user_id']=userId;
        return axios.post(url + 'api/update/user', qs.stringify(data))
            .then(response => {
                if (response.data.isValid) {
                    dispatch(updateUserSuccess(response.data.user))
                    notify("User Successfully Updated")
                    setTimeout(()=>{
                        history.push("/user")
                    },2000)
                } else {
                    notify(response.data.msg)
                    dispatch(updateUserFail(response.data.msg))
                }
            })
            .catch(error => {
                notify("Server Error Unable To Create User")
                dispatch(updateUserFail("Server Error Unable To Create User"))
            })

    }
}
export const deleteUser = (userId) => {
    // console.log("User id"+userId)
    return (dispatch) => {
        dispatch(deleteUserRequest())
        const data ={user_id:userId,"status":0}
        return axios.post(url + 'api/update/user', qs.stringify(data))
            .then(response => {
                if (response.data.isValid) {
                    dispatch(deleteUserSuccess(userId))
                    notify("User Successfully Deleted")
                } else {
                    notify(response.data.msg)
                    dispatch(deleteUserFail(response.data.msg))
                }
            })
            .catch(error => {
                notify("Server Error Unable To Create User")
                dispatch(deleteUserFail("Server Error Unable To Delete User"))
            })

    }
}