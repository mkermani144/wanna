/* eslint-env mocha, jest */

import getActualComponentFactory from '../../lib/testUtils';
import CalendarSystemDialog from '../CalendarSystemDialog';

const defaultProps = {
  open: false,
  calendarSystem: 'en-US',
  onRequestClose() {},
};
const getActualDialog = getActualComponentFactory(CalendarSystemDialog, defaultProps);

jest.useFakeTimers();

it('should render', () => {
  getActualDialog();
});
it('should be a Dialog', () => {
  const wrapper = getActualDialog();
  expect(wrapper.is('Dialog')).toBe(true);
});
it('should have 2 RadioButton', () => {
  const wrapper = getActualDialog();
  expect(wrapper.find('RadioButton').length).toBe(2);
});
it('should set Dialog open based on props', () => {
  const wrapper = getActualDialog({ open: true });
  expect(wrapper.find('Dialog').prop('open')).toBe(true);
});
it('should set RadioButtonGroup defaultSelected based on props', () => {
  const wrapper = getActualDialog({ calendarSystem: 'fa-IR' });
  expect(wrapper.find('RadioButtonGroup').prop('defaultSelected')).toBe('fa-IR');
});
it('should call onRequestClose inside Dialog onRequestClose', () => {
  const wrapper = getActualDialog({
    calendarSystem: 'fa-IR',
    onRequestClose(calendarSystem) {
      expect(calendarSystem).toBe('fa-IR');
    },
  });
  wrapper.find('Dialog').props().onRequestClose();
});
it('should call onRequestClose inside FlatButton onClick', () => {
  const wrapper = getActualDialog({
    calendarSystem: 'fa-IR',
    onRequestClose(calendarSystem) {
      expect(calendarSystem).toBe('fa-IR');
    },
  });
  wrapper.find('Dialog').prop('actions')[0].props.onClick();
});
it('should call onRequestClose inside RadioButtonGroup onChange', () => {
  const wrapper = getActualDialog({
    calendarSystem: 'fa-IR',
    onRequestClose(calendarSystem) {
      expect(calendarSystem).toBe('fa-IR');
    },
  });
  wrapper.find('RadioButtonGroup').props().onChange(null, 'fa-IR');
  jest.runAllTimers();
});
