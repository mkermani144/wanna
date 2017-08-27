/* eslint-env mocha, jest */

import getDefault from '../../shared/testUtils';
import NewTaskDialog from '../NewTaskDialog';

const defaultProps = {
  open: false,
  onRequestClose() {},
  onRequestAdd() {},
};
const getActualDialog = getDefault(NewTaskDialog, defaultProps);

it('should render', () => {
  getActualDialog();
});
it('should be a <div />', () => {
  const wrapper = getActualDialog();
  expect(wrapper.is('div.NewTaskDialog')).toBe(true);
});
it('should have a <Dialog />', () => {
  const wrapper = getActualDialog();
  expect(wrapper.find('Dialog').length).toBe(1);
});
it('should react to close request', () => {
  const wrapper = getActualDialog({
    onRequestClose() {
      return 'close requested';
    },
  });
  expect(wrapper.instance().props.onRequestClose()).toBe('close requested');
});
it('should react to add request', () => {
  const wrapper = getActualDialog({
    onRequestAdd() {
      return 'add requested';
    },
  });
  expect(wrapper.instance().props.onRequestAdd()).toBe('add requested');
});
