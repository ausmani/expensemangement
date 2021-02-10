// @flow
import * as React from 'react';
import {Field , ErrorMessage} from "formik";
import TextError from "./TextError";


export const Radio = (props) => {
    const {label, name,keyVal,value ,options, ...rest} = props
    return (
        <div className="form-group">
            <label>{label}</label>
            <Field
                className="form-control"
                name={name}
                {...rest}
            >
                {
                    ({field}) => {
                        return options.map((option,ind)=>{
                            return (
                                <React.Fragment key={ind}>
                                    <input type="radio" id={option[value]} {...field} value={option[keyVal]} checked={field.value===option[keyVal]}/>
                                    <label htmlFor={option[value]}>{option[value]}</label>
                                </React.Fragment>
                            )
                        })
                    }}
            </Field>
            <ErrorMessage component={TextError} name={name}/>
        </div>
    );
};