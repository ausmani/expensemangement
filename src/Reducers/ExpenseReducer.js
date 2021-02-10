import * as ExpenseActions from '../Actions/ActionTypes/ExpenseTypes'

const initialState = {loading:false,expenses:[],error:false};

const ExpenseReducer = (state = initialState , action) => {

    switch (action.type) {

        case ExpenseActions.EXPENSE_FETCH_SUCCESS:
            return {
                ...state , expenses : action.expenses , loading: false , error: false
            }
        case ExpenseActions.EXPENSE_FETCH_FAIL:
            return {
                ...state , expenses : [] , loading: false , error: true
            }
        case ExpenseActions.EXPENSE_FETCH_REQUEST:
            return {
                ...state , expenses : [] , loading: true , error: false
            }

        case ExpenseActions.EXPENSE_DELETE_SUCCESS:
            const expenseList = state.expenses.filter(row=>row.id!==action.expenseId);
            return {
                ...state, expenses: expenseList
            }
        case ExpenseActions.EXPENSE_UPDATE_SUCCESS:
            return state;
        case ExpenseActions.EXPENSE_ADD_SUCCESS:
            return state;
        default:
            return state;
    }
}

export default ExpenseReducer