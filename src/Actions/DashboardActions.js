import * as dType from './ActionTypes/DashboardType';
import axios from "axios";

const url = process.env.REACT_APP_SERVER_URL;
export const fetchUserCount = () =>{
    return {
        type: dType.FETCH_USER_COUNT
    }
}
export const setUserCount = (count) =>{
    return {
        type: dType.SET_USER_COUNT,
        count
    }
}
export const setUserFail = () =>{
    return {
        type: dType.SET_USER_FAIL
    }
}

export const fetchDepositCount = () =>{
    return {
        type: dType.FETCH_DEPOSIT_COUNT
    }
}
export const setDepositCount = (count) =>{
    return {
        type: dType.SET_DEPOSIT_COUNT,
        count
    }
}
export const setDepositFail = () =>{
    return {
        type: dType.SET_DEPOSIT_FAIL
    }
}

export const fetchExpenseCount = () =>{
    return {
        type: dType.FETCH_EXPENSE_COUNT
    }
}
export const setExpenseCount = (count) =>{
    return {
        type: dType.SET_EXPENSE_COUNT,
        count
    }
}
export const setExpenseFail = () =>{
    return {
        type: dType.SET_EXPENSE_FAIL
    }
}

export const fetchExpensesCount = () =>{
    return {
        type: dType.FETCH_EXPENSES
    }
}
export const setExpensesCount = (count) =>{
    return {
        type: dType.SET_EXPENSES_COUNT,
        count
    }
}
export const setExpensesFail = () =>{
    return {
        type: dType.SET_EXPENSES_FAIL
    }
}

export const fetchExpenseDepositCount = () =>{
    return {
        type: dType.FETCH_EXPENSES_DEPOSITS
    }
}
export const setExpenseDepositCount = (count) =>{
    return {
        type: dType.SET_EXPENSES_DEPSOITS_COUNT,
        count
    }
}
export const setExpenseDepositFail = () =>{
    return {
        type: dType.SET_EXPENSES_DEPSOITS_FAIL
    }
}
export const getUserCount = () => {
    return (disptach)=>{
        disptach(fetchUserCount())
        return axios.post(url+'api/count/user')
            .then(response=>{
                // console.log(response)
                if(response.data.isValid){
                    disptach(setUserCount(response.data.count))
                }
                else{
                    disptach(setUserFail())
                }
            })
            .catch(error=>{disptach(setUserFail())})
    }
}
export const getDepositCount = () => {
    return (disptach)=>{
        disptach(fetchDepositCount())
        return axios.post(url+'api/count/deposit')
            .then(response=>{
                // console.log(response)
                if(response.data.isValid){
                    disptach(setDepositCount(response.data.count))
                }
                else{
                    disptach(setDepositFail())
                }
            })
            .catch(error=>{disptach(setDepositFail())})
    }
}
export const getExpenseCount = () => {
    return (disptach)=>{
        disptach(fetchExpenseCount())
        return axios.post(url+'api/count/expense')
            .then(response=>{
                // console.log(response)
                if(response.data.isValid){
                    disptach(setExpenseCount(response.data.count))
                }
                else{
                    disptach(setExpenseFail())
                }
            })
            .catch(error=>{setExpenseFail()})
    }
}
export const getExpensesCount = () => {
    return (disptach)=>{
        disptach(fetchExpensesCount())
        return axios.post(url+'api/data/expense/sum')
            .then(response=>{
                // console.log(response)
                if(response.data.isValid){
                    disptach(setExpensesCount(response.data.expenses))
                }
                else{
                    disptach(setExpensesFail())
                }
            })
            .catch(error=>{setExpensesFail()})
    }
}

export const getExpenseDepositCount = () => {
    return (disptach)=>{
        disptach(fetchExpenseDepositCount())
        return axios.post(url+'api/expense/deposit')
            .then(response=>{
                // console.log(response)
                if(response.data.isValid){
                    disptach(setExpenseDepositCount(response.data.exp_dep))
                }
                else{
                    disptach(setExpenseDepositFail())
                }
            })
            .catch(error=>{setExpenseDepositFail()})
    }
}
