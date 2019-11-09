import React, { Fragment } from 'react';
import InputError from '../input-error';

const Input = ({ meta, input, type = 'text', disabled, ...rest }) => (
  <Fragment>
    <input
      type={type}
      disabled={disabled}
      className="form-control"
      {...input}
      {...rest}
    />
    {meta.touched && meta.error && <InputError text={meta.error} />}
  </Fragment>
);
export default Input;
