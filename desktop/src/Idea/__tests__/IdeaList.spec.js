/* eslint-env mocha, jest */

import getDefault from '../../shared/testUtils';
import IdeaList from '../IdeaList';

const defaultProps = {
  ideas: ['a cool idea', 'another cool idea'],
  sidebarExpanded: true,
  calendarSystem: 'en-US',
  firstDayOfWeek: 0,
  editIdea() {},
  deleteIdea() {},
  addTask() {},
  raiseFab() {},
  lowerFab() {},
  undo() {},
};
const getActualIdeaList = getDefault(IdeaList, defaultProps);


it('should render', () => {
  getActualIdeaList();
});
it('should be a <div />', () => {
  const wrapper = getActualIdeaList();
  expect(wrapper.is('div.IdeaList')).toBe(true);
});
it('should have two <Idea />\'s', () => {
  const wrapper = getActualIdeaList();
  expect(wrapper.find('Idea').length).toBe(2);
});
it('should have two <Divider />\'s', () => {
  const wrapper = getActualIdeaList();
  expect(wrapper.find('Divider').length).toBe(2);
});
it('should have two <EditIdeaDialog />\'s', () => {
  const wrapper = getActualIdeaList();
  expect(wrapper.find('EditIdeaDialog').length).toBe(1);
});
it('should have two <ConvertIdeaDialog />\'s', () => {
  const wrapper = getActualIdeaList();
  expect(wrapper.find('ConvertIdeaDialog').length).toBe(1);
});
it('should have two <Snackbar />\'s', () => {
  const wrapper = getActualIdeaList();
  expect(wrapper.find('Snackbar').length).toBe(1);
});

it('should have no <Idea />\'s if props.ideas is empty', () => {
  const wrapper = getActualIdeaList({
    ideas: [],
  });
  expect(wrapper.find('Idea').length).toBe(0);
});
it('should have no <Divider />\'s if props.ideas is empty', () => {
  const wrapper = getActualIdeaList({
    ideas: [],
  });
  expect(wrapper.find('Divider').length).toBe(0);
});
it('should have no <EditIdeaDialog />\'s if props.ideas is empty', () => {
  const wrapper = getActualIdeaList({
    ideas: [],
  });
  expect(wrapper.find('EditIdeaDialog').length).toBe(0);
});
it('should have no <ConvertIdeaDialog />\'s if props.ideas is empty', () => {
  const wrapper = getActualIdeaList({
    ideas: [],
  });
  expect(wrapper.find('ConvertIdeaDialog').length).toBe(0);
});
it('should be a <div /> if props.ideas is empty', () => {
  const wrapper = getActualIdeaList({
    ideas: [],
  });
  expect(wrapper.is('div.ideas-empty-state')).toBe(true);
});
it('should have 1 <Snackbar /> if props.ideas is empty', () => {
  const wrapper = getActualIdeaList({
    ideas: [],
  });
  expect(wrapper.find('Snackbar').length).toBe(1);
});

it('should set left margin based on props', () => {
  const wrapper = getActualIdeaList({
    sidebarExpanded: false,
  });
  expect(wrapper.prop('style').marginLeft).toBe(56);
});
it('should set ConvertIdeaDialog calendarSystem based on props', () => {
  const wrapper = getActualIdeaList({
    calendarSystem: 'fa-IR',
  });
  expect(wrapper.find('ConvertIdeaDialog').prop('calendarSystem')).toBe('fa-IR');
});
it('should set ConvertIdeaDialog firstDayOfWeek based on props', () => {
  const wrapper = getActualIdeaList({
    firstDayOfWeek: 6,
  });
  expect(wrapper.find('ConvertIdeaDialog').prop('firstDayOfWeek')).toBe(6);
});

it('should call editIdea when handling edit idea request', () => {
  let a = 0;
  let b = '';
  const wrapper = getActualIdeaList({
    editIdea(index, ideaInfo) {
      a = index;
      b = ideaInfo.idea;
    },
  });
  wrapper.instance().setState({ index: 2 }, () => {
    wrapper.instance().handleRequestIdeaEdit({ idea: 'a cool idea' });
  });
  expect(a).toBe(2);
  expect(b).toBe('a cool idea');
});
it('should call deleteIdea when handling delete idea request', () => {
  let a = 0;
  const wrapper = getActualIdeaList({
    deleteIdea(index) {
      a = index;
    },
  });
  wrapper.instance().handleRequestIdeaDelete(3);
  expect(a).toBe(3);
});
it('should call deleteIdea when handling convert dialog delete request', () => {
  let a = 0;
  const wrapper = getActualIdeaList({
    deleteIdea(index) {
      a = index;
    },
  });
  wrapper.instance().setState({ index: 2 }, () => {
    wrapper.instance().handleRequestIdeaDelete(3);
  });
  expect(a).toBe(3);
});
it('should call addTask when handling convert idea request', () => {
  let a = 0;
  const wrapper = getActualIdeaList({
    addTask(taskInfo) {
      a = taskInfo;
    },
  });
  wrapper.instance().handleRequestIdeaConvert({
    start: 0,
    end: 86400000,
    estimation: 2,
    estimationValue: 60,
    repetition: 0,
    repetitionValue: 1,
    task: 'a cool task',
  });
  expect(a.done).toBe(false);
  expect(a.start).toBe(0);
  expect(a.end).toBe(172800000);
  expect(a.estimation).toBe(120);
  expect(a.repetition).toBe(0);
  expect(a.task).toBe('a cool task');
});
it('should call raiseFab when handling open snackbar request', () => {
  let a = 0;
  const wrapper = getActualIdeaList({
    raiseFab() {
      a = 3;
    },
  });
  wrapper.instance().handleRequestSnackbarOpen();
  expect(a).toBe(3);
});
it('should call lowerFab when handling close snackbar request', () => {
  let a = 0;
  const wrapper = getActualIdeaList({
    lowerFab() {
      a = 3;
    },
  });
  wrapper.instance().handleRequestSnackbarClose();
  expect(a).toBe(3);
});
it('should call undo when handling undo request', () => {
  let a = 0;
  const wrapper = getActualIdeaList({
    undo() {
      a = 3;
    },
  });
  wrapper.instance().handleUndo();
  expect(a).toBe(3);
});
