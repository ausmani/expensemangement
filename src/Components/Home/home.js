// @flow
import React, {useEffect} from 'react';
import SiderBar from "../sidebar";
import Navigation from "../navigation";
import Footer from "../footer";
import Charts from "./charts";
import {useHistory} from "react-router";
import {connect, useSelector} from "react-redux";
import {
    getUserCount,
    getDepositCount,
    getExpenseCount,
    getExpensesCount,
    getExpenseDepositCount
} from '../../Actions/DashboardActions'
import loader from '../../images/Ripple-1s-84px.gif';



const Home = ({dashboard, userCount, depositCount, expenseCount, expensesCount, expenseDepositCount}) => {
    const numberFormat = (number) => {
        return new Intl.NumberFormat('en-IN').format(number)
    }
    useEffect(() => {
        // console.log("here")
        userCount();
        depositCount();
        expenseCount();
        expensesCount();
        expenseDepositCount();

    }, [])
    return (

        <div className="wrapper">
            <SiderBar module="Dashboard"/>
            <div className="main-panel">
                <Navigation title="Dashboard"/>
                <div className="content">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="card card-stats">
                                {
                                    dashboard.loadingUser ? <div className="card-body">
                                        <div className="row loader-div">
                                            <img src={loader} className="loader"/>
                                        </div>
                                    </div> : dashboard.loadingUserError ? <div className="card-body">
                                        <div className="row loader-div">
                                            <h1>Error Getting Data</h1>
                                        </div>
                                    </div> : <>
                                        <div className="card-body ">
                                            <div className="row">
                                                <div className="col-5 col-md-4">
                                                    <div className="icon-big text-center icon-warning">
                                                        <i className="nc-icon nc-globe text-warning"></i>
                                                    </div>
                                                </div>
                                                <div className="col-7 col-md-8">
                                                    <div className="numbers">
                                                        <p className="card-category">Users</p>
                                                        <p className="card-title">{numberFormat(dashboard.userCount)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer ">
                                            <hr/>
                                            <div className="stats">
                                                <i className="fa fa-sync-alt"></i>
                                                Update Now
                                            </div>
                                        </div>
                                    </>
                                }


                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="card card-stats">
                                {
                                    dashboard.loadingUser ? <div className="card-body">
                                        <div className="row loader-div">
                                            <img src={loader} className="loader"/>
                                        </div>
                                    </div> : dashboard.loadingUserError ? <div className="card-body">
                                        <div className="row loader-div">
                                            <h1>Error Getting Data</h1>
                                        </div>
                                    </div> : <>
                                        <div className="card-body ">
                                            <div className="row">
                                                <div className="col-5 col-md-4">
                                                    <div className="icon-big text-center icon-warning">
                                                        <i className="nc-icon nc-money-coins text-success"></i>
                                                    </div>
                                                </div>
                                                <div className="col-7 col-md-8">
                                                    <div className="numbers">
                                                        <p className="card-category">Total Deposit</p>
                                                        <p className="card-title">$ {numberFormat(dashboard.depositCount)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer ">
                                            <hr/>
                                            <div className="stats">
                                                <i className="fa fa-calendar-week"></i>
                                                Few Min Ago
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="card card-stats">
                                {
                                    dashboard.loadingUser ? <div className="card-body">
                                        <div className="row loader-div">
                                            <img src={loader} className="loader"/>
                                        </div>
                                    </div> : dashboard.loadingUserError ? <div className="card-body">
                                        <div className="row loader-div">
                                            <h1>Error Getting Data</h1>
                                        </div>
                                    </div> : <>
                                        <div className="card-body ">
                                            <div className="row">
                                                <div className="col-5 col-md-4">
                                                    <div className="icon-big text-center icon-warning">
                                                        <i className="nc-icon nc-vector text-danger"></i>
                                                    </div>
                                                </div>
                                                <div className="col-7 col-md-8">
                                                    <div className="numbers">
                                                        <p className="card-category">Total Expense</p>
                                                        <p className="card-title">$ {numberFormat(dashboard.expenseCount)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer ">
                                            <hr/>
                                            <div className="stats">
                                                <i className="fa fa-calendar-week"></i>
                                                Few Min Ago
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>

                    </div>
                    <Charts cdata={dashboard}/>

                </div>
                <Footer/>
            </div>
        </div>

    );
};

export const mapStateToProps = (state) => {
    return {
        dashboard: state.home
    }
}
export const mapDispatchToProps = (dispatch) => {

    return {
        userCount: () => dispatch(getUserCount()),
        depositCount: () => dispatch(getDepositCount()),
        expenseCount: () => dispatch(getExpenseCount()),
        expensesCount: () => dispatch(getExpensesCount()),
        expenseDepositCount: () => dispatch(getExpenseDepositCount()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);