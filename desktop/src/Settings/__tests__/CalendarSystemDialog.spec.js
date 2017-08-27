/* eslint-env mocha, jest */

import getDefault from '../../shared/testUtils';
import CalendarSystemDialog from '../CalendarSystemDialog';

const defaultProps = {
  open: false,
  calendarSystem: 'en-US',
  onRequestClose() {},
};
const getActualDialog = getDefault(CalendarSystemDialog, defaultProps);

jest.useFakeTimers();

it('should render', () => {
  getActualDialog();
});
it('should be a <Dialog />', () => {
  const wrapper = getActualDialog();
  expect(wrapper.is('Dialog')).toBe(true);
});
it('should have 2 <RadioButton />', () => {
  const wrapper = getActualDialog();
  expect(wrapper.find('RadioButton').length).toBe(2);
});
it('should set dialog open based on props', () => {
  const wrapper = getActualDialog({ open: true });
  expect(wrapper.find('Dialog').prop('open')).toBe(true);
});
it('should set radio button group defaultSelected based on props', () => {
  const wrapper = getActualDialog({ calendarSystem: 'fa-IR' });
  expect(wrapper.find('RadioButtonGroup').prop('defaultSelected')).toBe('fa-IR');
});
it('should call onRequestClose when handling close request in dialog', () => {
  let a = 0;
  const wrapper = getActualDialog({
    calendarSystem: 'fa-IR',
    onRequestClose(calendarSystem) {
      a = calendarSystem;
    },
  });
  wrapper.find('Dialog').props().onRequestClose();
  expect(a).toBe('fa-IR');
});
it('should call onRequestClose when handling close request in flat button', () => {
  let a = 0;
  const wrapper = getActualDialog({
    calendarSystem: 'fa-IR',
    onRequestClose(calendarSystem) {
      a = calendarSystem;
    },
  });
  wrapper.find('Dialog').prop('actions')[0].props.onTouchTap();
  expect(a).toBe('fa-IR');
});
it('should call onRequestClose when handling close request in radio button group', () => {
  let a = 0;
  const wrapper = getActualDialog({
    calendarSystem: 'fa-IR',
    onRequestClose(calendarSystem) {
      a = calendarSystem;
    },
  });
  wrapper.find('RadioButtonGroup').props().onChange(null, 'fa-IR');
  setTimeout(() => {
    expect(a).toBe('fa-IR');
  }, 300);
  jest.runAllTimers();
});
