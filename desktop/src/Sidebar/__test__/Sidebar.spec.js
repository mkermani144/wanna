/* eslint-env mocha, jest */

import getDefault from '../../shared/testUtils';
import Sidebar from '../Sidebar';

const defaultProps = {
  expanded: true,
  currentTab: 'tasks',
  changeTab() {},
};
const getActualSidebar = getDefault(Sidebar, defaultProps);

it('should render', () => {
  getActualSidebar();
});
it('should be a <Drawer />', () => {
  const wrapper = getActualSidebar();
  expect(wrapper.is('Drawer')).toBe(true);
});
it('should have 4 <ListItem />', () => {
  const wrapper = getActualSidebar();
  expect(wrapper.find('ListItem').length).toBe(4);
});

it('should set drawer width based on props', () => {
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

it('should call changeTab when clicking on tasks tab', () => {
  let a = '';
  const wrapper = getActualSidebar({
    changeTab(tab) {
      a = tab;
    },
  });
  wrapper.find('ListItem').at(0).simulate('click');
  expect(a).toBe('tasks');
});
it('should call changeTab when clicking on ideas tab', () => {
  let a = '';
  const wrapper = getActualSidebar({
    changeTab(tab) {
      a = tab;
    },
  });
  wrapper.find('ListItem').at(1).simulate('click');
  expect(a).toBe('ideas');
});
it('should call changeTab when clicking on settings tab', () => {
  let a = '';
  const wrapper = getActualSidebar({
    changeTab(tab) {
      a = tab;
    },
  });
  wrapper.find('ListItem').at(2).simulate('click');
  expect(a).toBe('settings');
});
it('should call changeTab when clicking on help tab', () => {
  let a = '';
  const wrapper = getActualSidebar({
    changeTab(tab) {
      a = tab;
    },
  });
  wrapper.find('ListItem').at(3).simulate('click');
  expect(a).toBe('help');
});
