// @flow
import React from 'react';
import {Link,useHistory} from "react-router-dom";
import { Navbar} from "react-bootstrap";
import {NavDropdown} from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux";


const Navigation = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const loggedIn = useSelector((state) => state.auth);
    function logOut(e) {
        e.preventDefault();
        dispatch({type:'USER_LOGOUT'})
        history.push("/login")
    }
    function checkloginn(history, loggedIn) {
        if (!loggedIn.verified)
            history.push('/login')
    }
    checkloginn(history, loggedIn)


 return (
  <>
      <Navbar className="navbar navbar-expand-lg navbar-absolute fixed-top navbar-transparent">
          <div className="container-fluid">
              <div className="navbar-wrapper">
                  <div className="navbar-toggle">
                      <button type="button" className="navbar-toggler">
                          <span className="navbar-toggler-bar bar1"></span>
                          <span className="navbar-toggler-bar bar2"></span>
                          <span className="navbar-toggler-bar bar3"></span>
                      </button>
                  </div>
                  <Link className="navbar-brand" to="#">{props.title} <span className="welcome">Welcome {loggedIn.user['first_name']+" "+loggedIn.user['last_name']} !!</span></Link>

              </div>

              <div className="collapse navbar-collapse justify-content-end" id="navigation">

                  <ul className="navbar-nav ul-mar">

                      <li className="nav-item btn-rotate dropdown">
                          <NavDropdown title={ <i className="nc-icon nc-bell-55"></i>} >
                              <NavDropdown.Item href="/logout" onClick={logOut}>Logout</NavDropdown.Item>
                              <NavDropdown.Divider />

                          </NavDropdown>

                      </li>
                      <li className="nav-item">
                          <Link className="nav-link btn-rotate" to="#">
                              <i className="nc-icon nc-settings-gear-65"></i>
                              <p>
                                  <span className="d-lg-none d-md-block">Account</span>
                              </p>
                          </Link>
                      </li>
                  </ul>
              </div>
          </div>
      </Navbar>
  </>
 );
};
export default Navigation;