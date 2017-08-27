/* eslint-env mocha, jest */

import getDefault from '../../shared/testUtils';
import NewIdeaDialog from '../NewIdeaDialog';

const defaultProps = {
  open: false,
  onRequestClose() {},
  onRequestAdd() {},
};
const getActualDialog = getDefault(NewIdeaDialog, defaultProps);

it('should render', () => {
  getActualDialog();
});
it('should be a <div />', () => {
  const wrapper = getActualDialog();
  expect(wrapper.is('div.NewIdeaDialog')).toBe(true);
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
