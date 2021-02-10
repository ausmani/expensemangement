// @flow
import * as React from 'react';
import {Field , ErrorMessage} from "formik";
import TextError from "./TextError";


export const CheckBox = (props) => {
    const {label, name,keyVal,val ,options, ...rest} = props

    return (
        <div className="form-group">
            <label>{label}</label>
            <div className="clearfix"></div>
            <Field
                className="form-control"
                name={name}
                {...rest}
            >
                {
                    ({field}) => {
                        return options.map((option,ind)=>{

                            return (

                                <React.Fragment key={ind} >

                                    <input type="checkbox" id={option[val]} {...field} value={option[val]}  checked={field.value.includes(option[val])}/>
                                    <label htmlFor={option[val]}>{option[keyVal]}</label>
                                </React.Fragment>
                            )
                        })
                    }}
            </Field>
            <ErrorMessage component={TextError} name={name}/>
        </div>
    );
};