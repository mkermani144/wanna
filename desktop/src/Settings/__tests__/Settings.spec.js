/* eslint-env mocha, jest */

import React from 'react';
import { shallow } from 'enzyme';

import Settings from '../Settings';

const defaultProps = {
  sidebarExpanded: true,
  calendarSystem: 'en-US',
  fullscreen: false,
  firstDayOfWeek: 0,
  showNotYetTasks: true,
  toggleNotYet() {},
  toggleFullscreen() {},
  changeCalendarSystem() {},
  changeFirstDayOfWeek() {},
};

const getActual = props => shallow(
  <Settings {...Object.assign({}, defaultProps, props)} />,
);

jest.useFakeTimers();

it('should render', () => {
  getActual();
});
it('should be a <div />', () => {
  const settings = getActual();
  expect(settings.is('div.Settings')).toBe(true);
});
it('should have 4 <ListItem />', () => {
  const settings = getActual();
  expect(settings.find('ListItem').length).toBe(4);
});
it('should have 4 <Divider />', () => {
  const settings = getActual();
  expect(settings.find('Divider').length).toBe(4);
});
it('should have a <CalendarSystemDialog />', () => {
  const settings = getActual();
  expect(settings.find('CalendarSystemDialog').length).toBe(1);
});
it('should have a <FirstDayOfWeekDialog />', () => {
  const settings = getActual();
  expect(settings.find('FirstDayOfWeekDialog').length).toBe(1);
});

it('should set left margin based on props', () => {
  const settings = getActual({
    sidebarExpanded: false,
  });
  expect(settings.prop('style').marginLeft).toBe(56);
});
it('should set calendar system list item secondaryText based on props', () => {
  const settings = getActual({
    calendarSystem: 'fa-IR',
  });
  expect(settings.find('ListItem').at(0).prop('secondaryText')).toBe('fa-IR');
});
it('should set first day of week list item secondaryText based on props', () => {
  const settings = getActual({
    firstDayOfWeek: 6,
  });
  expect(settings.find('ListItem').at(1).prop('secondaryText')).toBe('Saturday');
});
it('should set fullscreen checkbox defaultChecked based on props', () => {
  const settings = getActual({
    fullscreen: true,
  });
  expect(settings.find('ListItem').at(2).prop('leftCheckbox').props.defaultChecked).toBe(true);
});
it('should set show not yet tasks checkbox defaultChecked based on props', () => {
  const settings = getActual({
    showNotYetTasks: false,
  });
  expect(settings.find('ListItem').at(3).prop('leftCheckbox').props.defaultChecked).toBe(false);
});
it('should set calendar system dialog calendarSystem based on props', () => {
  const settings = getActual({
    calendarSystem: 'fa-IR',
  });
  expect(settings.find('CalendarSystemDialog').prop('calendarSystem')).toBe('fa-IR');
});
it('should set first day of week dialog firstDayOfWeek based on props', () => {
  const settings = getActual({
    firstDayOfWeek: 6,
  });
  expect(settings.find('FirstDayOfWeekDialog').prop('firstDayOfWeek')).toBe(6);
});

it('should call toggleNotYet when handling show not yet check', () => {
  let a = 0;
  const settings = getActual({
    toggleNotYet(checked) {
      a = checked;
    },
  });
  settings.find('ListItem').at(3).prop('leftCheckbox').props.onCheck(null, true);
  expect(a).toBe(true);
});
it('should call toggleFullscreen when handling fullscreen check', () => {
  let a = 0;
  const settings = getActual({
    toggleFullscreen(checked) {
      a = checked;
    },
  });
  settings.find('ListItem').at(2).prop('leftCheckbox').props.onCheck(null, true);
  expect(a).toBe(true);
});
it('should call changeCalendarSystem when handling calendar system dialog close request', () => {
  let a = 0;
  const settings = getActual({
    changeCalendarSystem(calendarSystem) {
      a = calendarSystem;
    },
  });
  settings.find('CalendarSystemDialog').props().onRequestClose('fa-IR');
  expect(a).toBe('fa-IR');
});
it('should call changeCalendarSystem when handling first day of week dialog close request', () => {
  let a = 0;
  const settings = getActual({
    changeFirstDayOfWeek(firstDayOfWeek) {
      a = firstDayOfWeek;
    },
  });
  settings.find('FirstDayOfWeekDialog').props().onRequestClose(6);
  expect(a).toBe(6);
});
