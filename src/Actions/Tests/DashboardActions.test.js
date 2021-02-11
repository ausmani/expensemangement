import * as DashboardActions from "../DashboardActions";
import * as DashboardActionTypes from "../ActionTypes/DashboardType";
import thunk from "redux-thunk"
import configureMockStore from 'redux-mock-store'
import moxios from 'moxios';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const initialState = {
    loadingUser: false,
    loadingUserError: false,
    loadingDeposit: false,
    loadingDepositError: false,
    loadingExpense: false,
    loadingExpenseError: false,
    loadingExpenses: false,
    loadingExpensesError: false,
    loadingExpenseDeposit: false,
    loadingExpenseDepositError: false,
    userCount: 0,
    expenseCount: 0,
    depositCount: 0,
    expenses: [],
    expenseDeposit: [],

}
const expenses = {
    "2021-02-05": 0,
    "2021-02-06": 0,
    "2021-02-07": 0,
    "2021-02-08": 0,
    "2021-02-09": 0,
    "2021-02-10": 0,
    "2021-02-11": 0
}
const exp_dep = [
    {
        "first_name": "Taimoor", "last_name": "Nadeem", "expense": "0", "deposit": "360"
    }, {
        "first_name": "Ubaid", "last_name": "Ullah", "expense": "0", "deposit": "564"
    }
]
describe("Test Dashboard Actions", function () {
    let store;
    beforeEach(() => {
        moxios.install();
        store = mockStore(initialState)
    })
    afterEach(() => {
        moxios.uninstall();
    })
    const count = 10;
    it('should Test That Count is Returned For User', function () {
        moxios.wait(function () {
            let request = moxios.requests.mostRecent();

            request.respondWith({
                status: 200,
                response: {
                    "isValid": true,
                    count
                }
            })

        })
        const expectedActions = [
            {
                type: DashboardActionTypes.FETCH_USER_COUNT
            },
            {
                type: DashboardActionTypes.SET_USER_COUNT,
                count
            }
        ]
        return store.dispatch(DashboardActions.getUserCount()).then(() => {
            const actualActions = store.getActions()
            expect(expectedActions).toEqual(actualActions)
        })
    });
    it('should fail Getting User Count', function () {

        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    "isValid": false
                }
            })
        });
        const expectedActions = [
            {
                type: DashboardActionTypes.FETCH_USER_COUNT
            },
            {
                type: DashboardActionTypes.SET_USER_FAIL
            }
        ]
        return store.dispatch(DashboardActions.getUserCount())
            .then(() => {
                const actualActions = store.getActions();
                expect(expectedActions).toEqual(actualActions)
            })
    });
    it('should Test That Count is Returned For Expense', function () {
        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    "isValid": true,
                    count
                }
            })

        })
        const expectedActions = [
            {
                type: DashboardActionTypes.FETCH_EXPENSE_COUNT
            },
            {
                type: DashboardActionTypes.SET_EXPENSE_COUNT,
                count
            }
        ]
        return store.dispatch(DashboardActions.getExpenseCount()).then(() => {
            const actualActions = store.getActions()
            expect(expectedActions).toEqual(actualActions)
        })
    });
    it('should fail Getting Expense Count', function () {
        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    "isValid": false
                }
            })
        });
        const expectedActions = [
            {
                type: DashboardActionTypes.FETCH_EXPENSE_COUNT
            },
            {
                type: DashboardActionTypes.SET_EXPENSE_FAIL
            }
        ]
        return store.dispatch(DashboardActions.getExpenseCount())
            .then(() => {
                const actualActions = store.getActions();
                expect(expectedActions).toEqual(actualActions)
            })
    });
    it('should Test That Count is Returned For Deposit', function () {
        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    "isValid": true,
                    count
                }
            })

        });
        const expectedActions = [
            {
                type: DashboardActionTypes.FETCH_DEPOSIT_COUNT
            },
            {
                type: DashboardActionTypes.SET_DEPOSIT_COUNT,
                count
            }
        ]
        return store.dispatch(DashboardActions.getDepositCount()).then(() => {
            const actualActions = store.getActions()
            expect(expectedActions).toEqual(actualActions)
        })
    });
    it('should Failed Test That Count is Returned For Deposit', function () {
        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    "isValid": false
                }
            })

        });
        const expectedActions = [
            {
                type: DashboardActionTypes.FETCH_DEPOSIT_COUNT
            },
            {
                type: DashboardActionTypes.SET_DEPOSIT_FAIL
            }
        ]
        return store.dispatch(DashboardActions.getDepositCount()).then(() => {
            const actualActions = store.getActions()
            expect(expectedActions).toEqual(actualActions)
        })
    });
    it('should Test That Count is Returned For Expenses Deposit User Wise', function () {
        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    "isValid": true,
                    exp_dep
                }
            });


        });
        const expectedActions = [
            {
                type: DashboardActionTypes.FETCH_EXPENSES_DEPOSITS
            },
            {
                type: DashboardActionTypes.SET_EXPENSES_DEPSOITS_COUNT,
                count:exp_dep
            }
        ]
        return store.dispatch(DashboardActions.getExpenseDepositCount()).then(() => {
            const actualActions = store.getActions()
            expect(expectedActions).toEqual(actualActions)
        })
    });
    it('should fail Getting User Expenses Deposit Count', function () {
        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    "isValid": false
                }
            })
        });
        const expectedActions = [
            {
                type: DashboardActionTypes.FETCH_EXPENSES_DEPOSITS
            },
            {
                type: DashboardActionTypes.SET_EXPENSES_DEPSOITS_FAIL
            }
        ]
        return store.dispatch(DashboardActions.getExpenseDepositCount())
            .then(() => {
                const actualActions = store.getActions();
                expect(expectedActions).toEqual(actualActions)
            })
    });
    it('should Test That Count is Returned For Expenses Day Wise', function () {
        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    "isValid": true,
                    expenses
                }
            })

        })
        const expectedActions = [
            {
                type: DashboardActionTypes.FETCH_EXPENSES
            },
            {
                type: DashboardActionTypes.SET_EXPENSES_COUNT,
                count:expenses
            }
        ]
        return store.dispatch(DashboardActions.getExpensesCount()).then(() => {
            const actualActions = store.getActions()
            expect(expectedActions).toEqual(actualActions)
        })
    });
    it('should fail Getting User Expenses Count', function () {
        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    "isValid": false
                }
            })
        });
        const expectedActions = [
            {
                type: DashboardActionTypes.FETCH_EXPENSES
            },
            {
                type: DashboardActionTypes.SET_EXPENSES_FAIL
            }
        ]
        return store.dispatch(DashboardActions.getExpensesCount())
            .then(() => {
                const actualActions = store.getActions();
                expect(expectedActions).toEqual(actualActions)
            })
    });
})