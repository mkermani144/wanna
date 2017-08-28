/* eslint-env mocha, jest */

import getDefault from '../../shared/testUtils';
import EditTaskDialog from '../EditTaskDialog';

const defaultProps = {
  open: false,
  task: '',
  onRequestClose() {},
  onRequestEdit() {},
};
const getActualDialog = getDefault(EditTaskDialog, defaultProps);

it('should render', () => {
  getActualDialog();
});
it('should be a <div />', () => {
  const wrapper = getActualDialog();
  expect(wrapper.is('div.EditTaskDialog')).toBe(true);
});
it('should have a <Dialog />', () => {
  const wrapper = getActualDialog();
  expect(wrapper.find('Dialog').length).toBe(1);
});
it('should show/hide <Dialog /> based on props', () => {
  const wrapper = getActualDialog({ open: true });
  expect(wrapper.find('Dialog').prop('open')).toBe(true);
});
it('should set text field default value based on props', () => {
  const wrapper = getActualDialog({
    task: 'a cool task',
  });
  expect(wrapper.find('TextField').prop('defaultValue')).toBe('a cool task');
});
it('should call onRequestClose in handling close request', (done) => {
  const wrapper = getActualDialog({
    onRequestClose() {
      done();
    },
  });
  wrapper.instance().handleRequestClose();
});
it('should call onRequestEdit in handling edit request', (done) => {
  const wrapper = getActualDialog({
    onRequestEdit() {
      done();
    },
  });
  wrapper.instance().handleRequestEdit();
});
