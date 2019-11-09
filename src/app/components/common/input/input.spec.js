import React from 'react';
import Input from './index';

describe('Input', () => {
  it('render Input component', () => {
    const wrapper = shallow(<Input meta input />);
    expect(wrapper).toMatchSnapshot();
  });
});
