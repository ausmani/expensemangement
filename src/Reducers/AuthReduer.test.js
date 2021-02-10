import * as AuthActions from '../Actions/ActionTypes/AuthTypes'
import AuthReducer from "./AuthReducer";

describe('Auth Reducer' , () => {

    it('should return the default state', function () {

        const newState = AuthReducer(undefined,{})
        expect(newState).toEqual({verified: false, user: [], loading: false, msg: ''})
    });
    it('should Return new state if recieving type', function () {

        const user = {"id":1,"first_name":"awais","last_name":"usmani","email":'amusmani@gmail.com'}

        const newState = AuthReducer(undefined,{
            type: AuthActions.USER_AUTH_SUCCESS,
            user
        });
        expect(newState).toEqual({verified: true, user: {"id":1,"first_name":"awais","last_name":"usmani","email":'amusmani@gmail.com'}, loading: false, msg: ''})
    });
})