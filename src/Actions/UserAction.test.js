import thunk from 'redux-thunk';
import {useHistory} from "react-router-dom";
import * as UserActions from './UserActions';
import "../setupTests";
import moxios from "moxios";
import configureMockStore from "redux-mock-store";
import * as userActionTypes from '../Actions/ActionTypes/UserTypes';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

const initialState = {loading: false, users: [], error: false};

const users = [{"id": 1, "first_name": "Awais", "last_name": "Usmani", "email": 'amusmani@gmail.com'}];


jest.setTimeout(15000)

describe("Test Users Actions Functionality", () => {
    const user = {"id": 1, "first_name": "Awais", "last_name": "Usmani", "email": 'amusmani@gmail.com'};
    const updateData = {user_id:1};
    let store;

    beforeEach(() => {
        moxios.install();
        store = mockStore(initialState);
    });
    afterEach(() => {
        moxios.uninstall();
    });

    it('should Load All the Users Correctly', () => {

        moxios.wait(function () {

            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response:
                    {
                        isValid: true,
                        users: [{id: 1, first_name: "Awais", "last_name": "Usmani", "email": 'amusmani@gmail.com'}]
                    }

            });
        });

        const expectedActions = [

            {
                type: userActionTypes.USER_FETCH_REQUEST
            },
            {
                type: userActionTypes.USER_FETCH_SUCCESS,
                users
            }
        ];

        return store.dispatch(UserActions.listUsers()).then(() => {
            const actualAction = store.getActions();
            expect(actualAction).toEqual(expectedActions);

        })

    });
    it('should Return when not able to get users', () => {
        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {isValid: false}
            })
        })

        const expectedActions = [
            {
                type: userActionTypes.USER_FETCH_REQUEST
            },
            {
                type: userActionTypes.USER_FETCH_FAIL
            },
        ];
        return store.dispatch(UserActions.listUsers()).then(() => {
            const actualActions = store.getActions();
            expect(actualActions).toEqual(expectedActions)
        })
    });
    it('should Add the User Correctly', () => {
        const history = '';
        const data = {first_name: "Awais", "last_name": "Usmani", email: "amusmani@gmail.com"}
        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    isValid: true,
                    user
                }
            });

        });
        const expectedActions = [
            {
                type: userActionTypes.USER_ADD_REQUEST
            },
            {
                type: userActionTypes.USER_ADD_SUCCESS,
                user
            }
        ];
        return store.dispatch(UserActions.addUser(data, history)).then(() => {
            const actualActions = store.getActions();
            expect(actualActions).toEqual(expectedActions)
        })

    })
    it('should not Able to add User', function () {
        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {isValid: false,msg:"Unable To Add User"}
            });
        })
        const expectedActions = [
            {
                type: userActionTypes.USER_ADD_REQUEST,
            },
            {
                type: userActionTypes.USER_ADD_FAIL,msg:"Unable To Add User"
            }
        ]
        return store.dispatch(UserActions.addUser()).then(() => {
            const actualActions = store.getActions();
            expect(expectedActions).toEqual(actualActions);
        })
    });
    it('should Able to Edit User Correctly', function () {

        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    isValid: true,
                    user
                }
            });
        });
        const expectedActions = [
            {
                type: userActionTypes.USER_UPDATE_REQUEST
            },
            {
                type: userActionTypes.USER_UPDATE_SUCCESS,
                user

            }
        ]
        return store.dispatch(UserActions.updateUser()).then(() => {
            const actualActions = store.getActions();
            expect(expectedActions).toEqual(actualActions)
        })
    });
    it('should not able to Update user', function () {
        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    isValid: false,
                    msg:"Update Failed"
                }
            })
        })
        const expectedActions = [
            {
                type: userActionTypes.USER_UPDATE_REQUEST
            },
            {
                type:userActionTypes.USER_UPDATE_FAIL,
                msg:"Update Failed"
            }
        ]
        return store.dispatch(UserActions.updateUser()).then(()=>{
            const actualActions = store.getActions();
            expect(expectedActions).toEqual(actualActions);
        })

    });
    it('should able to delete user', function () {
        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status:200,
                response:{
                    isValid:true
                }
            });
        });
        const expectedActions = [
            {type:userActionTypes.USER_DELETE_REQUEST},
            {type:userActionTypes.USER_DELETE_SUCCESS}
        ];
        return store.dispatch(UserActions.deleteUser()).then(()=>{
            const actualActions = store.getActions();
            expect(expectedActions).toEqual(actualActions);
        })
    });
    it('should not  delete user', function () {

        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status:200,
                response:{
                    isValid:false,
                    msg:"Deleted"
                }
            });
        })
        const expectedActions = [
            {
                type:userActionTypes.USER_DELETE_REQUEST
            },
            {
                type:userActionTypes.USER_DELETE_FAIL,
                msg:"Deleted"
            }
        ];
        return store.dispatch(UserActions.deleteUser()).then(()=>{
            const actualActions = store.getActions();
            expect(expectedActions).toEqual(actualActions);
        })
    });
});

