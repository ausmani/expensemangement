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

describe("Test Get Users Actions", () => {

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
                        isValid : true ,
                        users:[{id: 1, first_name: "Awais", "last_name": "Usmani", "email": 'amusmani@gmail.com'}]
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

        return store.dispatch(UserActions.listUsers()).then(()=>{
            const actualAction = store.getActions();
            expect(actualAction).toEqual(expectedActions);

        })

    });
    it('should Return when not able to get users',  () => {
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
        return store.dispatch(UserActions.listUsers()).then(()=>{
            const actualActions = store.getActions();
            expect(actualActions).toEqual(expectedActions)
        })
    });
    it('should Addd the User Correctly', ()=> {
        const history = '';
        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            const user = {"id": 1, "first_name": "Awais", "last_name": "Usmani", "email": 'amusmani@gmail.com'}
            const data ={first_name: "Awais","last_name":"Usmani",email:"amusmani@gmail.com"}
            request.respondWith({
                status: 200,
                response: {
                    isValid: true,
                    user
                }
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
            return  store.dispatch(UserActions.addUser(data,history)).then(()=>{
                const actualActions = store.getActions();
                expect(actualActions).toEqual(expectedActions)
            })
        })

    })
});
