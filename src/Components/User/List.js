// @flow
import React, {useEffect} from 'react';
import SiderBar from "../sidebar";
import Navigation from "../navigation";
import Footer from "../footer";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {listUsers,deleteUser} from "../../Actions/UserActions";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const ListUser = ({user, getUsers ,removeUser}) => {
    // console.log(user)
    const allUsers = user.users
    useEffect(() => {
        getUsers()
    }, [])
    function deleteUser(userId) {
        confirmAlert({
            title: 'Delete User',
            message: 'Are you sure you want to delete this user?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => removeUser(userId)
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
            <SiderBar module="Users"/>
            <div className="main-panel">
                <Navigation title="Users Management"/>
                <div className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-plain">
                                <div className="card-header">
                                    <h4 className="card-title"> Users List</h4>
                                    <p className="card-category"> User Management <Link to="/user/create"
                                                                                        className="btn btn-primary float-right">Add
                                        User</Link></p>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead className=" text-primary">
                                            <tr>
                                                <th>
                                                    First Name
                                                </th>
                                                <th>
                                                    Last Name
                                                </th>
                                                <th>
                                                    Email
                                                </th>
                                                <th>
                                                    Action
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody>

                                            {   user.loading ? <tr><td colSpan="4" className="text-center"><h4>Loading</h4></td></tr> :
                                                user.error? <tr><td colSpan="4" className="text-center"><h4>Error While Loading</h4></td></tr> :
                                                allUsers.map((row, ind) => {
                                                    return (
                                                        <tr key={ind}>
                                                            <td>{row['first_name']}</td>
                                                            <td>{row['last_name']}</td>
                                                            <td>{row['email']}</td>
                                                            <td><Link to={`user/update/${row['id']}`}><i className="fa fa-edit"/> </Link> | <Link to="#" onClick={()=>deleteUser(row['id'])}><i className="fa fa-trash alert-danger"/></Link></td>
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
        user: state.users
    }
}
export const mapDispatchToProps = (disptach) => {

    return {
        getUsers: () => disptach(listUsers()),
        removeUser: (userId)=>disptach(deleteUser(userId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListUser);

//export default ListUser;