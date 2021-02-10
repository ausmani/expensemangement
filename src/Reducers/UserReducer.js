import * as UserActions from '../Actions/ActionTypes/UserTypes'

const initialState = {loading:false,users:[],error:false};


const UserReducer = (state = initialState , action) => {

    switch (action.type) {

        case UserActions.USER_FETCH_SUCCESS:
            return {
                ...state , users : action.users , loading: false , error: false
            }
        case UserActions.USER_FETCH_FAIL:
            return {
                ...state , users : [] , loading: false , error: true
            }
        case UserActions.USER_FETCH_REQUEST:
            return {
                ...state , users : [] , loading: true , error: false
            }

        case 'DELETE_USER':
            const userList = state.users.filter(row=>row.id!=action.userId);
            return {
                ...state, users: userList
            }
        case 'UPDATE_USER':
            return state;
        case 'ADD_USER':
            // console.log("in succes")
            // return {
            //     ...state, users: [...state.users,action.user]
            // }

            return state;
        default:
            return state;
    }
}

export default UserReducer