// @flow
import * as React from 'react';

const TextError = (props) => {
    return (
        <div className="alert alert-danger">{props.children}</div>
    );
};
export default TextError;