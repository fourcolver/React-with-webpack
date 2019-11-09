import React from 'react';
import SelectBox from './index';

describe('SelectBox', () => {
  it('render SelectBox component', () => {
    const wrapper = shallow(<SelectBox meta input items={[]} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('render SelectBox component with no selected element', () => {
    const wrapper = shallow(
      <SelectBox meta input items={[]} placeholder={'placeholder'} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
