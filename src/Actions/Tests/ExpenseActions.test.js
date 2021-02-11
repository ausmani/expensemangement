import thunk from 'redux-thunk';
import {useHistory} from "react-router-dom";
import * as ExpenseActions from '../ExpenseActions';
import "../../setupTests";
import moxios from "moxios";
import configureMockStore from "redux-mock-store";
import * as expenseActionTypes from '../ActionTypes/ExpenseTypes';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

const initialState = {loading: false, expenses: [], error: false};

const expenses = [{"id":"17","expense":"Lunch Mc","amount":"299","date":"08 Feb 2021","participants":"Awais Munawar Usmani,Umer Usmani,Waleed usmani,Muhammad Wali Usmani,Taimoor Nadeem,HNwLT CSpjY,EFOPl uwhIP,DGOyC Zdcqo,mLvix moKEg","participants_id":"1,2,3,4,5,19,20,21,22"},{"id":"16","expense":"Daal + Dahi","amount":"160","date":"02 Feb 2021","participants":"Awais Munawar Usmani,Umer Usmani,Waleed usmani,Muhammad Wali Usmani,Taimoor Nadeem","participants_id":"1,2,3,4,5"},{"id":"13","expense":"Lunch","amount":"250","date":"02 Feb 2021","participants":"Awais Munawar Usmani,Umer Usmani,Waleed usmani,Muhammad Wali Usmani,Taimoor Nadeem","participants_id":"1,2,3,4,5"}];


describe("Test Expenses Actions Functionality", () => {
    const expense = {"expense":"Lunch Mc","amount":"299","date":"08 Feb 2021","participants":"1,2,3,4,5"};
    let store;

    beforeEach(() => {
        moxios.install();
        store = mockStore(initialState);
    });
    afterEach(() => {
        moxios.uninstall();
    });

    it('should Load All the Expenses Correctly', () => {

        moxios.wait(function () {

            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response:
                    {
                        isValid: true,
                        expenses
                    }

            });
        });

        const expectedActions = [

            {
                type: expenseActionTypes.EXPENSE_FETCH_REQUEST
            },
            {
                type: expenseActionTypes.EXPENSE_FETCH_SUCCESS,
                expenses
            }
        ];

        return store.dispatch(ExpenseActions.listExpenses()).then(() => {
            const actualAction = store.getActions();
            expect(actualAction).toEqual(expectedActions);

        })

    });
    it('should Return when not able to get expenses', () => {
        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {isValid: false}
            })
        })

        const expectedActions = [
            {
                type: expenseActionTypes.EXPENSE_FETCH_REQUEST
            },
            {
                type: expenseActionTypes.EXPENSE_FETCH_FAIL
            },
        ];
        return store.dispatch(ExpenseActions.listExpenses()).then(() => {
            const actualActions = store.getActions();
            expect(actualActions).toEqual(expectedActions)
        })
    });

    it('should Add the Expense Correctly', () => {
        const history = '';
        const data = {"amount": "194", "date": "08 Feb 2021", "user_id": 34}
        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    isValid: true,
                    expenses
                }
            });

        });
        const expectedActions = [
            {
                type: expenseActionTypes.EXPENSE_ADD_REQUEST
            },
            {
                type: expenseActionTypes.EXPENSE_ADD_SUCCESS
            }
        ];
        return store.dispatch(ExpenseActions.addExpense(data, history)).then(() => {
            const actualActions = store.getActions();
            expect(actualActions).toEqual(expectedActions)
        })

    })
    it('should not Able to add Expense', function () {
        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {isValid: false, msg: "Unable To Add Expense"}
            });
        })
        const expectedActions = [
            {
                type: expenseActionTypes.EXPENSE_ADD_REQUEST,
            },
            {
                type: expenseActionTypes.EXPENSE_ADD_FAIL, msg: "Unable To Add Expense"
            }
        ]
        return store.dispatch(ExpenseActions.addExpense()).then(() => {
            const actualActions = store.getActions();
            expect(expectedActions).toEqual(actualActions);
        })
    });

    it('should Able to Edit Expense Correctly', function () {
        let updateData = new Array();
        updateData['date']='11 Feb 2021';

        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    isValid: true,
                    expense
                }
            });
        });
        const expectedActions = [
            {
                type: expenseActionTypes.EXPENSE_UPDATE_REQUEST
            },
            {
                type: expenseActionTypes.EXPENSE_UPDATE_SUCCESS,
                expense

            }
        ]
        return store.dispatch(ExpenseActions.updateExpense(1,updateData)).then(() => {
            const actualActions = store.getActions();
            expect(expectedActions).toEqual(actualActions)
        })
    });
    it('should not able to Update expense', function () {
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
                type: expenseActionTypes.EXPENSE_UPDATE_REQUEST
            },
            {
                type: expenseActionTypes.EXPENSE_UPDATE_FAIL,
                msg: "Update Failed"
            }
        ]
        return store.dispatch(ExpenseActions.updateExpense()).then(() => {
            const actualActions = store.getActions();
            expect(expectedActions).toEqual(actualActions);
        })

    });
    it('should able to delete expense', function () {
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
                type: expenseActionTypes.EXPENSE_DELETE_REQUEST
            },
            {
                type: expenseActionTypes.EXPENSE_DELETE_SUCCESS
            }
        ];
        return store.dispatch(ExpenseActions.deleteExpense()).then(() => {
            const actualActions = store.getActions();
            expect(expectedActions).toEqual(actualActions);
        })
    });
    it('should not  delete expense', function () {

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
                type: expenseActionTypes.EXPENSE_DELETE_REQUEST
            },
            {
                type: expenseActionTypes.EXPENSE_DELETE_FAIL,
                msg: "Not Deleted"
            }
        ];
        return store.dispatch(ExpenseActions.deleteExpense()).then(() => {
            const actualActions = store.getActions();
            expect(expectedActions).toEqual(actualActions);
        })
    });
});

