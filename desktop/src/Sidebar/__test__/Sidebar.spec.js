/* eslint-env mocha, jest */

import React from 'react';
import { shallow } from 'enzyme';

import Sidebar from '../Sidebar';

const defaultProps = {
  expanded: true,
  currentTab: 'tasks',
  changeTab() {},
};

const getActual = props => shallow(
  <Sidebar {...Object.assign({}, defaultProps, props)} />,
);

it('should render', () => {
  getActual();
});
it('should be a <Drawer />', () => {
  const sidebar = getActual();
  expect(sidebar.is('Drawer')).toBe(true);
});
it('should have 4 <ListItem />', () => {
  const sidebar = getActual();
  expect(sidebar.find('ListItem').length).toBe(4);
});

it('should set drawer width based on props', () => {
  const sidebar = getActual({
    expanded: false,
  });
  expect(sidebar.props().width).toBe(56);
});
it('should highlight ideas tab if current tab is ideas', () => {
  const sidebar = getActual({
    currentTab: 'ideas',
  });
  expect(sidebar.find('ListItem').at(1).prop('style')).not.toBeNull();
});
it('should highlight settings tab if current tab is settings', () => {
  const sidebar = getActual({
    currentTab: 'settings',
  });
  expect(sidebar.find('ListItem').at(2).prop('style')).not.toBeNull();
});
it('should highlight help tab if current tab is help', () => {
  const sidebar = getActual({
    currentTab: 'help',
  });
  expect(sidebar.find('ListItem').at(3).prop('style')).not.toBeNull();
});

it('should call changeTab when clicking on tasks tab', () => {
  let a = '';
  const sidebar = getActual({
    changeTab(tab) {
      a = tab;
    },
  });
  sidebar.find('ListItem').at(0).simulate('click');
  expect(a).toBe('tasks');
});
it('should call changeTab when clicking on ideas tab', () => {
  let a = '';
  const sidebar = getActual({
    changeTab(tab) {
      a = tab;
    },
  });
  sidebar.find('ListItem').at(1).simulate('click');
  expect(a).toBe('ideas');
});
it('should call changeTab when clicking on settings tab', () => {
  let a = '';
  const sidebar = getActual({
    changeTab(tab) {
      a = tab;
    },
  });
  sidebar.find('ListItem').at(2).simulate('click');
  expect(a).toBe('settings');
});
it('should call changeTab when clicking on help tab', () => {
  let a = '';
  const sidebar = getActual({
    changeTab(tab) {
      a = tab;
    },
  });
  sidebar.find('ListItem').at(3).simulate('click');
  expect(a).toBe('help');
});
