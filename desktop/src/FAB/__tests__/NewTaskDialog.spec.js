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
it('should react to close request', (done) => {
  const wrapper = getActualDialog({
    onRequestClose() {
      done();
    },
  });
  wrapper.instance().props.onRequestClose();
});
it('should react to add request', (done) => {
  const wrapper = getActualDialog({
    onRequestAdd() {
      done();
    },
  });
  wrapper.instance().props.onRequestAdd();
});
