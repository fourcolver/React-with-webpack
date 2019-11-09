import { configure, shallow, render, mount } from 'enzyme';
import jest from 'jest';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.jest = jest;
global.actions = {};

console.error = message => {
  throw new Error(message);
};
