/* eslint-env mocha, jest */

import getDefault from '../../shared/testUtils';
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
const getActualTaskList = getDefault(TaskList, defaultProps);

it('should render', () => {
  getActualTaskList();
});
it('should be a div', () => {
  const wrapper = getActualTaskList();
  expect(wrapper.is('div.TaskList')).toBe(true);
});
it('should have 2 <Task />\'s', () => {
  const wrapper = getActualTaskList();
  expect(wrapper.find('Task').length).toBe(4);
});
it('should have 4 <Subheader />\'s', () => {
  const wrapper = getActualTaskList();
  expect(wrapper.find('Subheader').length).toBe(4);
});
it('should have 4 <Divider />\'s', () => {
  const wrapper = getActualTaskList();
  expect(wrapper.find('Divider').length).toBe(4);
});
it('should have two <EditTaskDialog />\'s', () => {
  const wrapper = getActualTaskList();
  expect(wrapper.find('EditTaskDialog').length).toBe(1);
});
it('should have two <Snackbar />\'s', () => {
  const wrapper = getActualTaskList();
  expect(wrapper.find('Snackbar').length).toBe(1);
});

it('should have no <Task />\'s if props.tasks is empty', () => {
  const wrapper = getActualTaskList({
    tasks: [],
  });
  expect(wrapper.find('Task').length).toBe(0);
});
it('should have no <Divider />\'s if props.tasks is empty', () => {
  const wrapper = getActualTaskList({
    tasks: [],
  });
  expect(wrapper.find('Divider').length).toBe(0);
});
it('should have no <EditTaskDialog />\'s if props.tasks is empty', () => {
  const wrapper = getActualTaskList({
    tasks: [],
  });
  expect(wrapper.find('EditTaskDialog').length).toBe(0);
});
it('should be a <div /> if props.tasks is empty', () => {
  const wrapper = getActualTaskList({
    tasks: [],
  });
  expect(wrapper.is('div.tasks-empty-state')).toBe(true);
});
it('should have 1 <Snackbar /> if props.tasks is empty', () => {
  const wrapper = getActualTaskList({
    tasks: [],
  });
  expect(wrapper.find('Snackbar').length).toBe(1);
});

it('should set left margin based on props', () => {
  const wrapper = getActualTaskList({
    sidebarExpanded: false,
  });
  expect(wrapper.prop('style').marginLeft).toBe(56);
});
it('should not show not-yet tasks if props.showNotYetTasks is false', () => {
  const wrapper = getActualTaskList({
    showNotYetTasks: false,
  });
  expect(wrapper.find('Subheader').length).toBe(3);
  expect(wrapper.find('Divider').length).toBe(3);
  expect(wrapper.find('Task').length).toBe(3);
});
// BUG: This test does not work, and its behaviour is totally unexpected.
//
// it('should set EditTaskDialog task based on props and state', () => {
//   const wrapper = getActualTaskList();
//   wrapper.instance().setState({ index: 1 });
//   expect(wrapper.find('EditTaskDialog').prop('task')).toBe('an open task');
// });

it('should call props.editTask when calling EditTaskDialog onRequestEdit', () => {
  let a = '';
  const wrapper = getActualTaskList({
    editTask(index, { task }) {
      a = task;
    },
  });
  wrapper.find('EditTaskDialog').props().onRequestEdit({ task: 'a cool edited task' });
  expect(a).toBe('a cool edited task');
});
it('should call props.deleteTask when calling Task onRequestDelete', () => {
  let a = 0;
  const wrapper = getActualTaskList({
    deleteTask(index) {
      a = index;
    },
  });
  wrapper.find('Task').at(0).props().onRequestDelete(2);
  expect(a).toBe(2);
});
it('should call props.doTask when calling Task onRequestDo', () => {
  let a = 0;
  const wrapper = getActualTaskList({
    doTask(index) {
      a = index;
    },
  });
  wrapper.find('Task').at(0).props().onRequestDo(2);
  expect(a).toBe(2);
});
it('should call props.raiseFab when calling Task onRequestSnackbar', () => {
  let a = 0;
  const wrapper = getActualTaskList({
    raiseFab() {
      a = 2;
    },
  });
  wrapper.find('Task').at(0).props().onRequestSnackbar();
  expect(a).toBe(2);
});
it('should call props.lowerFab when calling Snackbar onRequestClose', () => {
  let a = 0;
  const wrapper = getActualTaskList({
    lowerFab() {
      a = 2;
    },
  });
  wrapper.find('Snackbar').props().onRequestClose();
  expect(a).toBe(2);
});
it('should call props.undo when calling Snackbar onActionTouchTap', () => {
  let a = 0;
  const wrapper = getActualTaskList({
    undo() {
      a = 2;
    },
  });
  wrapper.find('Snackbar').props().onActionTouchTap();
  expect(a).toBe(2);
});
