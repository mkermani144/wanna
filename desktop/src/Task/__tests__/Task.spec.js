/* eslint-env mocha, jest */

import getDefault from '../../shared/testUtils';
import Task from '../Task';

const defaultProps = {
  index: 0,
  color: 'red',
  text: 'a cool task',
  estimation: '60',
  due: '',
  repeat: '',
  done: false,
  onRequestDo() {},
  onRequestDelete() {},
  onRequestSnackbar() {},
  onRequestEditTaskOpen() {},
};
const getActualTask = getDefault(Task, defaultProps);

jest.useFakeTimers();

it('should render', () => {
  getActualTask();
});
it('should be a <div />', () => {
  const wrapper = getActualTask();
  expect(wrapper.is('div.Task')).toBe(true);
});
it('should have a text <div />', () => {
  const wrapper = getActualTask();
  expect(wrapper.find('div.text').length).toBe(1);
});
it('should have a <Estimation />', () => {
  const wrapper = getActualTask();
  expect(wrapper.find('Estimation').length).toBe(1);
});
it('should have a <DueDate />', () => {
  const wrapper = getActualTask();
  expect(wrapper.find('DueDate').length).toBe(1);
});
it('should have a <Repeat />', () => {
  const wrapper = getActualTask();
  expect(wrapper.find('Repeat').length).toBe(1);
});
it('should have a <Actions />', () => {
  const wrapper = getActualTask();
  expect(wrapper.find('Actions').length).toBe(1);
});

it('should set its class based on props', () => {
  const wrapper = getActualTask({ done: true });
  expect(wrapper.prop('className').includes('done')).toBe(true);
});
it('should set circle color based on props', () => {
  const wrapper = getActualTask({ color: 'blue' });
  expect(wrapper.find('Circle').prop('color')).toBe('blue');
});
it('should set text div text based on props', () => {
  const wrapper = getActualTask({ text: 'a cooler idea' });
  expect(wrapper.find('div.text').text()).toBe('a cooler idea');
});
it('should set estimation estimation based on props', () => {
  const wrapper = getActualTask({ estimation: '30' });
  expect(wrapper.find('Estimation').prop('estimation')).toBe('30');
});
it('should set due date due based on props', () => {
  const wrapper = getActualTask({ due: 'tomorrow' });
  expect(wrapper.find('DueDate').prop('due')).toBe('tomorrow');
});
it('should set repeat repeat based on props', () => {
  const wrapper = getActualTask({ repeat: '5' });
  expect(wrapper.find('Repeat').prop('repeat')).toBe('5');
});
it('should set actions done based on props', () => {
  const wrapper = getActualTask({ done: true });
  expect(wrapper.find('Actions').prop('done')).toBe(true);
});

it('should call onRequestDelete when handling delete request', () => {
  const wrapper = getActualTask({
    index: 3,
    onRequestDelete(index) {
      expect(index).toBe(3);
    },
  });
  wrapper.find('Actions').props().onRequestDelete();
  jest.runAllTimers();
});
it('should call onRequestSnackbar when handling delete request', () => {
  const wrapper = getActualTask({
    onRequestSnackbar(message) {
      expect(message).toBe('Task deleted');
    },
  });
  wrapper.find('Actions').props().onRequestDelete();
  jest.runAllTimers();
});
it('should call onRequestDo when handling do request', () => {
  const wrapper = getActualTask({
    index: 3,
    onRequestDo(index) {
      expect(index).toBe(3);
    },
  });
  wrapper.find('Actions').props().onRequestDo();
  jest.runAllTimers();
});
it('should call onRequestSnackbar when handling do request', () => {
  const wrapper = getActualTask({
    onRequestSnackbar(message) {
      expect(message).toBe('Task done');
    },
  });
  wrapper.find('Actions').props().onRequestDo();
  jest.runAllTimers();
});
it('should call onRequestEditTaskOpen when handling open edit dialog request', () => {
  const wrapper = getActualTask({
    index: 3,
    onRequestEditTaskOpen(index) {
      expect(index).toBe(3);
    },
  });
  wrapper.find('Actions').props().onRequestEditDialogOpen();
  jest.runAllTimers();
});

it('should set its class based on state', () => {
  const wrapper = getActualTask();
  wrapper.find('Actions').props().onRequestDelete();
  expect(wrapper.props().className.includes('will-be-deleted')).toBe(true);
});
