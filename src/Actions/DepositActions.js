import * as DepositActions from './ActionTypes/DepositTypes'
import axios from "axios";
import {toast} from "react-toastify";

const qs = require('qs');
const notify = (text) => toast(text);
export const url = process.env.REACT_APP_SERVER_URL;
export const fetchDeposit = () => {
    return {
        type: DepositActions.DEPOSIT_FETCH_REQUEST
    }
}
export const fetchDepositSuccess = (deposits) => {
    return {
        type: DepositActions.DEPOSIT_FETCH_SUCCESS,
        deposits
    }
}
export const fetchDepositFail = () => {
    return {
        type: DepositActions.DEPOSIT_FETCH_FAIL,

    }
}

export const addDepositRequest = () => {
    return {
        type: DepositActions.DEPOSIT_ADD_REQUEST
    }
}

export const addDepositSuccess = (deposit) => {
    return {
        type: DepositActions.DEPOSIT_ADD_SUCCESS,
        deposit
    }
}
export const addDepositFail = (msg) => {
    return {
        type: DepositActions.DEPOSIT_ADD_FAIL,
        msg
    }
}

export const updateDepositRequest = () => {
    return {
        type: DepositActions.DEPOSIT_UPDATE_REQUEST
    }
}

export const updateDepositSuccess = (deposit) => {
    return {
        type: DepositActions.DEPOSIT_UPDATE_SUCCESS,
        deposit
    }
}
export const updateDepositFail = (msg) => {
    return {
        type: DepositActions.DEPOSIT_UPDATE_FAIL,
        msg
    }
}

export const deleteDepositRequest = () => {
    return {
        type: DepositActions.DEPOSIT_DELETE_REQUEST
    }
}

export const deleteDepositSuccess = (depositId) => {
    return {
        type: DepositActions.DEPOSIT_DELETE_SUCCESS,
        depositId
    }
}
export const deleteDepositFail = (msg) => {
    return {
        type: DepositActions.DEPOSIT_DELETE_FAIL,
        msg
    }
}


export const listDeposits = () => {

    return (disptach) => {
        disptach(fetchDeposit())
        axios.post(url + 'api/get/deposits')
            .then(response => {
                // console.log(response)
                if (response.data.isValid) {
                    disptach(fetchDepositSuccess(response.data.deposits))

                } else
                    disptach(fetchDepositFail())

            })
            .catch(error => {
                disptach(fetchDepositFail())
            })
    }

}
export const addDeposit = (data, history) => {

    return (dispatch) => {
        // console.log("here")
        data['date'] = data['date'].toDateString()

        dispatch(addDepositRequest())
        axios.post(url + 'api/add/deposit', qs.stringify(data))
            .then(response => {
                if (response.data.isValid) {
                    dispatch(addDepositSuccess(response.data.deposit))
                    notify("Deposit Successfully Created")
                    setTimeout(()=>{
                        history.push("/deposits")
                    },2000)
                } else {
                    notify(response.data.msg)
                    dispatch(addDepositFail(response.data.msg))
                }
            })
            .catch(error => {
                notify("Server Error Unable To Create Deposit")
                dispatch(addDepositFail())
            })

    }
}
export const updateDeposit = (depositId , data, history) => {

    return (dispatch) => {
        dispatch(updateDepositRequest())
        data['deposit_id']=depositId;
        data['date'] = data['date'].toDateString();
        // console.log(data)
        axios.post(url + 'api/update/deposit', qs.stringify(data))
            .then(response => {
                if (response.data.isValid) {
                    dispatch(updateDepositSuccess(response.data.deposit))
                    notify("Deposit Successfully Updated")
                    setTimeout(()=>{
                        history.push("/deposits")
                    },2000)
                } else {
                    notify(response.data.msg)
                    dispatch(updateDepositFail(response.data.msg))
                }
            })
            .catch(error => {
                notify("Server Error Unable To Create Deposit")
                dispatch(updateDepositFail("Server Error Unable To Create Deposit"))
            })

    }
}
export const deleteDeposit = (depositId) => {
    // console.log("Deposit id"+depositId)
    return (dispatch) => {
        dispatch(deleteDepositRequest())
        const data ={deposit_id:depositId}
        axios.post(url + 'api/delete/deposit', qs.stringify(data))
            .then(response => {
                // console.log(response)
                if (response.data.isValid) {
                    dispatch(deleteDepositSuccess(depositId))
                    notify("Deposit Successfully Deleted")
                } else {
                    notify(response.data.msg)
                    dispatch(deleteDepositFail(response.data.msg))
                }
            })
            .catch(error => {
                notify("Server Error Unable To Create Deposit")
                dispatch(deleteDepositFail("Server Error Unable To Delete User"))
            })

    }
}