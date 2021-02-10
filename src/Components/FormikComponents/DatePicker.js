// @flow
import * as React from 'react';
import DateView from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {Field , ErrorMessage} from "formik";
import TextError from "./TextError";

const DatePicker = (props) => {
    const {label, name, ...rest} = props
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <div className="clearfix"></div>
            <Field
                name={name}

            >
                {
                    ({form, field}) => {
                        const {setFieldValue} = form
                        const {value} = field
                        return <DateView
                            id={name}
                            {...field}
                            {...rest}
                            selected={value}
                            onChange={val => setFieldValue(name, val)}
                            className="form-control"
                        />
                    }
                }
            </Field>
            <ErrorMessage component={TextError} name={name}/>
        </div>
    );
};
export default DatePicker;