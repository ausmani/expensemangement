// @flow
import React,{useEffect} from 'react';
import SiderBar from "../sidebar";
import Navigation from "../navigation";
import Footer from "../footer";
import {Link} from "react-router-dom";
import {listDeposits , deleteDeposit}  from '../../Actions/DepositActions'
import {connect} from "react-redux";

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css



const ListDeposits = ({deposits,getDeposits,removeDeposit}) => {
    // console.log(deposits)
    const allDeposits = deposits.deposits;
    useEffect(()=>{
        getDeposits()
    },[])

    function deleteDeposit(depositId) {

        confirmAlert({
            title: 'Delete Deposit',
            message: 'Are you sure you want to delete this Deposit Amount?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => removeDeposit(depositId)
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
            <SiderBar module="Deposits"/>
            <div className="main-panel">
                <Navigation title="Users Management"/>
                <div className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-plain">
                                <div className="card-header">
                                    <h4 className="card-title"> Deposit List</h4>
                                    <p className="card-category"> Deposits Submitted By Users <Link to="/deposit/create" className="btn btn-primary float-right">Add Deposit</Link></p>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead className=" text-primary">
                                            <tr>
                                                <th>
                                                    Participant Name
                                                </th>
                                                <th>
                                                    Amount
                                                </th>
                                                <th>
                                                    Date
                                                </th>
                                                <th className="text-right">
                                                    Action
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {   deposits.loading ? <tr><td colSpan="4" className="text-center"><h4>Loading</h4></td></tr> :
                                                deposits.error? <tr><td colSpan="4" className="text-center"><h4>Error While Loading</h4></td></tr> :
                                                    allDeposits.map((row, ind) => {
                                                        return (
                                                            <tr key={ind}>
                                                                <td>{row['first_name']+' '+row['last_name']}</td>
                                                                <td>{row['amount']}</td>
                                                                <td>{row['date']}</td>
                                                                <td className="text-right"><Link to={`/deposit/update/${row['id']}`}><i className="fa fa-edit"/> </Link> | <Link to="deposit/delete" onClick={(e)=>{e.preventDefault();deleteDeposit(row['id'])}}><i className="fa fa-trash alert-danger"/></Link></td>
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
        deposits: state.deposit
    }
}
export const mapDispatchToProps = (dispatch)=> {

    return {
        getDeposits : () => dispatch(listDeposits()),
        removeDeposit : (depositId)=>dispatch(deleteDeposit(depositId))
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (ListDeposits);