// @flow
import * as React from 'react';
import {Field ,ErrorMessage} from "formik";
import TextError from "./TextError";

export const TextArea = (props) => {
    const {label,name,...rest} = props
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <Field id={name} name={name} {...rest} as='textarea' className="form-control"/>
            <ErrorMessage name={name} component={TextError}/>
        </div>
    );
};