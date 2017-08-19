/* eslint-env mocha, jest */

import React from 'react';
import { shallow } from 'enzyme';

import Task from '../Task';

jest.useFakeTimers();

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

const getActual = props => shallow(
  <Task {...Object.assign({}, defaultProps, props)} />,
);

it('should render', () => {
  getActual();
});
it('should be a <div />', () => {
  const task = getActual();
  expect(task.is('div.Task')).toBe(true);
});
it('should have a text <div />', () => {
  const task = getActual();
  expect(task.find('div.text').length).toBe(1);
});
it('should have a <Estimation />', () => {
  const task = getActual();
  expect(task.find('Estimation').length).toBe(1);
});
it('should have a <DueDate />', () => {
  const task = getActual();
  expect(task.find('DueDate').length).toBe(1);
});
it('should have a <Repeat />', () => {
  const task = getActual();
  expect(task.find('Repeat').length).toBe(1);
});
it('should have a <Actions />', () => {
  const task = getActual();
  expect(task.find('Actions').length).toBe(1);
});

it('should set its class based on props', () => {
  const task = getActual({ done: true });
  expect(task.prop('className').includes('done')).toBe(true);
});
it('should set circle color based on props', () => {
  const task = getActual({ color: 'blue' });
  expect(task.find('Circle').prop('color')).toBe('blue');
});
it('should set text div text based on props', () => {
  const task = getActual({ text: 'a cooler idea' });
  expect(task.find('div.text').text()).toBe('a cooler idea');
});
it('should set estimation estimation based on props', () => {
  const task = getActual({ estimation: '30' });
  expect(task.find('Estimation').prop('estimation')).toBe('30');
});
it('should set due date due based on props', () => {
  const task = getActual({ due: 'tomorrow' });
  expect(task.find('DueDate').prop('due')).toBe('tomorrow');
});
it('should set repeat repeat based on props', () => {
  const task = getActual({ repeat: '5' });
  expect(task.find('Repeat').prop('repeat')).toBe('5');
});
it('should set actions done based on props', () => {
  const task = getActual({ done: true });
  expect(task.find('Actions').prop('done')).toBe(true);
});

it('should call onRequestDelete when handling delete request', () => {
  let a = 0;
  const task = getActual({
    index: 3,
    onRequestDelete(index) {
      a = index;
    },
  });
  task.find('Actions').props().onRequestDelete();
  setTimeout(() => {
    expect(a).toBe(3);
  }, 1000);
  jest.runAllTimers();
});
it('should call onRequestSnackbar when handling delete request', () => {
  let a = '';
  const task = getActual({
    onRequestSnackbar(message) {
      a = message;
    },
  });
  task.find('Actions').props().onRequestDelete();
  setTimeout(() => {
    expect(a).toEqual('Task deleted');
  }, 1000);
  jest.runAllTimers();
});
it('should call onRequestDo when handling do request', () => {
  let a = 0;
  const task = getActual({
    index: 3,
    onRequestDo(index) {
      a = index;
    },
  });
  task.find('Actions').props().onRequestDo();
  setTimeout(() => {
    expect(a).toBe(3);
  }, 1000);
  jest.runAllTimers();
});
it('should call onRequestSnackbar when handling do request', () => {
  let a = '';
  const task = getActual({
    onRequestSnackbar(message) {
      a = message;
    },
  });
  task.find('Actions').props().onRequestDo();
  setTimeout(() => {
    expect(a).toEqual('Task done');
  }, 1000);
  jest.runAllTimers();
});
it('should call onRequestEditTaskOpen when handling open edit dialog request', () => {
  let a = 0;
  const task = getActual({
    index: 3,
    onRequestEditTaskOpen(index) {
      a = index;
    },
  });
  task.find('Actions').props().onRequestEditDialogOpen();
  setTimeout(() => {
    expect(a).toEqual(3);
  }, 1000);
  jest.runAllTimers();
});
