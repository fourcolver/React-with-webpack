import React from 'react';
import InputError from './index';

describe('InputError', () => {
  it('render InputError component', () => {
    const wrapper = shallow(<InputError text={'error'} />);
    expect(wrapper).toMatchSnapshot();
  });
});
