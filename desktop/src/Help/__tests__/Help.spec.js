/* eslint-env mocha, jest */

import getActual from '../../shared/testUtils';
import Help from '../Help';

const defaultProps = {
  sidebarExpanded: true,
  openExternal() {},
};
const getActualHelp = getActual(Help, defaultProps);

it('should render', () => {
  getActualHelp({});
});
it('should be a <div />', () => {
  const wrapper = getActualHelp({});
  expect(wrapper.is('div.Help')).toBe(true);
});
it('should have 1 <List />', () => {
  const wrapper = getActualHelp({});
  expect(wrapper.find('List').length).toBe(1);
});
it('should have 3 <ListItem />', () => {
  const wrapper = getActualHelp({});
  expect(wrapper.find('ListItem').length).toBe(3);
});
it('should have 3 <Divider />', () => {
  const wrapper = getActualHelp({});
  expect(wrapper.find('Divider').length).toBe(3);
});

it('should set its style based on props', () => {
  const wrapper = getActualHelp({
    sidebarExpanded: false,
  });
  expect(wrapper.prop('style').marginLeft).toBe(56);
});

it('should call openExternal when handling ListItem onClick', () => {
  let a = 0;
  const wrapper = getActualHelp({
    openExternal() {
      a += 1;
    },
  });
  wrapper.find('ListItem').at(0).props().onClick();
  wrapper.find('ListItem').at(1).props().onClick();
  wrapper.find('ListItem').at(2).props().onClick();
  expect(a).toBe(3);
});
