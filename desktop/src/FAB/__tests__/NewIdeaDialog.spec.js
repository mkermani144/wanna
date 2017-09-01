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

it('should call onRequestClose when clicking cancel FlatButton', (done) => {
  const wrapper = getActualDialog({
    onRequestClose() {
      done();
    },
  });
  wrapper.find('Dialog').prop('actions')[2].props.onTouchTap();
});
it('should call onRequestAdd when clicking add FlatButton', (done) => {
  const wrapper = getActualDialog({
    onRequestAdd() {
      done();
    },
  });
  wrapper.find('Dialog').prop('actions')[1].props.onTouchTap();
});

it('should set FlatButton disabled based on state', () => {
  const wrapper = getActualDialog();
  wrapper.find('TextField').props().onChange({ target: { value: 'a cool idea' } });
  expect(wrapper.find('Dialog').prop('actions')[0].props.disabled).toBe(false);
  expect(wrapper.find('Dialog').prop('actions')[1].props.disabled).toBe(false);
});
it('should set TextField value based on state', () => {
  const wrapper = getActualDialog();
  wrapper.find('TextField').props().onChange({ target: { value: 'a cool idea' } });
  expect(wrapper.find('TextField').prop('value')).toBe('a cool idea');
});
