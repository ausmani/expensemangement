import * as depositTypes from '../../Actions/ActionTypes/DepositTypes'
import DepositReducer from "../DepositReducer";

describe('Auth Reducer' , () => {

    it('should return the default state', function () {

        const newState = DepositReducer(undefined,{})
        expect(newState).toEqual({loading:false,deposits:[],error:false})
    });
    it('should Test if state is set to Loading', function () {

        const newState = DepositReducer(undefined,{
            type: depositTypes.DEPOSIT_FETCH_REQUEST
        })
        expect(newState).toEqual({loading:true,deposits:[],error:false})
    });

    it('should Test if new state is recieved', function () {

        const deposits = [{"id":"34","user_id":"1","amount":"194","date":"08 Feb 2021","first_name":"Awais","last_name":"Munawar Usmani"},{"id":"32","user_id":"4","amount":"200","date":"08 Feb 2021","first_name":"Muhammad Wali","last_name":"Usmani"}];
        const newState = DepositReducer(undefined,{
            type: depositTypes.DEPOSIT_FETCH_SUCCESS,
            deposits
        })
        expect(newState).toEqual({loading:false,deposits,error:false})
    });
    it('should Delete Deposit', function () {
        const deposits = [{"id":"34","user_id":"1","amount":"194","date":"08 Feb 2021","first_name":"Awais","last_name":"Munawar Usmani"},{"id":"32","user_id":"4","amount":"200","date":"08 Feb 2021","first_name":"Muhammad Wali","last_name":"Usmani"}];

        const state = {loading:false,deposits:deposits,error:false}
        const newState = DepositReducer(state,{
            type:depositTypes.DEPOSIT_DELETE_SUCCESS,
            depositId: 32
        })
        expect(newState).toEqual({loading:false,deposits:[{"id":"34","user_id":"1","amount":"194","date":"08 Feb 2021","first_name":"Awais","last_name":"Munawar Usmani"}],error:false})
    });

})