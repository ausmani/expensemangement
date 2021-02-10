import React, {useState} from 'react'
import './App.css';
import SignUp from "./Components/signup";
import SignIn from "./Components/signin";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery'
import 'bootstrap/dist/js/bootstrap.min'
import './assets/css/paper-dashboard.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import NF404 from "./Components/NF404";
import ListUser from "./Components/User/List";
import AddEditUser from "./Components/User/AddEdit";
import Home from "./Components/Home/home";
import ListExpense from "./Components/Expense/ListExpense";
import ListDeposits from "./Components/Deposits/ListDeposits";
import AddEditDeposit from "./Components/Deposits/addEditDeposit";
import AddEditExpense from "./Components/Expense/AddEditExpense";


function App() {


    return (

        <div className="">

            <Router>
                <Switch>
                    <Route exact path="/login" component={SignIn}/>
                    <Route exact path="/signup" component={SignUp}/>
                    <Route exact path="/expense" component={ListExpense}/>
                    <Route exact path="/expense/create" component={AddEditExpense}/>
                    <Route exact path="/expense/update/:id" component={AddEditExpense}/>
                    <Route exact path="/deposits" component={ListDeposits}/>
                    <Route exact path="/deposit/create" component={AddEditDeposit}/>
                    <Route exact path="/deposit/update/:id" component={AddEditDeposit}/>
                    <Route exact path="/user" component={ListUser}/>
                    <Route exact path="/user/create" component={AddEditUser}/>
                    <Route exact path="/user/update/:id" component={AddEditUser}/>
                    <Route exact path="/home" render={() => <Home/>}/>
                    <Route exact path="/" render={() => <Home/>}/>
                    <Route path="*" render={() => <NF404/>}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
