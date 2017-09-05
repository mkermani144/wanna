/* eslint-env mocha, jest */

import getDefault from '../../lib/testUtils';
import Help from '../Help';

const defaultProps = {
  sidebarExpanded: true,
  openExternal() {},
};
const getActualHelp = getDefault(Help, defaultProps);

it('should render', () => {
  getActualHelp();
});
it('should be a <div />', () => {
  const wrapper = getActualHelp();
  expect(wrapper.is('div.Help')).toBe(true);
});
it('should have 1 <List />', () => {
  const wrapper = getActualHelp();
  expect(wrapper.find('List').length).toBe(1);
});
it('should have 3 <ListItem />', () => {
  const wrapper = getActualHelp();
  expect(wrapper.find('ListItem').length).toBe(3);
});
it('should have 3 <Divider />', () => {
  const wrapper = getActualHelp();
  expect(wrapper.find('Divider').length).toBe(3);
});

it('should set its style based on props', () => {
  const wrapper = getActualHelp({
    sidebarExpanded: false,
  });
  expect(wrapper.prop('style').marginLeft).toBe(56);
});

it('should call openExternal when handling first ListItem onClick', () => {
  const wrapper = getActualHelp({
    openExternal(link) {
      expect(link).toBe('https://github.com/mkermani144/wanna/releases/tag/flex-alpha');
    },
  });
  wrapper.find('ListItem').at(0).props().onClick();
});
it('should call openExternal when handling second ListItem onClick', () => {
  const wrapper = getActualHelp({
    openExternal(link) {
      expect(link).toBe('https://github.com/mkermani144/wanna');
    },
  });
  wrapper.find('ListItem').at(1).props().onClick();
});
it('should call openExternal when handling third ListItem onClick', () => {
  const wrapper = getActualHelp({
    openExternal(link) {
      expect(link).toBe('https://github.com/mkermani144/wanna/blob/master/LICENSE.md');
    },
  });
  wrapper.find('ListItem').at(2).props().onClick();
});
