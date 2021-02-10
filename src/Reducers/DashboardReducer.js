import * as dTypes from '../Actions/ActionTypes/DashboardType'

const initalState = {
    loadingUser:false,
    loadingUserError:false,
    loadingDeposit:false,
    loadingDepositError:false,
    loadingExpense:false,
    loadingExpenseError:false,
    loadingExpenses:false,
    loadingExpensesError:false,
    loadingExpenseDeposit:false,
    loadingExpenseDepositError:false,
    userCount:0,
    expenseCount:0,
    depositCount:0,
    expenses:[],
    expenseDeposit:[],

}

const DashboardReducer = (state = initalState,action) => {

    switch (action.type) {

        case dTypes.FETCH_USER_COUNT:
            return {...state , loadingUser:true ,userCount: 0 ,loadingUserError:false }
        case dTypes.SET_USER_COUNT:
            return {...state , loadingUser:false ,userCount: action.count,loadingUserError:false}
        case dTypes.SET_USER_FAIL:
            return {...state , loadingUser:false ,userCount: 0,loadingUserError:true}

        case dTypes.FETCH_DEPOSIT_COUNT:
            return {...state , loadingDeposit:true ,depositCount: 0 ,loadingDepositError:false }
        case dTypes.SET_DEPOSIT_COUNT:
            return {...state , loadingDeposit:false ,depositCount: action.count,loadingDepositError:false}
        case dTypes.SET_DEPOSIT_FAIL:
            return {...state , loadingDeposit:false ,depositCount: 0,loadingDepositError:true}

        case dTypes.FETCH_EXPENSE_COUNT:
            return {...state , loadingExpense:true ,expenseCount: 0 ,loadingExpenseError:false }
        case dTypes.SET_EXPENSE_COUNT:
            return {...state , loadingExpense:false ,expenseCount: action.count,loadingExpenseError:false}
        case dTypes.SET_EXPENSE_FAIL:
            return {...state , loadingExpense:false ,expenseCount: 0,loadingExpenseError:true}

        case dTypes.FETCH_EXPENSES:
            return {...state , loadingUser:true ,expenses: [] ,loadingExpensesError:false }
        case dTypes.SET_EXPENSES_COUNT:
            return {...state , loadingUser:false ,expenses: action.count,loadingExpensesError:false}
        case dTypes.SET_EXPENSES_FAIL:
            return {...state , loadingUser:false ,expenses: [],loadingExpensesError:true}

        case dTypes.FETCH_EXPENSES_DEPOSITS:
            return {...state , loadingUser:true ,expenseDeposit: [] ,loadingExpenseDepositError:false }
        case dTypes.SET_EXPENSES_DEPSOITS_COUNT:
            return {...state , loadingUser:false ,expenseDeposit: action.count,loadingExpenseDepositError:false}
        case dTypes.SET_EXPENSES_DEPSOITS_FAIL:
            return {...state , loadingUser:false ,expenseDeposit: [],loadingExpenseDepositError:true}


        default:
            return state;
    }
}

export default DashboardReducer;