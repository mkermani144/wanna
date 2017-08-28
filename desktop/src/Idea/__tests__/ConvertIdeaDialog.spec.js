/* eslint-env mocha, jest */

import getDefault from '../../shared/testUtils';
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
it('should call onRequestClose in handling close request', (done) => {
  const wrapper = getActualDialog({
    onRequestClose() {
      done();
    },
  });
  wrapper.instance().handleRequestClose();
});
it('should call onRequestClose in handling finish request', (done) => {
  const wrapper = getActualDialog({
    onRequestClose() {
      done();
    },
  });
  wrapper.instance().handleRequestFinish();
});
it('should call onRequestConvert in handling convert request', (done) => {
  const wrapper = getActualDialog({
    onRequestConvert() {
      done();
    },
  });
  wrapper.instance().handleRequestConvert();
});
it('should call onRequestConvert in handling finish request', (done) => {
  const wrapper = getActualDialog({
    onRequestConvert() {
      done();
    },
  });
  wrapper.instance().handleRequestFinish();
});
it('should call onRequestDelete in handling convert request', (done) => {
  const wrapper = getActualDialog({
    onRequestDelete() {
      done();
    },
  });
  wrapper.instance().handleRequestFinish();
});
