// @flow
import React, {useEffect} from 'react';
import SiderBar from "../sidebar";
import Navigation from "../navigation";
import Footer from "../footer";
import {Link} from "react-router-dom";
import {listExpenses,deleteExpense} from '../../Actions/ExpenseActions'
import {connect} from "react-redux";
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const ListExpense = ({allExpenses, listExpenses,removeExpense}) => {
    // console.log(allExpenses)
    useEffect(() => {
        listExpenses();
    }, [])
    function deleteExpense(expenseId) {
        confirmAlert({
            title: 'Delete Expense',
            message: 'Are you sure you want to delete this Expense?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {removeExpense(expenseId);// console.log("clicked")
                         }
                },
                {
                    label: 'No',
                    onClick: () => console.log("Cancelled")
                }
            ]
        });

    }
    return (
        <div className="wrapper">
            <SiderBar module="Expense"/>
            <div className="main-panel">
                <Navigation title="Users Management"/>
                <div className="content">
                    <div className="expense">
                        <div className="col-md-12">
                            <div className="card card-plain">
                                <div className="card-header">
                                    <h4 className="card-title"> Expenses List</h4>
                                    <p className="card-category"> Expenses Made by Users <Link to="/expense/create"
                                                                                               className="btn btn-primary float-right">Add
                                        Expense</Link></p>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead className=" text-primary">
                                            <tr>
                                                <th>
                                                    Expense
                                                </th>
                                                <th>
                                                    Amount
                                                </th>
                                                <th>
                                                    Date
                                                </th>
                                                <th>
                                                    Participants
                                                </th>
                                                <th className="text-right">
                                                    Action
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                allExpenses.map((expense,ind)=>{
                                                    return (
                                                        <tr key={ind}>
                                                            <td>{expense['expense']}</td>
                                                            <td>{expense['amount']}</td>
                                                            <td>{expense['date']}</td>
                                                            <td>{expense['participants']}</td>
                                                            <td><Link to={`/expense/update/${expense['id']}`}><i className="fa fa-edit"/> </Link> | <Link to="#" onClick={()=>deleteExpense(expense['id'])}><i className="fa fa-trash alert-danger"/></Link></td>
                                                        </tr>
                                                    )
                                                })
                                            }


                                            </tbody>
                                        </table>
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
        expenseState: state.expenses,
        allExpenses: state.expenses.expenses,
    }
}
export const mapDispatchToProps = (disptach) => {
    return {
        listExpenses: () => disptach(listExpenses()),
        removeExpense: (expenseId) => disptach(deleteExpense(expenseId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListExpense)
