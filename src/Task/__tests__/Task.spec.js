/* eslint-env mocha, jest */

import getActualComponentFactory from '../../lib/testUtils';
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
const getActualTask = getActualComponentFactory(Task, defaultProps);

jest.useFakeTimers();

it('should render', () => {
  getActualTask();
});
it('should be a div', () => {
  const wrapper = getActualTask();
  expect(wrapper.is('div.Task')).toBe(true);
});
it('should have 1 text div', () => {
  const wrapper = getActualTask();
  expect(wrapper.find('div.text').length).toBe(1);
});
it('should have 1 Estimation', () => {
  const wrapper = getActualTask();
  expect(wrapper.find('Estimation').length).toBe(1);
});
it('should have 1 DueDate', () => {
  const wrapper = getActualTask();
  expect(wrapper.find('DueDate').length).toBe(1);
});
it('should have 1 Repeat', () => {
  const wrapper = getActualTask();
  expect(wrapper.find('Repeat').length).toBe(1);
});
it('should have 1 Actions', () => {
  const wrapper = getActualTask();
  expect(wrapper.find('Actions').length).toBe(1);
});

it('should set its class based on props', () => {
  const wrapper = getActualTask({ done: true });
  expect(wrapper.prop('className').includes('done')).toBe(true);
});
it('should set Circle color based on props', () => {
  const wrapper = getActualTask({ color: 'blue' });
  expect(wrapper.find('Circle').prop('color')).toBe('blue');
});
it('should set Circle signal based on props', () => {
  const wrapper = getActualTask({ signal: true });
  expect(wrapper.find('Circle').prop('signal')).toBe(true);
});
it('should set text div text based on props', () => {
  const wrapper = getActualTask({ text: 'a cooler idea' });
  expect(wrapper.find('div.text').text()).toBe('a cooler idea');
});
it('should set Estimation estimation based on props', () => {
  const wrapper = getActualTask({ estimation: '30' });
  expect(wrapper.find('Estimation').prop('estimation')).toBe('30');
});
it('should set DueDate due based on props', () => {
  const wrapper = getActualTask({ due: 'tomorrow' });
  expect(wrapper.find('DueDate').prop('due')).toBe('tomorrow');
});
it('should set Repeat repeat based on props', () => {
  const wrapper = getActualTask({ repeat: '5' });
  expect(wrapper.find('Repeat').prop('repeat')).toBe('5');
});
it('should set Actions done based on props', () => {
  const wrapper = getActualTask({ done: true });
  expect(wrapper.find('Actions').prop('done')).toBe(true);
});

it('should call onRequestDelete inside Actions onRequestDelete', () => {
  const wrapper = getActualTask({
    index: 3,
    onRequestDelete(index) {
      expect(index).toBe(3);
    },
  });
  wrapper.find('Actions').props().onRequestDelete();
  jest.runAllTimers();
});
it('should call onRequestSnackbar inside Actions onRequestDelete', () => {
  const wrapper = getActualTask({
    onRequestSnackbar(message) {
      expect(message).toBe('Task deleted');
    },
  });
  wrapper.find('Actions').props().onRequestDelete();
  jest.runAllTimers();
});
it('should call onRequestDo inside Actions onRequestDo', () => {
  const wrapper = getActualTask({
    index: 3,
    onRequestDo(index) {
      expect(index).toBe(3);
    },
  });
  wrapper.find('Actions').props().onRequestDo();
  jest.runAllTimers();
});
it('should call onRequestSnackbar inside Actions onRequestDo', () => {
  const wrapper = getActualTask({
    onRequestSnackbar(message) {
      expect(message).toBe('Task done');
    },
  });
  wrapper.find('Actions').props().onRequestDo();
  jest.runAllTimers();
});
it('should call onRequestEditTaskOpen inside Actions onRequestEditDialogOpen', () => {
  const wrapper = getActualTask({
    index: 3,
    onRequestEditTaskOpen(index) {
      expect(index).toBe(3);
    },
  });
  wrapper.find('Actions').props().onRequestEditDialogOpen();
  jest.runAllTimers();
});

it('should set its class to will-be-deleted based on state', () => {
  const wrapper = getActualTask();
  wrapper.find('Actions').props().onRequestDelete();
  expect(wrapper.props().className.includes('will-be-deleted')).toBe(true);
});
it('should set its class to done based on state', () => {
  const wrapper = getActualTask();
  wrapper.find('Actions').props().onRequestDo();
  expect(wrapper.props().className.includes('done')).toBe(true);
});
it('should remove its done class based on state', () => {
  const wrapper = getActualTask({
    repeat: '5',
  });
  wrapper.find('Actions').props().onRequestDo();
  jest.runAllTimers();
  expect(wrapper.props().className.includes('done')).toBe(false);
});
