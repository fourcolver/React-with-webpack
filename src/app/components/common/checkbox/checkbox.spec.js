import React from 'react';
import Checkbox from './index';

describe('Checkbox', () => {
  it('render Checkbox component', () => {
    const wrapper = shallow(
      <Checkbox>
        <span className="custom-checkbox">Checkbox text</span>
      </Checkbox>,
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.custom-checkbox').length).toEqual(1);
  });
});
