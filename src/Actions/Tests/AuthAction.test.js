import * as AuthActions from '../AuthActions';
import * as AuthActionTypes from "../ActionTypes/AuthTypes";
import moxios from 'moxios';
import thunk from 'redux-thunk';
import "../../setupTests";
import configureMockStore from "redux-mock-store";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

const initialState = {verified: false, user: [], loading: false, msg: ''};
const user = {
    "id": "1",
    "first_name": "Awais",
    "last_name": "Usmani",
    "email": "awais.usmani@haud.com",
    "status": "1"
}
describe('Test Auth Actions', function () {

    let store;

    beforeEach(() => {
        moxios.install();
        store = mockStore(initialState)
    });
    afterEach(() => {
        moxios.install();
    })
    it('should Test User is Authenticated', function () {

        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    "isValid": true,
                    user
                }
            })
        });
        const expectedActions = [
            {
                type: AuthActionTypes.USER_AUTH_REQUEST
            },
            {
                type: AuthActionTypes.USER_AUTH_SUCCESS,
                user
            }
        ]
        return store.dispatch(AuthActions.authenticateUSer())
            .then(() => {
                const actualActions = store.getActions();
                expect(expectedActions).toEqual(actualActions)
            })
    });
})
