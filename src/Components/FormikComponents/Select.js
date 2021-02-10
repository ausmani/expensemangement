// @flow
import * as React from 'react';
import {Field, ErrorMessage} from "formik";
import TextError from "./TextError";

export const Select = (props) => {
    // console.log(props)
    let {name, label, options,key,keyVal,value, ...rest} = props;
    if(key===undefined){
        key = keyVal
    }

    return (
       <>
           <div className="form-group">
               <label htmlFor="name">{label}</label>
               <Field
                   id={name}
                   name={name}
                   {...rest}
                   as='select'
                   className="form-control"
               >
                   <option value="">Select</option>
                   {
                       options.map((option,ind)=>{
                           //console.log(option)
                           //console.log(key)
                           return (
                               <option value={option[key]} key={ind} >{option[value]}</option>
                           )
                       })
                   }
               </Field>
               <ErrorMessage component={TextError} name={name}/>
           </div>

           </>
    );
};