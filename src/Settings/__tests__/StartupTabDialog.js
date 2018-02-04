/* eslint-env mocha, jest */

import getActualComponentFactory from '../../lib/testUtils';
import StartupTabDialog from '../StartupTabDialog';

const defaultProps = {
  open: false,
  startupTab: 'tasks',
  onRequestClose() {},
};
const getActualDialog = getActualComponentFactory(StartupTabDialog, defaultProps);

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
  const wrapper = getActualDialog({ startupTab: 'ideas' });
  expect(wrapper.find('RadioButtonGroup').prop('defaultSelected')).toBe('ideas');
});
it('should call onRequestClose inside Dialog onRequestClose', () => {
  const wrapper = getActualDialog({
    startupTab: 'ideas',
    onRequestClose(startupTab) {
      expect(startupTab).toBe('ideas');
    },
  });
  wrapper.find('Dialog').props().onRequestClose();
});
it('should call onRequestClose inside FlatButton onClick', () => {
  const wrapper = getActualDialog({
    startupTab: 'ideas',
    onRequestClose(startupTab) {
      expect(startupTab).toBe('ideas');
    },
  });
  wrapper.find('Dialog').prop('actions')[0].props.onClick();
});
it('should call onRequestClose inside RadioButtonGroup onChange', () => {
  const wrapper = getActualDialog({
    startupTab: 'ideas',
    onRequestClose(startupTab) {
      expect(startupTab).toBe('ideas');
    },
  });
  wrapper.find('RadioButtonGroup').props().onChange(null, 'ideas');
  jest.runAllTimers();
});
