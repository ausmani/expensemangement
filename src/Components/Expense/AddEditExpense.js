// @flow
import React, {useEffect, useState} from 'react';
import SiderBar from "../sidebar";
import Navigation from "../navigation";
import {Form, Formik} from "formik";
import FormikControl from "../FormikComponents/FormikControl";
import Footer from "../footer";
import * as Yup from 'yup';
import {listUsers} from "../../Actions/UserActions";
import {addExpense,updateExpense} from "../../Actions/ExpenseActions";
import {connect} from "react-redux";
import {useHistory, useParams} from "react-router";

const AddEditExpense = ({users, getUsers,addExpense,allExpenses,updateExpense}) => {
    let {id} = useParams();
    const [currentExpenseId, setCurrentExpenseId] = useState(id)
    const history = useHistory();
    function getInitialValues() {
        if (currentExpenseId === undefined) {
            return {
                participants: [],
                amount: "",
                expense: "",
                date: ""
            }
        } else {
            const currentExpense = allExpenses.filter(function(o){return o['id'] == currentExpenseId} )[0];
            // console.log(currentExpense)
            return {
                participants: currentExpense['participants_id'].split(","),
                amount: currentExpense['amount'],
                expense: currentExpense['expense'],
                date: new Date(currentExpense['date'])
            }
        }

    }

    const intitialValues = getInitialValues()
    const validationSchema = Yup.object().shape({
        expense: Yup.string().required("Expense is Required"),
        amount: Yup.string().required("Amount is Required"),
        date: Yup.string().required("Date is Required"),
        participants: Yup.array().required('At least One Participant need to be selected')
    })
    useEffect(() => {
        getUsers();
    }, [])
    // console.log(users)
    return (
        <div className="wrapper">
            <SiderBar module="Expense"/>
            <div className="main-panel">
                <Navigation title="Expense Management"/>
                <div className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-plain">
                                <div className="card-header">
                                    <h4 className="card-title"> {currentExpenseId===undefined?'Create':'Update'} Expense</h4>
                                    <p className="card-category"> {currentExpenseId===undefined?'Create':'Update'} Expense on a Day </p>
                                </div>
                                <div className="card-body">
                                    <div className="col-md-4">
                                        <Formik initialValues={intitialValues} onSubmit={(values, {resetForm}) => {
                                            if(id===undefined)
                                            addExpense(values,history)
                                            else
                                                updateExpense(currentExpenseId,values,history)
                                        }} validationSchema={validationSchema}>
                                            <Form>
                                                <FormikControl type="text" name="expense" placeholder="Expense"
                                                               label="Expense" control="input"/>
                                                <FormikControl type="text" name="date" placeholder="date"
                                                               label="Expense Date" control="date"/>
                                                <FormikControl type="number" name="amount" placeholder="Expense Amount"
                                                               label="Expense Amount" control="input"/>
                                                <FormikControl control="checkbox" label="Select User"
                                                               placeholder="Select User" options={users} val="id"
                                                               name="participants" keyVal="fullName"/>
                                                <button type="submit" className="btn btn-primary">{currentExpenseId===undefined?'Create':'Update'}</button>
                                                <button type="reset" className="btn btn-info">Reset</button>
                                            </Form>
                                        </Formik>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
                <Footer/>
            </div>
        </div>
    );
};
export const mapStateToProps = (state) => {
    return {
        users: state.users.users,
        allExpenses: state.expenses.expenses
    }
}
export const mapDispatchToProps = (dispatch) => {
    return {
        getUsers: () => dispatch(listUsers()),
        addExpense: (data,history)=>dispatch(addExpense(data,history)),
        updateExpense: (expenseId,data,history)=>dispatch(updateExpense(expenseId,data,history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEditExpense);