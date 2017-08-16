/* eslint-env mocha, jest */

import React from 'react';
import { shallow } from 'enzyme';

import FirstDayOfWeekDialog from '../FirstDayOfWeekDialog';

const defaultProps = {
  open: false,
  firstDayOfWeek: 0,
  onRequestClose() {},
};

const getActual = props => shallow(
  <FirstDayOfWeekDialog {...Object.assign({}, defaultProps, props)} />,
);

jest.useFakeTimers();

it('should render', () => {
  getActual();
});
it('should be a <Dialog />', () => {
  const firstDayofWeekDialog = getActual();
  expect(firstDayofWeekDialog.is('Dialog')).toEqual(true);
});
it('should have 3 <RadioButton />', () => {
  const firstDayofWeekDialog = getActual();
  expect(firstDayofWeekDialog.find('RadioButton').length).toEqual(3);
});
it('should set dialog open based on props', () => {
  const firstDayofWeekDialog = getActual({ open: true });
  expect(firstDayofWeekDialog.find('Dialog').prop('open')).toEqual(true);
});
it('should set radio button group defaultSelected based on props', () => {
  const firstDayofWeekDialog = getActual({ firstDayOfWeek: 6 });
  expect(firstDayofWeekDialog.find('RadioButtonGroup').prop('defaultSelected')).toEqual('6');
});
it('should call onRequestClose when handling close request in dialog', () => {
  let a = 0;
  const firstDayofWeekDialog = getActual({
    firstDayOfWeek: 6,
    onRequestClose(calendarSystem) {
      a = calendarSystem;
    },
  });
  firstDayofWeekDialog.find('Dialog').props().onRequestClose();
  expect(a).toEqual(6);
});
it('should call onRequestClose when handling close request in flat button', () => {
  let a = 0;
  const firstDayofWeekDialog = getActual({
    firstDayOfWeek: 6,
    onRequestClose(calendarSystem) {
      a = calendarSystem;
    },
  });
  firstDayofWeekDialog.find('Dialog').prop('actions')[0].props.onTouchTap();
  expect(a).toEqual(6);
});
it('should call onRequestClose when handling close request in radio button group', () => {
  let a = 0;
  const firstDayofWeekDialog = getActual({
    firstDayOfWeek: 6,
    onRequestClose(calendarSystem) {
      a = calendarSystem;
    },
  });
  firstDayofWeekDialog.find('RadioButtonGroup').props().onChange(6);
  setTimeout(() => {
    expect(a).toEqual(6);
  }, 300);
});
