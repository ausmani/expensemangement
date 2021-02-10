// @flow
import React,{useState,useEffect} from 'react';
import "../Css/Auth.css";
import {Link , useHistory} from "react-router-dom";
import {authenticateUSer} from "../Actions/AuthActions";
import {connect} from "react-redux";
import loader from '../images/spinner.gif';

function moveHome(history) {
    history.push("/home")
}
const SignIn = ({auth,authUser}) => {
    // console.log(auth)
    const history = useHistory();
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    function signInSubmit(e) {
        e.preventDefault();
        authUser(username,password)
    }

    if(auth.verified){
       moveHome(history)
    }
 return (
  <>

      <div className="signup-form">
          <form  method="post" onSubmit={signInSubmit}>
              <h2>Sign In</h2>
              <p className="hint-text">Enter you credentials.</p>

              <div className="form-group">
                  <input type="email" className="form-control" name="email" placeholder="User Email" required="required" value={username} onChange={(e)=>setUsername(e.target.value)}/>
              </div>
              <div className="form-group">
                  <input type="password" className="form-control" name="password" placeholder="User Password"  onChange={(e)=>setPassword(e.target.value)} value={password}
                         required="required"/>
              </div>


              <div className="form-group">
                  <button type="submit" className="btn btn-success btn-lg btn-block ">Log In
                  </button>
              </div>
              <div className={`text-center ${auth.loading?'':'hide'}`}>
                  <span><img src={loader}/> </span>
              </div>
              <div className={`error-text text-center ${auth.msg==''?'hide':''}`}>
                  <span>{auth.msg}</span>
              </div>
          </form>
          <div className="text-center">Want to create an account? <Link className="userSignUp" to="/signup" >Sign Up</Link></div>
      </div>
  </>
 );
};

export const mapStateToProps = (state) => {

    return {
        auth: state.auth
    }
}

export const mapDispatchToProps = (dispatch) => {

    return {
        authUser : (email,password)=> dispatch(authenticateUSer(email,password))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignIn);