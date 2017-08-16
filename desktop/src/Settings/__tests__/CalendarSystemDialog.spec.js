/* eslint-env mocha, jest */

import React from 'react';
import { shallow } from 'enzyme';

import CalendarSystemDialog from '../CalendarSystemDialog';

const defaultProps = {
  open: false,
  calendarSystem: 'en-US',
  onRequestClose() {},
};

const getActual = props => shallow(
  <CalendarSystemDialog {...Object.assign({}, defaultProps, props)} />,
);

jest.useFakeTimers();

it('should render', () => {
  getActual();
});
it('should be a <Dialog />', () => {
  const calendarSystemDialog = getActual();
  expect(calendarSystemDialog.is('Dialog')).toEqual(true);
});
it('should have 2 <RadioButton />', () => {
  const calendarSystemDialog = getActual();
  expect(calendarSystemDialog.find('RadioButton').length).toEqual(2);
});
it('should set dialog open based on props', () => {
  const calendarSystemDialog = getActual({ open: true });
  expect(calendarSystemDialog.find('Dialog').prop('open')).toEqual(true);
});
it('should set radio button group defaultSelected based on props', () => {
  const calendarSystemDialog = getActual({ calendarSystem: 'fa-IR' });
  expect(calendarSystemDialog.find('RadioButtonGroup').prop('defaultSelected')).toEqual('fa-IR');
});
it('should call onRequestClose when handling close request in dialog', () => {
  let a = 0;
  const calendarSystemDialog = getActual({
    calendarSystem: 'fa-IR',
    onRequestClose(calendarSystem) {
      a = calendarSystem;
    },
  });
  calendarSystemDialog.find('Dialog').props().onRequestClose();
  expect(a).toEqual('fa-IR');
});
it('should call onRequestClose when handling close request in flat button', () => {
  let a = 0;
  const calendarSystemDialog = getActual({
    calendarSystem: 'fa-IR',
    onRequestClose(calendarSystem) {
      a = calendarSystem;
    },
  });
  calendarSystemDialog.find('Dialog').prop('actions')[0].props.onTouchTap();
  expect(a).toEqual('fa-IR');
});
it('should call onRequestClose when handling close request in radio button group', () => {
  let a = 0;
  const calendarSystemDialog = getActual({
    calendarSystem: 'fa-IR',
    onRequestClose(calendarSystem) {
      a = calendarSystem;
    },
  });
  calendarSystemDialog.find('RadioButtonGroup').props().onChange('fa-IR');
  setTimeout(() => {
    expect(a).toEqual('fa-IR');
  }, 300);
});
