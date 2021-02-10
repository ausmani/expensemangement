// @flow
import React, {useEffect, useState} from 'react';
import SiderBar from "../sidebar";
import Navigation from "../navigation";
import {Form, Formik} from "formik";
import FormikControl from "../FormikComponents/FormikControl";
import Footer from "../footer";
import * as Yup from 'yup';
import {addDeposit, updateDeposit} from '../../Actions/DepositActions'
import {listUsers} from "../../Actions/UserActions";
import {connect} from "react-redux";
import loader from "../../images/Ripple-1s-84px.gif";
import {useHistory, useParams} from "react-router-dom";

const AddEditDeposit = ({users, addDeposit, listUsers, allDeposits, updateDeposit}) => {
    let {id} = useParams();
    const [currentDepositId, setCurrentDespositId] = useState(id)

    function getInitialValues() {
        if (currentDepositId === undefined) {
            return {
                participant: "",
                amount: "",
                date: ""
            }
        } else {
            // console.log(allDeposits)
            const currentDeposit = allDeposits.deposits.filter(function (o) {
                return o['id'] === currentDepositId
            })[0];
            return {
                participant: currentDeposit['user_id'],
                amount: currentDeposit['amount'],
                date: new Date(currentDeposit['date'])
            }
        }
    }

    const intitialValues = getInitialValues()
    const history = useHistory();
    const validationSchema = Yup.object().shape({

    })
    // console.log(users)
    useEffect(() => {
        listUsers()
    }, [])
    return (
        <div className="wrapper">
            <SiderBar module="Deposits"/>
            <div className="main-panel">
                <Navigation title="Deposits Management"/>
                <div className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-plain">
                                <div className="card-header">
                                    <h4 className="card-title"> Add Deposit</h4>
                                    <p className="card-category"> Enter Deposit Amount </p>
                                </div>
                                <div className="card-body">
                                    <div className="col-md-4">
                                        <Formik initialValues={intitialValues} onSubmit={(values, {resetForm}) => {
                                            if (currentDepositId === undefined)
                                            {addDeposit(values, history)}

                                            else
                                            {updateDeposit(currentDepositId,values, history)}

                                        }} validationSchema={validationSchema}>
                                            {
                                                users.loading ? <div className="row loader-div">
                                                    <img src={loader} className="loader"/>
                                                </div> : <Form>
                                                    <FormikControl control="select" label="Select User"
                                                                   placeholder="Select User" options={users.users}
                                                                   key="id" value="fullName" name="participant"
                                                                   keyVal="id"/>
                                                    <FormikControl type="number" name="amount" placeholder="Amount"
                                                                   label="Deposit Amount" control="input"/>
                                                    <FormikControl type="text" control="date" label="Deposit Date"
                                                                   name="date" placeholder="Deposit Date"/>
                                                    <button type="submit" className="btn btn-primary">{currentDepositId===undefined?'Create':'Update'}</button>
                                                    <button type="reset" className="btn btn-info">Reset</button>
                                                </Form>
                                            }

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
    // console.log(state)
    return {
        users: state.users,
        allDeposits: state.deposit
    }
}
export const mapDispatchToProps = (dispatch) => {
    return {
        addDeposit: (data, history) => dispatch(addDeposit(data, history)),
        listUsers: (data) => dispatch(listUsers(data)),
        updateDeposit: (depositId,data,history) => dispatch(updateDeposit(depositId,data, history))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddEditDeposit);