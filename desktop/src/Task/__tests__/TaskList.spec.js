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

it('should call props.editTask when calling EditTaskDialog onRequestEdit', () => {
  const wrapper = getActualTaskList({
    editTask(index, { task }) {
      expect(task).toBe('a cool edited task');
    },
  });
  wrapper.find('EditTaskDialog').props().onRequestEdit({ task: 'a cool edited task' });
});
it('should call props.deleteTask when calling Task onRequestDelete', () => {
  const wrapper = getActualTaskList({
    deleteTask(index) {
      expect(index).toBe(2);
    },
  });
  wrapper.find('Task').at(0).props().onRequestDelete(2);
});
it('should call props.doTask when calling Task onRequestDo', () => {
  const wrapper = getActualTaskList({
    doTask(index) {
      expect(index).toBe(2);
    },
  });
  wrapper.find('Task').at(0).props().onRequestDo(2);
});
it('should call props.raiseFab when calling Task onRequestSnackbar', (done) => {
  const wrapper = getActualTaskList({
    raiseFab() {
      done();
    },
  });
  wrapper.find('Task').at(0).props().onRequestSnackbar();
});
it('should call props.lowerFab when calling Snackbar onRequestClose', (done) => {
  const wrapper = getActualTaskList({
    lowerFab() {
      done();
    },
  });
  wrapper.find('Snackbar').props().onRequestClose();
});
it('should call props.undo when calling Snackbar onActionTouchTap', (done) => {
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
// it('should set ConvertIdeaDialog open based on state', () => {
//   const wrapper = getActualIdeaList();
//   wrapper.find('Idea').at(0).props().onRequestConvertDialogOpen();
//   expect(wrapper.find('ConvertIdeaDialog').prop('open')).toBe(true);
// });
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
