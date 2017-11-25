/* eslint-env mocha, jest */

import getActualComponentFactory from '../../lib/testUtils';
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
const getActualTaskList = getActualComponentFactory(TaskList, defaultProps);

it('should render', () => {
  getActualTaskList();
});
it('should be a div', () => {
  const wrapper = getActualTaskList();
  expect(wrapper.is('div.TaskList')).toBe(true);
});
it('should have 8 CSSTransitionGroup', () => {
  const wrapper = getActualTaskList();
  expect(wrapper.find('CSSTransitionGroup').length).toBe(8);
});
it('should have 4 Task', () => {
  const wrapper = getActualTaskList();
  expect(wrapper.find('Task').length).toBe(4);
});
it('should have 4 Subheader', () => {
  const wrapper = getActualTaskList();
  expect(wrapper.find('Subheader').length).toBe(4);
});
it('should have 4 Divider', () => {
  const wrapper = getActualTaskList();
  expect(wrapper.find('Divider').length).toBe(4);
});
it('should have 2 EditTaskDialog', () => {
  const wrapper = getActualTaskList();
  expect(wrapper.find('EditTaskDialog').length).toBe(1);
});
it('should have 2 Snackbar', () => {
  const wrapper = getActualTaskList();
  expect(wrapper.find('Snackbar').length).toBe(1);
});

it('should have 0 Task if tasks is empty', () => {
  const wrapper = getActualTaskList({
    tasks: [],
  });
  expect(wrapper.find('Task').length).toBe(0);
});
it('should have 0 Divider if tasks is empty', () => {
  const wrapper = getActualTaskList({
    tasks: [],
  });
  expect(wrapper.find('Divider').length).toBe(0);
});
it('should have 0 EditTaskDialog if tasks is empty', () => {
  const wrapper = getActualTaskList({
    tasks: [],
  });
  expect(wrapper.find('EditTaskDialog').length).toBe(0);
});
it('should be a div if tasks is empty', () => {
  const wrapper = getActualTaskList({
    tasks: [],
  });
  expect(wrapper.is('div.tasks-empty-state')).toBe(true);
});
it('should have 1 Snackbar if tasks is empty', () => {
  const wrapper = getActualTaskList({
    tasks: [],
  });
  expect(wrapper.find('Snackbar').length).toBe(1);
});

it('should set left margin style based on props', () => {
  const wrapper = getActualTaskList({
    sidebarExpanded: false,
  });
  expect(wrapper.prop('style').marginLeft).toBe(56);
});
it('should set left margin style based on props if tasks is empty', () => {
  const wrapper = getActualTaskList({
    sidebarExpanded: false,
    tasks: [],
  });
  expect(wrapper.prop('style').marginLeft).toBe(56);
});
it('should not show not-yet tasks if showNotYetTasks is false', () => {
  const wrapper = getActualTaskList({
    showNotYetTasks: false,
  });
  expect(wrapper.find('Subheader').length).toBe(3);
  expect(wrapper.find('Divider').length).toBe(3);
  expect(wrapper.find('Task').length).toBe(3);
});

it('should call editTask inside EditTaskDialog onRequestEdit', () => {
  const wrapper = getActualTaskList({
    editTask(index, { task }) {
      expect(task).toBe('a cool edited task');
    },
  });
  wrapper.find('EditTaskDialog').props().onRequestEdit({ task: 'a cool edited task' });
});
it('should call deleteTask inside Task onRequestDelete', () => {
  const wrapper = getActualTaskList({
    deleteTask(index) {
      expect(index).toBe(2);
    },
  });
  wrapper.find('Task').at(0).props().onRequestDelete(2);
});
it('should call doTask inside Task onRequestDo', () => {
  const wrapper = getActualTaskList({
    doTask(index) {
      expect(index).toBe(2);
    },
  });
  wrapper.find('Task').at(0).props().onRequestDo(2);
});
it('should call raiseFab inside Task onRequestSnackbar', (done) => {
  const wrapper = getActualTaskList({
    raiseFab() {
      done();
    },
  });
  wrapper.find('Task').at(0).props().onRequestSnackbar();
});
it('should call lowerFab inside Snackbar onRequestClose', (done) => {
  const wrapper = getActualTaskList({
    lowerFab() {
      done();
    },
  });
  wrapper.find('Snackbar').props().onRequestClose();
});
it('should call undo inside Snackbar onActionTouchTap', (done) => {
  const wrapper = getActualTaskList({
    undo() {
      done();
    },
  });
  wrapper.find('Snackbar').props().onActionTouchTap();
});

it('should set EditTaskDialog open based on state', () => {
  const wrapper = getActualTaskList();
  wrapper.find('Task').at(0).props().onRequestEditTaskOpen();
  expect(wrapper.find('EditTaskDialog').prop('open')).toBe(true);
});
it('should set EditTaskDialog task based on state', () => {
  const wrapper = getActualTaskList();
  wrapper.find('Task').at(0).props().onRequestEditTaskOpen(1);
  expect(wrapper.find('EditTaskDialog').prop('task')).toBe('an open task');
});
it('should set Snackbar open based on state', () => {
  const wrapper = getActualTaskList();
  wrapper.find('Task').at(0).props().onRequestSnackbar();
  expect(wrapper.find('Snackbar').prop('open')).toBe(true);
});
it('should set Snackbar message based on state', () => {
  const wrapper = getActualTaskList();
  wrapper.find('Task').at(0).props().onRequestSnackbar('a cool message');
  expect(wrapper.find('Snackbar').prop('message')).toBe('a cool message');
});
