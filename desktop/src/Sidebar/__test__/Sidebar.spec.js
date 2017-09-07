/* eslint-env mocha, jest */

import getActualComponentFactory from '../../lib/testUtils';
import Sidebar from '../Sidebar';

const defaultProps = {
  expanded: true,
  currentTab: 'tasks',
  changeTab() {},
};
const getActualSidebar = getActualComponentFactory(Sidebar, defaultProps);

it('should render', () => {
  getActualSidebar();
});
it('should be a Drawer', () => {
  const wrapper = getActualSidebar();
  expect(wrapper.is('Drawer')).toBe(true);
});
it('should have 4 ListItem', () => {
  const wrapper = getActualSidebar();
  expect(wrapper.find('ListItem').length).toBe(4);
});

it('should set its width based on props', () => {
  const wrapper = getActualSidebar({
    expanded: false,
  });
  expect(wrapper.props().width).toBe(56);
});
it('should highlight ideas tab if current tab is ideas', () => {
  const wrapper = getActualSidebar({
    currentTab: 'ideas',
  });
  expect(wrapper.find('ListItem').at(1).prop('style')).not.toBeNull();
});
it('should highlight settings tab if current tab is settings', () => {
  const wrapper = getActualSidebar({
    currentTab: 'settings',
  });
  expect(wrapper.find('ListItem').at(2).prop('style')).not.toBeNull();
});
it('should highlight help tab if current tab is help', () => {
  const wrapper = getActualSidebar({
    currentTab: 'help',
  });
  expect(wrapper.find('ListItem').at(3).prop('style')).not.toBeNull();
});

it('should call changeTab inside tasks ListItem onClick', () => {
  const wrapper = getActualSidebar({
    changeTab(tab) {
      expect(tab).toBe('tasks');
    },
  });
  wrapper.find('ListItem').at(0).props().onClick();
});
it('should call changeTab inside ideas ListItem onClick', () => {
  const wrapper = getActualSidebar({
    changeTab(tab) {
      expect(tab).toBe('ideas');
    },
  });
  wrapper.find('ListItem').at(1).props().onClick();
});
it('should call changeTab inside settings ListItem onClick', () => {
  const wrapper = getActualSidebar({
    changeTab(tab) {
      expect(tab).toBe('settings');
    },
  });
  wrapper.find('ListItem').at(2).props().onClick();
});
it('should call changeTab inside help ListItem onClick', () => {
  const wrapper = getActualSidebar({
    changeTab(tab) {
      expect(tab).toBe('help');
    },
  });
  wrapper.find('ListItem').at(3).props().onClick();
});
