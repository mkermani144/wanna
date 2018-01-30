/* eslint-env mocha, jest */

import getActualComponentFactory from '../../lib/testUtils';
import ConvertIdeaDialog from '../ConvertIdeaDialog';

const defaultProps = {
  open: false,
  calendarSystem: 'en-US',
  firstDayOfWeek: 0,
  onRequestClose() {},
  onRequestConvert() {},
  onRequestDelete() {},
};
const getActualDialog = getActualComponentFactory(ConvertIdeaDialog, defaultProps);

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
it('should set DatePicker locale based on props', () => {
  const wrapper = getActualDialog({
    calendarSystem: 'fa-IR',
  });
  expect(wrapper.find('DatePicker').at(0).prop('locale')).toBe('fa-IR');
});
it('should set DatePicker firstDayOfWeek based on props', () => {
  const wrapper = getActualDialog({
    firstDayOfWeek: 6,
  });
  expect(wrapper.find('DatePicker').at(0).prop('firstDayOfWeek')).toBe(6);
});

it('should call onRequestClose inside cancel FlatButton onClick', (done) => {
  const wrapper = getActualDialog({
    onRequestClose() {
      done();
    },
  });
  wrapper.find('Dialog').prop('actions')[2].props.onClick();
});
it('should call onRequestConvert inside convert FlatButton onClick', (done) => {
  const wrapper = getActualDialog({
    onRequestConvert() {
      done();
    },
  });
  wrapper.find('Dialog').prop('actions')[1].props.onClick();
});
it('should call onRequestDelete inside finish FlatButton onClick', (done) => {
  const wrapper = getActualDialog({
    onRequestDelete() {
      done();
    },
  });
  wrapper.find('Dialog').prop('actions')[0].props.onClick();
});

it('should set FlatButton disabled based on state', () => {
  const wrapper = getActualDialog();
  const now = new Date();
  wrapper.find('TextField').at(0).props().onChange({ target: { value: 'a cool task' } });
  wrapper.find('TextField').at(1).props().onChange({ target: { value: '10' } });
  wrapper.find('DatePicker').at(0).props().onChange(null, now);
  wrapper.find('DatePicker').at(1).props().onChange(null, now);
  wrapper.update();
  expect(wrapper.find('Dialog').prop('actions')[0].props.disabled).toBe(false);
  expect(wrapper.find('Dialog').prop('actions')[1].props.disabled).toBe(false);
});
it('should set task TextField value based on state', () => {
  const wrapper = getActualDialog();
  wrapper.find('TextField').at(0).props().onChange({ target: { value: 'a cool task' } });
  wrapper.update();
  expect(wrapper.find('TextField').at(0).prop('value')).toBe('a cool task');
});
it('should set estimation TextField value based on state', () => {
  const wrapper = getActualDialog();
  wrapper.find('TextField').at(1).props().onChange({ target: { value: '10' } });
  wrapper.update();
  expect(wrapper.find('TextField').at(1).prop('value')).toBe('10');
});
it('should set estimation TextField errorText based on state', () => {
  const wrapper = getActualDialog();
  wrapper.find('TextField').at(1).props().onChange({ target: { value: '10a' } });
  wrapper.update();
  expect(wrapper.find('TextField').at(1).prop('errorText')).not.toBe('');
});
it('should set repetition TextField value based on state', () => {
  const wrapper = getActualDialog();
  wrapper.find('TextField').at(2).props().onChange({ target: { value: '7' } });
  wrapper.update();
  expect(wrapper.find('TextField').at(2).prop('value')).toBe('7');
});
it('should set repetition TextField errorText based on state', () => {
  const wrapper = getActualDialog();
  wrapper.find('TextField').at(2).props().onChange({ target: { value: '7a' } });
  wrapper.update();
  expect(wrapper.find('TextField').at(2).prop('errorText')).not.toBe('');
});
it('should set estimation DropDownMenu value based on state', () => {
  const wrapper = getActualDialog();
  wrapper.find('DropDownMenu').at(0).props().onChange(null, null, '60');
  wrapper.update();
  expect(wrapper.find('DropDownMenu').at(0).prop('value')).toBe('60');
});
it('should set repetition DropDownMenu value based on state', () => {
  const wrapper = getActualDialog();
  wrapper.find('DropDownMenu').at(1).props().onChange(null, null, '7');
  wrapper.update();
  expect(wrapper.find('DropDownMenu').at(1).prop('value')).toBe('7');
});
