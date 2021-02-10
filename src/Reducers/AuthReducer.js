
import * as AuthActions from '../Actions/ActionTypes/AuthTypes'
const initialState = {verified: false, user: [], loading: false, msg: ''};
const AuthReducer = (state = initialState, action) => {

    switch (action.type) {

        case AuthActions.USER_AUTH_REQUEST:
            // console.log(action)
            return {
                ...state, verified : false, user : [] , loading: true , msg: ''
            }
        case AuthActions.USER_AUTH_SUCCESS:
            // console.log(action)
            return {
                ...state, verified : true, user : action.user, loading: false , msg: ''
            }
        case AuthActions.USER_AUTH_FAIL:
            return {
                ...state, verified : false, user : [], loading : false, msg : action.msg
            }
        default:

            return state;
    }
}

export default AuthReducer