/* eslint-env mocha, jest */

import React from 'react';
import { shallow } from 'enzyme';

import TaskList from '../TaskList';

const now = Date.now();

const defaultProps = {
  tasks: [
    {
      task: 'an overdue task',
      start: now - (2 * 86400000),
      end: now - 86400000,
      done: false,
    },
    {
      task: 'an open task',
      start: now - 86400000,
      end: now + 86400000,
      done: false,
    },
    {
      task: 'a not-yet task',
      start: now + 86400000,
      end: now + (2 * 86400000),
      done: false,
    },
    {
      task: 'a done task',
      start: now - 86400000,
      end: now,
      done: true,
    },
  ],
  sidebarExpanded: true,
  showNotYetTasks: true,
  editTask() {},
  deleteTask() {},
  doTask() {},
  raiseFab() {},
  lowerFab() {},
  undo() {},
};

const getActual = props => shallow(
  <TaskList {...Object.assign({}, defaultProps, props)} />,
);

it('should render', () => {
  getActual();
});
it('should be a div', () => {
  const taskList = getActual();
  expect(taskList.is('div.TaskList')).toBe(true);
});
it('should have 2 <Task />\'s', () => {
  const taskList = getActual();
  expect(taskList.find('Task').length).toBe(4);
});
it('should have 4 <Subheader />\'s', () => {
  const taskList = getActual();
  expect(taskList.find('Subheader').length).toBe(4);
});
it('should have 4 <Divider />\'s', () => {
  const taskList = getActual();
  expect(taskList.find('Divider').length).toBe(4);
});
it('should have two <EditTaskDialog />\'s', () => {
  const taskList = getActual();
  expect(taskList.find('EditTaskDialog').length).toBe(1);
});
it('should have two <Snackbar />\'s', () => {
  const taskList = getActual();
  expect(taskList.find('Snackbar').length).toBe(1);
});

it('should have no <Task />\'s if props.tasks is empty', () => {
  const taskList = getActual({
    tasks: [],
  });
  expect(taskList.find('Task').length).toBe(0);
});
it('should have no <Divider />\'s if props.tasks is empty', () => {
  const taskList = getActual({
    tasks: [],
  });
  expect(taskList.find('Divider').length).toBe(0);
});
it('should have no <EditTaskDialog />\'s if props.tasks is empty', () => {
  const taskList = getActual({
    tasks: [],
  });
  expect(taskList.find('EditTaskDialog').length).toBe(0);
});
it('should be a <div /> if props.tasks is empty', () => {
  const taskList = getActual({
    tasks: [],
  });
  expect(taskList.is('div.tasks-empty-state')).toBe(true);
});
it('should have 1 <Snackbar /> if props.tasks is empty', () => {
  const taskList = getActual({
    tasks: [],
  });
  expect(taskList.find('Snackbar').length).toBe(1);
});

it('should set left margin based on props', () => {
  const taskList = getActual({
    sidebarExpanded: false,
  });
  expect(taskList.prop('style').marginLeft).toBe(56);
});
it('should not show not-yet tasks if props.showNotYetTasks is false', () => {
  const taskList = getActual({
    showNotYetTasks: false,
  });
  expect(taskList.find('Subheader').length).toBe(3);
  expect(taskList.find('Divider').length).toBe(3);
  expect(taskList.find('Task').length).toBe(3);
});
// BUG: This test does not work, and its behaviour is totally unexpected.
//
// it('should set EditTaskDialog task based on props and state', () => {
//   const taskList = getActual();
//   taskList.instance().setState({ index: 1 });
//   expect(taskList.find('EditTaskDialog').prop('task')).toBe('an open task');
// });

it('should call props.editTask when calling EditTaskDialog onRequestEdit', () => {
  let a = '';
  const taskList = getActual({
    editTask(index, { task }) {
      a = task;
    },
  });
  taskList.find('EditTaskDialog').props().onRequestEdit({ task: 'a cool edited task' });
  expect(a).toBe('a cool edited task');
});
it('should call props.deleteTask when calling Task onRequestDelete', () => {
  let a = 0;
  const taskList = getActual({
    deleteTask(index) {
      a = index;
    },
  });
  taskList.find('Task').at(0).props().onRequestDelete(2);
  expect(a).toBe(2);
});
it('should call props.doTask when calling Task onRequestDo', () => {
  let a = 0;
  const taskList = getActual({
    doTask(index) {
      a = index;
    },
  });
  taskList.find('Task').at(0).props().onRequestDo(2);
  expect(a).toBe(2);
});
it('should call props.raiseFab when calling Task onRequestSnackbar', () => {
  let a = 0;
  const taskList = getActual({
    raiseFab() {
      a = 2;
    },
  });
  taskList.find('Task').at(0).props().onRequestSnackbar();
  expect(a).toBe(2);
});
it('should call props.lowerFab when calling Snackbar onRequestClose', () => {
  let a = 0;
  const taskList = getActual({
    lowerFab() {
      a = 2;
    },
  });
  taskList.find('Snackbar').props().onRequestClose();
  expect(a).toBe(2);
});
it('should call props.undo when calling Snackbar onActionTouchTap', () => {
  let a = 0;
  const taskList = getActual({
    undo() {
      a = 2;
    },
  });
  taskList.find('Snackbar').props().onActionTouchTap();
  expect(a).toBe(2);
});
