// @flow 
import React from 'react';
import {Link} from "react-router-dom";
import logo from '../assets/img/logo-small.png';
import {ToastContainer} from "react-toastify";
import {Flip} from "react-toastify";
const SiderBar = ({module}) => {
    return (
        <>
            <ToastContainer
                position ="top-center"
                transition={Flip}
            />
            <div className="sidebar" data-color="white" data-active-color="danger">
                <div className="logo">
                    <Link to="/" className="simple-text logo-mini">
                        <div className="logo-image-small">
                            <img src={logo}/>
                        </div>

                    </Link>
                    <Link to="/" className="simple-text logo-normal">
                        Exp Management

                    </Link>
                </div>
                <div className="sidebar-wrapper">
                    <ul className="nav">
                        <li className={module=='Dashboard'?'active':''}>
                            <Link to="/home">
                                <i className="nc-icon nc-bank"></i>
                                <p>Dashboard</p>
                            </Link>
                        </li>
                        <li className={module==='Users'?'active':''}>
                            <Link to="/user">
                                <i className="nc-icon nc-single-02"></i>
                                <p>Users</p>
                            </Link>
                        </li>
                        <li className={module=='Expense'?'active':''}>
                            <Link to="/expense">
                                <i className="nc-icon nc-money-coins"></i>
                                <p>Expense</p>
                            </Link>
                        </li>
                        <li className={module=='Deposits'?'active':''}>
                            <Link to="/deposits">
                                <i className="nc-icon nc-vector "></i>
                                <p>Deposits</p>
                            </Link>
                        </li>

                    </ul>
                </div>
            </div>
        </>
    );
};
export default SiderBar;