import * as DepositActions from '../Actions/ActionTypes/DepositTypes'

const initialState = {loading:false,deposits:[],error:false};


const DepositReducer = (state = initialState , action) => {

    switch (action.type) {

        case DepositActions.DEPOSIT_FETCH_SUCCESS:
            return {
                ...state , deposits : action.deposits , loading: false , error: false
            }
        case DepositActions.DEPOSIT_FETCH_FAIL:
            return {
                ...state , deposits : [] , loading: false , error: true
            }
        case DepositActions.DEPOSIT_FETCH_REQUEST:
            return {
                ...state , deposits : [] , loading: true , error: false
            }

        case DepositActions.DEPOSIT_DELETE_SUCCESS:
            const depositList = state.deposits.filter(row=>row.id!=action.depositId);
            // console.log(depositList)
            return {
                ...state, deposits: depositList
            }
        case DepositActions.DEPOSIT_UPDATE_SUCCESS:
            return state;
        case DepositActions.DEPOSIT_ADD_SUCCESS:
            return state;
        default:
            return state;
    }
}

export default DepositReducer