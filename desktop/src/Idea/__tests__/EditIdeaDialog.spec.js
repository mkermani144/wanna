/* eslint-env mocha, jest */

import getActualComponentFactory from '../../lib/testUtils';
import EditIdeaDialog from '../EditIdeaDialog';

const defaultProps = {
  open: false,
  idea: '',
  onRequestClose() {},
  onRequestEdit() {},
};
const getActualDialog = getActualComponentFactory(EditIdeaDialog, defaultProps);

it('should render', () => {
  getActualDialog();
});
it('should be a Dialog', () => {
  const wrapper = getActualDialog();
  expect(wrapper.is('Dialog')).toBe(true);
});
it('should have 1 Dialog', () => {
  const wrapper = getActualDialog();
  expect(wrapper.find('Dialog').length).toBe(1);
});
it('should set Dialog open based on props', () => {
  const wrapper = getActualDialog({
    open: true,
  });
  expect(wrapper.find('Dialog').prop('open')).toBe(true);
});
it('should set TextField defaultValue based on props', () => {
  const wrapper = getActualDialog({
    idea: 'a cool idea',
  });
  expect(wrapper.find('TextField').prop('defaultValue')).toBe('a cool idea');
});
it('should call onRequestClose inside cancel FlatButton onTouchTap', (done) => {
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
  wrapper.find('TextField').props().onChange({ target: { value: 'a cool idea' } });
  expect(wrapper.find('Dialog').prop('actions')[0].props.disabled).toBe(false);
});
