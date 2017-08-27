/* eslint-env mocha, jest */

import getDefault from '../../shared/testUtils';
import FirstDayOfWeekDialog from '../FirstDayOfWeekDialog';

const defaultProps = {
  open: false,
  firstDayOfWeek: 0,
  onRequestClose() {},
};
const getActualDialog = getDefault(FirstDayOfWeekDialog, defaultProps);

jest.useFakeTimers();

it('should render', () => {
  getActualDialog();
});
it('should be a <Dialog />', () => {
  const wrapper = getActualDialog();
  expect(wrapper.is('Dialog')).toBe(true);
});
it('should have 3 <RadioButton />', () => {
  const wrapper = getActualDialog();
  expect(wrapper.find('RadioButton').length).toBe(3);
});
it('should set dialog open based on props', () => {
  const wrapper = getActualDialog({ open: true });
  expect(wrapper.find('Dialog').prop('open')).toBe(true);
});
it('should set radio button group defaultSelected based on props', () => {
  const wrapper = getActualDialog({ firstDayOfWeek: 6 });
  expect(wrapper.find('RadioButtonGroup').prop('defaultSelected')).toBe('6');
});
it('should call onRequestClose when handling close request in dialog', () => {
  let a = 0;
  const wrapper = getActualDialog({
    firstDayOfWeek: 6,
    onRequestClose(calendarSystem) {
      a = calendarSystem;
    },
  });
  wrapper.find('Dialog').props().onRequestClose();
  expect(a).toBe(6);
});
it('should call onRequestClose when handling close request in flat button', () => {
  let a = 0;
  const wrapper = getActualDialog({
    firstDayOfWeek: 6,
    onRequestClose(calendarSystem) {
      a = calendarSystem;
    },
  });
  wrapper.find('Dialog').prop('actions')[0].props.onTouchTap();
  expect(a).toBe(6);
});
it('should call onRequestClose when handling close request in radio button group', () => {
  let a = 0;
  const wrapper = getActualDialog({
    firstDayOfWeek: 6,
    onRequestClose(calendarSystem) {
      a = calendarSystem;
    },
  });
  wrapper.find('RadioButtonGroup').props().onChange(null, 6);
  setTimeout(() => {
    expect(a).toBe(6);
  }, 300);
  jest.runAllTimers();
});
