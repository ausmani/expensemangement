import * as expenseTypes from '../../Actions/ActionTypes/ExpenseTypes'
import ExpenseReducer from "../ExpenseReducer";

describe('Auth Reducer' , () => {

    it('should return the default state', function () {

        const newState = ExpenseReducer(undefined,{})
        expect(newState).toEqual({loading:false,expenses:[],error:false})
    });
    it('should Test if state is set to Loading', function () {

        const newState = ExpenseReducer(undefined,{
            type: expenseTypes.EXPENSE_FETCH_REQUEST
        })
        expect(newState).toEqual({loading:true,expenses:[],error:false})
    });

    it('should Test if new state is recieved', function () {

        const expenses = [{"id":"17","expense":"Lunch Mc","amount":"299","date":"08 Feb 2021","participants":"Awais Munawar Usmani,Umer Usmani,Waleed usmani,Muhammad Wali Usmani,Taimoor Nadeem,HNwLT CSpjY,EFOPl uwhIP,DGOyC Zdcqo,mLvix moKEg","participants_id":"1,2,3,4,5,19,20,21,22"},{"id":"16","expense":"Daal + Dahi","amount":"160","date":"02 Feb 2021","participants":"Awais Munawar Usmani,Umer Usmani,Waleed usmani,Muhammad Wali Usmani,Taimoor Nadeem","participants_id":"1,2,3,4,5"},{"id":"13","expense":"Lunch","amount":"250","date":"02 Feb 2021","participants":"Awais Munawar Usmani,Umer Usmani,Waleed usmani,Muhammad Wali Usmani,Taimoor Nadeem","participants_id":"1,2,3,4,5"}];
        const newState = ExpenseReducer(undefined,{
            type: expenseTypes.EXPENSE_FETCH_SUCCESS,
            expenses
        })
        expect(newState).toEqual({loading:false,expenses,error:false})
    });
    it('should Delete Deposit', function () {
        const expenses = [{"id":"17","expense":"Lunch Mc","amount":"299","date":"08 Feb 2021","participants":"Awais Munawar Usmani,Umer Usmani,Waleed usmani,Muhammad Wali Usmani,Taimoor Nadeem,HNwLT CSpjY,EFOPl uwhIP,DGOyC Zdcqo,mLvix moKEg","participants_id":"1,2,3,4,5,19,20,21,22"},{"id":"16","expense":"Daal + Dahi","amount":"160","date":"02 Feb 2021","participants":"Awais Munawar Usmani,Umer Usmani,Waleed usmani,Muhammad Wali Usmani,Taimoor Nadeem","participants_id":"1,2,3,4,5"},{"id":"13","expense":"Lunch","amount":"250","date":"02 Feb 2021","participants":"Awais Munawar Usmani,Umer Usmani,Waleed usmani,Muhammad Wali Usmani,Taimoor Nadeem","participants_id":"1,2,3,4,5"}];

        const state = {loading:false,expenses:expenses,error:false}
        const newState = ExpenseReducer(state,{
            type:expenseTypes.EXPENSE_DELETE_SUCCESS,
            expenseId: '16'
        });
        expect(newState).toEqual({loading:false,expenses:[{"id":"17","expense":"Lunch Mc","amount":"299","date":"08 Feb 2021","participants":"Awais Munawar Usmani,Umer Usmani,Waleed usmani,Muhammad Wali Usmani,Taimoor Nadeem,HNwLT CSpjY,EFOPl uwhIP,DGOyC Zdcqo,mLvix moKEg","participants_id":"1,2,3,4,5,19,20,21,22"},{"id":"13","expense":"Lunch","amount":"250","date":"02 Feb 2021","participants":"Awais Munawar Usmani,Umer Usmani,Waleed usmani,Muhammad Wali Usmani,Taimoor Nadeem","participants_id":"1,2,3,4,5"}],error:false})
    });

})