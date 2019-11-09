import React, { Fragment } from 'react';
import InputError from '../input-error';

const SelectBox = ({
  meta: { touched, error },
  input,
  disabled,
  items,
  placeholder,
  onChange,
  ...rest
}) => (
  <Fragment>
    <select
      disabled={disabled}
      className="form-control"
      {...input}
      {...rest}
      onChange={onChange}
    >
      {placeholder && <option value="-1">{placeholder}</option>}
      {items &&
        items.map(x => (
          <option key={x.value} value={x.value}>
            {x.label}
          </option>
        ))}
    </select>
    {touched && error && <InputError text={error} />}
  </Fragment>
);
export default SelectBox;
