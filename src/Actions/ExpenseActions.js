import * as ExpenseActions from './ActionTypes/ExpenseTypes'
import axios from "axios";
import {toast} from "react-toastify";

const qs = require('qs');
const notify = (text) => toast(text);
export const url = process.env.REACT_APP_SERVER_URL;
export const fetchExpense = () => {
    return {
        type: ExpenseActions.EXPENSE_FETCH_REQUEST
    }
}
export const fetchExpenseSuccess = (expenses) => {

    return {
        type: ExpenseActions.EXPENSE_FETCH_SUCCESS,
        expenses
    }
}
export const fetchExpenseFail = () => {
    return {
        type: ExpenseActions.EXPENSE_FETCH_FAIL,

    }
}

export const addExpenseRequest = () => {
    return {
        type: ExpenseActions.EXPENSE_ADD_REQUEST
    }
}

export const addExpenseSuccess = (expense) => {
    return {
        type: ExpenseActions.EXPENSE_ADD_SUCCESS,
        expense
    }
}
export const addExpenseFail = (msg) => {
    return {
        type: ExpenseActions.EXPENSE_ADD_FAIL,
        msg
    }
}

export const updateExpenseRequest = () => {
    return {
        type: ExpenseActions.EXPENSE_UPDATE_REQUEST
    }
}

export const updateExpenseSuccess = (expense) => {
    return {
        type: ExpenseActions.EXPENSE_UPDATE_SUCCESS,
        expense
    }
}
export const updateExpenseFail = (msg) => {
    return {
        type: ExpenseActions.EXPENSE_UPDATE_FAIL,
        msg
    }
}

export const deleteExpenseRequest = () => {
    return {
        type: ExpenseActions.EXPENSE_DELETE_REQUEST
    }
}

export const deleteExpenseSuccess = (expenseId) => {
    return {
        type: ExpenseActions.EXPENSE_DELETE_SUCCESS,
        expenseId
    }
}
export const deleteExpenseFail = (msg) => {
    return {
        type: ExpenseActions.EXPENSE_DELETE_FAIL,
        msg
    }
}


export const listExpenses = () => {

    return (disptach) => {
        disptach(fetchExpense())
        axios.post(url + 'api/get/expenses')
            .then(response => {
                // console.log(response)
                if (response.data.isValid) {
                    disptach(fetchExpenseSuccess(response.data.expenses))

                } else
                    disptach(fetchExpenseFail())

            })
            .catch(error => {
                disptach(fetchExpenseFail())
            })
    }

}
export const addExpense = (data, history) => {

    return (dispatch) => {
        // console.log("here")
        data['date'] = data['date'].toDateString()

        dispatch(addExpenseRequest())
        axios.post(url + 'api/add/expense', qs.stringify(data))
            .then(response => {
                if (response.data.isValid) {
                    dispatch(addExpenseSuccess(response.data.expense))
                    notify("Expense Successfully Created")
                    setTimeout(()=>{
                        history.push("/expense")
                    },2000)
                } else {
                    notify(response.data.msg)
                    dispatch(addExpenseFail(response.data.msg))
                }
            })
            .catch(error => {
                notify("Server Error Unable To Create Expense")
                dispatch(addExpenseFail())
            })

    }
}
export const updateExpense = (expenseId , data, history) => {

    return (dispatch) => {
        dispatch(updateExpenseRequest())
        data['expense_id']=expenseId;
        data['date'] = data['date'].toDateString();
        // console.log(data)
        axios.post(url + 'api/update/expense', qs.stringify(data))
            .then(response => {
                if (response.data.isValid) {
                    dispatch(updateExpenseSuccess(response.data.expense))
                    notify("Expense Successfully Updated")
                    setTimeout(()=>{
                        history.push("/expense")
                    },2000)
                } else {
                    notify(response.data.msg)
                    dispatch(updateExpenseFail(response.data.msg))
                }
            })
            .catch(error => {
                notify("Server Error Unable To Create Expense")
                dispatch(updateExpenseFail("Server Error Unable To Create Expense"))
            })

    }
}
export const deleteExpense = (expenseId) => {
    // console.log("Expense id"+expenseId)
    return (dispatch) => {
        dispatch(deleteExpenseRequest())
        const data ={expense_id:expenseId}
        axios.post(url + 'api/delete/expense', qs.stringify(data))
            .then(response => {
                // console.log(response)
                if (response.data.isValid) {
                    dispatch(deleteExpenseSuccess(expenseId))
                    notify("Expense Successfully Deleted")
                } else {
                    notify(response.data.msg)
                    dispatch(deleteExpenseFail(response.data.msg))
                }
            })
            .catch(error => {
                notify("Server Error Unable To Create Expense")
                dispatch(deleteExpenseFail("Server Error Unable To Delete User"))
            })

    }
}