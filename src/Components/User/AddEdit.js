// @flow
import React,{useEffect ,useState} from 'react';
import SiderBar from "../sidebar";
import Navigation from "../navigation";
import {useHistory,useParams} from "react-router-dom";
import Footer from "../footer";
import {Formik, Form} from "formik";
import * as Yup from 'yup';
import FormikControl from "../FormikComponents/FormikControl";
import {connect} from "react-redux";
import {addUser ,updateUser} from "../../Actions/UserActions";
import 'react-toastify/dist/ReactToastify.css';
const AddEditUser = ({user,saveUser,updateUser}) => {
    let { id } = useParams();
    const [currentUserId,setCurrentUserId] = useState(id)

    function getInitialValues() {
        if(currentUserId===undefined){
            return {
                first_name: "",
                last_name: "",
                email:"",
                password:"",
                confirm_password:""
            }
        }
        else{
            const currentUser = user.users.filter(function(o){return o['id'] == currentUserId} )[0];
            return {
                first_name: currentUser["first_name"],
                last_name: currentUser["last_name"],
                email:currentUser["email"],
                password:"",
                confirm_password:""
            }
        }
    }
    const intitialValues = getInitialValues()
    // console.log(user)
    const history = useHistory();
    let validationSchema ='';
    if(currentUserId===undefined){
        validationSchema = Yup.object().shape({
            first_name: Yup.string()
                .min(3, "Minimum 3 Characters")
                .max(25, "Max 25 Characters")
                .required("Required"),
            last_name: Yup.string()
                .min(3, "Minimum 3 Characters")
                .max(25, "Max 25 Characters")
                .required("Required"),
            email: Yup.string()
                .email('Invalid Email')
                .required("Required"),
            password: Yup.string()
                .min(5, "Minimum 5 Characters")
                .required("Required"),
            confirm_password: Yup.string()
                .oneOf([Yup.ref("password")],"Password's not match")
                .required("Required"),
        })
    }
    else{
         validationSchema = Yup.object().shape({
            first_name: Yup.string()
                .min(3, "Minimum 3 Characters")
                .max(25, "Max 25 Characters")
                .required("Required"),
            last_name: Yup.string()
                .min(3, "Minimum 3 Characters")
                .max(25, "Max 25 Characters")
                .required("Required"),
            email: Yup.string()
                .email('Invalid Email')
                .required("Required"),
            password: Yup.string()
                .min(5, "Minimum 5 Characters"),
            confirm_password: Yup.string()
                .oneOf([Yup.ref("password")],"Password's not match")
        })
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
                                    <h4 className="card-title"> Add User</h4>
                                    <p className="card-category"> Create New User </p>
                                </div>
                                <div className="card-body">

                                    <div className="col-md-4">
                                        <Formik initialValues={intitialValues} onSubmit={(values,{resetForm}) => {
                                            if(currentUserId===undefined){
                                                saveUser(values,history)
                                            }
                                            else{
                                                updateUser(currentUserId,values,history)
                                            }

                                        }} validationSchema={validationSchema}>
                                            <Form>
                                                <FormikControl type="text" name="first_name" placeholder="First name" label="First Name" control="input"/>
                                                <FormikControl type="text" name="last_name" placeholder="Last name" label="Last Name" control="input"/>
                                                <FormikControl type="email" name="email" placeholder="Email" label="Email" control="input"/>
                                                <FormikControl type="password" name="password" placeholder="Password" label="Password" control="input"/>
                                                <FormikControl type="password" name="confirm_password" placeholder="Confirm Password" label="Confirm Password" control="input"/>
                                                <button type="submit" className="btn btn-primary">{currentUserId===undefined?'Create':'Update'}</button>
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
        user: state.users
    }
}
export const mapDispatchToProps = (disptach) => {

    return {
        saveUser :(data,history)=> disptach(addUser(data,history)),
        updateUser: (userId,data,history)=>disptach(updateUser(userId,data,history))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddEditUser);