import * as UserActions from '../../Actions/ActionTypes/UserTypes'
import UserReducer from "../UserReducer";

describe('Auth Reducer' , () => {

    it('should return the default state', function () {

        const newState = UserReducer(undefined,{})
        expect(newState).toEqual({loading:false,users:[],error:false})
    });
    it('should Test if state is set to Loading', function () {

        const newState = UserReducer(undefined,{
            type: UserActions.USER_FETCH_REQUEST
        })
        expect(newState).toEqual({loading:true,users:[],error:false})
    });

    it('should Test if new state is recieved', function () {

        const users = [{"id":1,"first_name":"awais","last_name":"usmani","email":'amusmani@gmail.com'},{"id":2,"first_name":"Umer","last_name":"Usmani","email":'umer@gmail.com'}];
        const newState = UserReducer(undefined,{
            type: UserActions.USER_FETCH_SUCCESS,
            users
        })
        expect(newState).toEqual({loading:false,users,error:false})
    });
    it('should Delete User', function () {
        const users = [{"id":1,"first_name":"awais","last_name":"usmani","email":'amusmani@gmail.com'},{"id":2,"first_name":"Umer","last_name":"Usmani","email":'umer@gmail.com'}];
        const state = {loading:false,users:users,error:false}
        const newState = UserReducer(state,{
            type:'DELETE_USER',
            userId: 2
        })
        expect(newState).toEqual({loading:false,users:[{"id":1,"first_name":"awais","last_name":"usmani","email":'amusmani@gmail.com'}],error:false})
    });

})