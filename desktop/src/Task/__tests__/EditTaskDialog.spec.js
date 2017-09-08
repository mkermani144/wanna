/* eslint-env mocha, jest */

import getActualComponentFactory from '../../lib/testUtils';
import EditTaskDialog from '../EditTaskDialog';

const defaultProps = {
  open: false,
  task: '',
  onRequestClose() {},
  onRequestEdit() {},
};
const getActualDialog = getActualComponentFactory(EditTaskDialog, defaultProps);

it('should render', () => {
  getActualDialog();
});
it('should be a div', () => {
  const wrapper = getActualDialog();
  expect(wrapper.is('div.EditTaskDialog')).toBe(true);
});
it('should have 1 Dialog', () => {
  const wrapper = getActualDialog();
  expect(wrapper.find('Dialog').length).toBe(1);
});
it('should set Dialog open based on props', () => {
  const wrapper = getActualDialog({ open: true });
  expect(wrapper.find('Dialog').prop('open')).toBe(true);
});
it('should set TextField defaultValue based on props', () => {
  const wrapper = getActualDialog({
    task: 'a cool task',
  });
  expect(wrapper.find('TextField').prop('defaultValue')).toBe('a cool task');
});
it('should call onRequestClose inside close FlatButton onTouchTap', (done) => {
  const wrapper = getActualDialog({
    onRequestClose() {
      done();
    },
  });
  wrapper.find('Dialog').prop('actions')[1].props.onTouchTap();
});
it('should call onRequestEdit inside edit FlatButton onTouchTap', (done) => {
  const wrapper = getActualDialog({
    onRequestEdit() {
      done();
    },
  });
  wrapper.find('Dialog').prop('actions')[0].props.onTouchTap();
});

it('should set FlatButton disabled based on state', () => {
  const wrapper = getActualDialog();
  wrapper.find('TextField').props().onChange({ target: { value: 'a cool task' } });
  expect(wrapper.find('Dialog').prop('actions')[0].props.disabled).toBe(false);
});
