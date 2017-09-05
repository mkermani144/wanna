/* eslint-env mocha, jest */

import getDefault from '../../lib/testUtils';
import ConvertIdeaDialog from '../ConvertIdeaDialog';

const defaultProps = {
  open: false,
  calendarSystem: 'en-US',
  firstDayOfWeek: 0,
  onRequestClose() {},
  onRequestConvert() {},
  onRequestDelete() {},
};
const getActualDialog = getDefault(ConvertIdeaDialog, defaultProps);

it('should render', () => {
  getActualDialog();
});
it('should be a <div />', () => {
  const wrapper = getActualDialog();
  expect(wrapper.is('div.ConvertIdeaDialog')).toBe(true);
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
it('should set date picker calendar system based on props', () => {
  const wrapper = getActualDialog({
    calendarSystem: 'fa-IR',
  });
  expect(wrapper.find('DatePicker').at(0).prop('locale')).toBe('fa-IR');
});
it('should set date picker first day of week based on props', () => {
  const wrapper = getActualDialog({
    firstDayOfWeek: 6,
  });
  expect(wrapper.find('DatePicker').at(0).prop('firstDayOfWeek')).toBe(6);
});

it('should call onRequestClose when clicking cancel FlatButton', (done) => {
  const wrapper = getActualDialog({
    onRequestClose() {
      done();
    },
  });
  wrapper.find('Dialog').prop('actions')[2].props.onTouchTap();
});
it('should call onRequestConvert when clicking convert FlatButton', (done) => {
  const wrapper = getActualDialog({
    onRequestConvert() {
      done();
    },
  });
  wrapper.find('Dialog').prop('actions')[1].props.onTouchTap();
});
it('should call onRequestDelete when clicking finish FlatButton', (done) => {
  const wrapper = getActualDialog({
    onRequestDelete() {
      done();
    },
  });
  wrapper.find('Dialog').prop('actions')[0].props.onTouchTap();
});

it('should set FlatButton disabled based on state', () => {
  const wrapper = getActualDialog();
  const now = new Date();
  wrapper.find('TextField').at(0).props().onChange({ target: { value: 'a cool task' } });
  wrapper.find('TextField').at(1).props().onChange({ target: { value: '10' } });
  wrapper.find('DatePicker').at(0).props().onChange(null, now);
  wrapper.find('DatePicker').at(1).props().onChange(null, now);
  expect(wrapper.find('Dialog').prop('actions')[0].props.disabled).toBe(false);
  expect(wrapper.find('Dialog').prop('actions')[1].props.disabled).toBe(false);
});
it('should set task TextField value based on state', () => {
  const wrapper = getActualDialog();
  wrapper.find('TextField').at(0).props().onChange({ target: { value: 'a cool task' } });
  expect(wrapper.find('TextField').at(0).prop('value')).toBe('a cool task');
});
it('should set estimation TextField value based on state', () => {
  const wrapper = getActualDialog();
  wrapper.find('TextField').at(1).props().onChange({ target: { value: '10' } });
  expect(wrapper.find('TextField').at(1).prop('value')).toBe('10');
});
it('should set estimation TextField errorText based on state', () => {
  const wrapper = getActualDialog();
  wrapper.find('TextField').at(1).props().onChange({ target: { value: '10a' } });
  expect(wrapper.find('TextField').at(1).prop('errorText')).not.toBe('');
});
it('should set repetition TextField value based on state', () => {
  const wrapper = getActualDialog();
  wrapper.find('TextField').at(2).props().onChange({ target: { value: '7' } });
  expect(wrapper.find('TextField').at(2).prop('value')).toBe('7');
});
it('should set repetition TextField errorText based on state', () => {
  const wrapper = getActualDialog();
  wrapper.find('TextField').at(2).props().onChange({ target: { value: '7a' } });
  expect(wrapper.find('TextField').at(2).prop('errorText')).not.toBe('');
});
it('should set estimation DropDownMenu value based on state', () => {
  const wrapper = getActualDialog();
  wrapper.find('DropDownMenu').at(0).props().onChange(null, null, '60');
  expect(wrapper.find('DropDownMenu').at(0).prop('value')).toBe('60');
});
it('should set repetition DropDownMenu value based on state', () => {
  const wrapper = getActualDialog();
  wrapper.find('DropDownMenu').at(1).props().onChange(null, null, '7');
  expect(wrapper.find('DropDownMenu').at(1).prop('value')).toBe('7');
});
