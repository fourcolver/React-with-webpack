import React from 'react';

const Checkbox = ({ children, value, onChange }) => (
  <div>
    <input className="" type="checkbox" value={value} onChange={onChange} />
    {children}
  </div>
);
export default Checkbox;
