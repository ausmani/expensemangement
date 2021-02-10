import DashboardReducer from "../DashboardReducer";
import * as dType from '../../Actions/ActionTypes/DashboardType.js';


let initialState = {
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

describe("Test the Dashboard Reducer For User Count", () => {
    it('should Test the default State', function () {
        const newState = DashboardReducer(undefined, {});
        expect(newState).toEqual(initialState)
    });
    it('should Test the Request Status ', function () {

        initialState.loadingUser = true;
        initialState.userCount = 0;
        initialState.loadingUserError = false;
        const newState = DashboardReducer(undefined, {
            type: dType.FETCH_USER_COUNT
        })
        expect(newState).toEqual(initialState)
    });
    it('should Test Count Received', function () {

        initialState.loadingUser = false;
        initialState.userCount = 10;
        initialState.loadingUserError = false;
        const newState = DashboardReducer(undefined, {
            type: dType.SET_USER_COUNT,
            count: 10
        })
        expect(newState).toEqual(initialState);
    });
    it('should Test Fail User Count', function () {
        initialState.loadingUser = false;
        initialState.userCount = 0;
        initialState.loadingUserError = true;
        const newState = DashboardReducer(undefined, {
            type: dType.SET_USER_FAIL
        })
        expect(newState).toEqual(initialState);
    });

    // Deposit Count
    it('should Test the Deposit Request Status ', function () {
        initialState.loadingUserError = false;
        initialState.loadingDeposit = true;
        initialState.depositCount = 0;
        initialState.loadingDepositError = false;
        const newState = DashboardReducer(undefined, {
            type: dType.FETCH_DEPOSIT_COUNT
        })
        expect(newState).toEqual(initialState)
    });
    it('should Test Deposit Count Received', function () {

        initialState.loadingDeposit = false;
        initialState.depositCount = 10;
        initialState.loadingDepositError = false;
        const newState = DashboardReducer(undefined, {
            type: dType.SET_DEPOSIT_COUNT,
            count: 10
        })
        expect(newState).toEqual(initialState);
    });
    it('should Test Fail Deposit Count', function () {
        initialState.loadingDeposit = false;
        initialState.depositCount = 0;
        initialState.loadingDepositError = true;
        const newState = DashboardReducer(undefined, {
            type: dType.SET_DEPOSIT_FAIL
        })
        expect(newState).toEqual(initialState);
    });

    // Ex[emse Count
    it('should Test the Expense Request Status ', function () {
        initialState.loadingDepositError = false;
        initialState.loadingExpense = true;
        initialState.expenseCount = 0;
        initialState.loadingExpenseError = false;
        const newState = DashboardReducer(undefined, {
            type: dType.FETCH_EXPENSE_COUNT
        })
        expect(newState).toEqual(initialState)
    });
    it('should Test Expense Count Received', function () {

        initialState.loadingExpense = false;
        initialState.expenseCount = 10;
        initialState.loadingExpenseError = false;
        const newState = DashboardReducer(undefined, {
            type: dType.SET_EXPENSE_COUNT,
            count: 10
        })
        expect(newState).toEqual(initialState);
    });
    it('should Test Fail Expense Count', function () {
        initialState.loadingExpense = false;
        initialState.expenseCount = 0;
        initialState.loadingExpenseError = true;
        const newState = DashboardReducer(undefined, {
            type: dType.SET_EXPENSE_FAIL
        })
        expect(newState).toEqual(initialState);
    });
});
describe('Test Should Check the Valeus for Graph on Dashboard For Expense', () => {

    it('should Send Request to Fetch Expense Data for Chart', function () {
        initialState.loadingExpenseError = false;
        initialState.loadingExpenses = true;
        const newState = DashboardReducer(undefined,{
            type: dType.FETCH_EXPENSES
        });
        expect(newState).toEqual(initialState);
    });
    it('should Send Request to Set Expense Data for Chart', function () {
        initialState.loadingExpenses = false;
        initialState.expenses =  {"2021-02-04":0,"2021-02-05":0,"2021-02-06":0,"2021-02-07":0,"2021-02-08":"299","2021-02-09":0,"2021-02-10":0}
        const count = {"2021-02-04":0,"2021-02-05":0,"2021-02-06":0,"2021-02-07":0,"2021-02-08":"299","2021-02-09":0,"2021-02-10":0}
        const newState = DashboardReducer(undefined,{
            type: dType.SET_EXPENSES_COUNT,
            count
        });
        expect(newState).toEqual(initialState);
    });
    it('should set to Fail to Expenses data', function () {
        initialState.expenses = [];
        initialState.loadingExpensesError = true;
        const newState = DashboardReducer(undefined,{
            type: dType.SET_EXPENSES_FAIL
        })
        expect(newState).toEqual(initialState)
    });
})
describe('Test Should Check the Valeus for Graph on Dashboard For Expense Deposit', () => {

    it('should Send Request to Fetch Expense Deposit Data for Chart', function () {
        initialState.loadingExpensesError = false;
        initialState.loadingExpenseDeposit = true;
        const newState = DashboardReducer(undefined,{
            type: dType.FETCH_EXPENSES_DEPOSITS
        });
        expect(newState).toEqual(initialState);
    });
    it('should Send Request to Set Expense Deposit Data for Chart', function () {
        initialState.loadingExpenseDeposit = false;
        initialState.expenseDeposit =  [{"first_name":"Awais","last_name":"Munawar Usmani","expense":"590.2222213745117","deposit":"2403"},{"first_name":"Umer","last_name":"Usmani","expense":"590.2222213745117","deposit":"1500"},{"first_name":"Waleed","last_name":"usmani","expense":"590.2222213745117","deposit":"800"}]
        const count = [{"first_name":"Awais","last_name":"Munawar Usmani","expense":"590.2222213745117","deposit":"2403"},{"first_name":"Umer","last_name":"Usmani","expense":"590.2222213745117","deposit":"1500"},{"first_name":"Waleed","last_name":"usmani","expense":"590.2222213745117","deposit":"800"}]
        const newState = DashboardReducer(undefined,{
            type: dType.SET_EXPENSES_DEPSOITS_COUNT,
            count
        });
        expect(newState).toEqual(initialState);
    });
    it('should set to Fail to Expenses Deposit data', function () {
        initialState.expenseDeposit = [];
        initialState.loadingExpenseDepositError = true;
        const newState = DashboardReducer(undefined,{
            type: dType.SET_EXPENSES_DEPSOITS_FAIL
        })
        expect(newState).toEqual(initialState)
    });
})
