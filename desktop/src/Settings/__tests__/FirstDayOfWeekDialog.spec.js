/* eslint-env mocha, jest */

import getDefault from '../../lib/testUtils';
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
  const wrapper = getActualDialog({
    firstDayOfWeek: 6,
    onRequestClose(firstDayOfWeek) {
      expect(firstDayOfWeek).toBe(6);
    },
  });
  wrapper.find('Dialog').props().onRequestClose();
});
it('should call onRequestClose when handling close request in flat button', () => {
  const wrapper = getActualDialog({
    firstDayOfWeek: 6,
    onRequestClose(firstDayOfWeek) {
      expect(firstDayOfWeek).toBe(6);
    },
  });
  wrapper.find('Dialog').prop('actions')[0].props.onTouchTap();
});
it('should call onRequestClose when handling close request in radio button group', () => {
  const wrapper = getActualDialog({
    firstDayOfWeek: 6,
    onRequestClose(firstDayOfWeek) {
      expect(firstDayOfWeek).toBe(6);
    },
  });
  wrapper.find('RadioButtonGroup').props().onChange(null, 6);
  jest.runAllTimers();
});
