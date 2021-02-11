import thunk from 'redux-thunk';
import {useHistory} from "react-router-dom";
import * as DepositActions from '../DepositActions';
import "../../setupTests";
import moxios from "moxios";
import configureMockStore from "redux-mock-store";
import * as depositActionTypes from '../ActionTypes/DepositTypes';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

const initialState = {loading: false, deposits: [], error: false};

const deposits = [{
    "id": "34",
    "deposit_id": "1",
    "amount": "194",
    "date": "08 Feb 2021",
    "first_name": "Awais",
    "last_name": "Munawar Usmani"
}];


describe("Test Deposits Actions Functionality", () => {
    const deposit = {
        "id": "34",
        "deposit_id": "1",
        "amount": "194",
        "date": "08 Feb 2021",
        "first_name": "Awais",
        "last_name": "Munawar Usmani"
    };
    let store;

    beforeEach(() => {
        moxios.install();
        store = mockStore(initialState);
    });
    afterEach(() => {
        moxios.uninstall();
    });

    it('should Load All the Deposits Correctly', () => {

        moxios.wait(function () {

            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response:
                    {
                        isValid: true,
                        deposits: [{
                            "id": "34",
                            "deposit_id": "1",
                            "amount": "194",
                            "date": "08 Feb 2021",
                            "first_name": "Awais",
                            "last_name": "Munawar Usmani"
                        }]
                    }

            });
        });

        const expectedActions = [

            {
                type: depositActionTypes.DEPOSIT_FETCH_REQUEST
            },
            {
                type: depositActionTypes.DEPOSIT_FETCH_SUCCESS,
                deposits
            }
        ];

        return store.dispatch(DepositActions.listDeposits()).then(() => {
            const actualAction = store.getActions();
            expect(actualAction).toEqual(expectedActions);

        })

    });
    it('should Return when not able to get deposits', () => {
        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {isValid: false}
            })
        })

        const expectedActions = [
            {
                type: depositActionTypes.DEPOSIT_FETCH_REQUEST
            },
            {
                type: depositActionTypes.DEPOSIT_FETCH_FAIL
            },
        ];
        return store.dispatch(DepositActions.listDeposits()).then(() => {
            const actualActions = store.getActions();
            expect(actualActions).toEqual(expectedActions)
        })
    });

    it('should Add the Deposit Correctly', () => {
        const history = '';
        const data = {"amount": "194", "date": "08 Feb 2021", "user_id": 34}
        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    isValid: true,
                    deposit
                }
            });

        });
        const expectedActions = [
            {
                type: depositActionTypes.DEPOSIT_ADD_REQUEST
            },
            {
                type: depositActionTypes.DEPOSIT_ADD_SUCCESS,
                deposit
            }
        ];
        return store.dispatch(DepositActions.addDeposit(data, history)).then(() => {
            const actualActions = store.getActions();
            expect(actualActions).toEqual(expectedActions)
        })

    })
    it('should not Able to add Deposit', function () {
        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {isValid: false, msg: "Unable To Add Deposit"}
            });
        })
        const expectedActions = [
            {
                type: depositActionTypes.DEPOSIT_ADD_REQUEST,
            },
            {
                type: depositActionTypes.DEPOSIT_ADD_FAIL, msg: "Unable To Add Deposit"
            }
        ]
        return store.dispatch(DepositActions.addDeposit()).then(() => {
            const actualActions = store.getActions();
            expect(expectedActions).toEqual(actualActions);
        })
    });

    it('should Able to Edit Deposit Correctly', function () {
        let updateData = new Array();
        updateData['date']='11 Feb 2021';

        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    isValid: true,
                    deposit
                }
            });
        });
        const expectedActions = [
            {
                type: depositActionTypes.DEPOSIT_UPDATE_REQUEST
            },
            {
                type: depositActionTypes.DEPOSIT_UPDATE_SUCCESS,
                deposit

            }
        ]
        return store.dispatch(DepositActions.updateDeposit(1,updateData)).then(() => {
            const actualActions = store.getActions();
            expect(expectedActions).toEqual(actualActions)
        })
    });
    it('should not able to Update deposit', function () {
        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    isValid: false,
                    msg: "Update Failed"
                }
            })
        })
        const expectedActions = [
            {
                type: depositActionTypes.DEPOSIT_UPDATE_REQUEST
            },
            {
                type: depositActionTypes.DEPOSIT_UPDATE_FAIL,
                msg: "Update Failed"
            }
        ]
        return store.dispatch(DepositActions.updateDeposit()).then(() => {
            const actualActions = store.getActions();
            expect(expectedActions).toEqual(actualActions);
        })

    });
    it('should able to delete deposit', function () {
        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    isValid: true
                }
            });
        });
        const expectedActions = [
            {
                type: depositActionTypes.DEPOSIT_DELETE_REQUEST
            },
            {
                type: depositActionTypes.DEPOSIT_DELETE_SUCCESS
            }
        ];
        return store.dispatch(DepositActions.deleteDeposit()).then(() => {
            const actualActions = store.getActions();
            expect(expectedActions).toEqual(actualActions);
        })
    });
    it('should not  delete deposit', function () {

        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    isValid: false,
                    msg: "Not Deleted"
                }
            });
        })
        const expectedActions = [
            {
                type: depositActionTypes.DEPOSIT_DELETE_REQUEST
            },
            {
                type: depositActionTypes.DEPOSIT_DELETE_FAIL,
                msg: "Not Deleted"
            }
        ];
        return store.dispatch(DepositActions.deleteDeposit()).then(() => {
            const actualActions = store.getActions();
            expect(expectedActions).toEqual(actualActions);
        })
    });
});

