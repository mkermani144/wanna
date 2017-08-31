/* eslint-env mocha, jest */

import getDefault from '../../shared/testUtils';
import EditIdeaDialog from '../EditIdeaDialog';

const defaultProps = {
  open: false,
  idea: '',
  onRequestClose() {},
  onRequestEdit() {},
};
const getActualDialog = getDefault(EditIdeaDialog, defaultProps);

it('should render', () => {
  getActualDialog();
});
it('should be a <div />', () => {
  const wrapper = getActualDialog();
  expect(wrapper.is('div.EditIdeaDialog')).toBe(true);
});
it('should have a <Dialog />', () => {
  const wrapper = getActualDialog();
  expect(wrapper.find('Dialog').length).toBe(1);
});
it('should show/hide <Dialog /> based on props', () => {
  const wrapper = getActualDialog({
    open: true,
  });
  expect(wrapper.find('Dialog').prop('open')).toBe(true);
});
it('should set text field default value based on props', () => {
  const wrapper = getActualDialog({
    idea: 'a cool idea',
  });
  expect(wrapper.find('TextField').prop('defaultValue')).toBe('a cool idea');
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

it('should set FlatButton disabled based on state', () => {
  const wrapper = getActualDialog();
  wrapper.find('TextField').props().onChange({ target: { value: 'a cool idea' } });
  expect(wrapper.find('Dialog').prop('actions')[0].props.disabled).toBe(false);
});
