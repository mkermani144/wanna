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
  const wrapper = getActualIdeaList({
    editIdea(index, ideaInfo) {
      expect(index).toBe(2);
      expect(ideaInfo.idea).toBe('a cool idea');
    },
  });
  wrapper.find('Idea').at(0).props().onRequestEditDialogOpen(2);
  wrapper.find('EditIdeaDialog').props().onRequestEdit({ idea: 'a cool idea' });
});
it('should call deleteIdea when handling delete idea request', () => {
  const wrapper = getActualIdeaList({
    deleteIdea(index) {
      expect(index).toBe(3);
    },
  });
  wrapper.instance().handleRequestIdeaDelete(3);
});
it('should call deleteIdea when handling convert dialog delete request', () => {
  const wrapper = getActualIdeaList({
    deleteIdea(index) {
      expect(index).toBe(3);
    },
  });
  wrapper.find('Idea').at(0).props().onRequestDelete(3);
});
it('should call addTask when handling convert idea request', () => {
  const wrapper = getActualIdeaList({
    addTask(taskInfo) {
      expect(taskInfo.done).toBe(false);
      expect(taskInfo.start).toBe(0);
      expect(taskInfo.end).toBe(172800000);
      expect(taskInfo.estimation).toBe(120);
      expect(taskInfo.repetition).toBe(0);
      expect(taskInfo.task).toBe('a cool task');
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
});
it('should call raiseFab when handling open snackbar request', (done) => {
  const wrapper = getActualIdeaList({
    raiseFab() {
      done();
    },
  });
  wrapper.instance().handleRequestSnackbarOpen();
});
it('should call lowerFab when handling close snackbar request', (done) => {
  const wrapper = getActualIdeaList({
    lowerFab() {
      done();
    },
  });
  wrapper.instance().handleRequestSnackbarClose();
});
it('should call undo when handling undo request', (done) => {
  const wrapper = getActualIdeaList({
    undo() {
      done();
    },
  });
  wrapper.instance().handleUndo();
});

it('should set EditIdeaDialog open based on state', () => {
  const wrapper = getActualIdeaList();
  wrapper.find('Idea').at(0).props().onRequestEditDialogOpen();
  expect(wrapper.find('EditIdeaDialog').prop('open')).toBe(true);
});
it('should set ConvertIdeaDialog open based on state', () => {
  const wrapper = getActualIdeaList();
  wrapper.find('Idea').at(0).props().onRequestConvertDialogOpen();
  expect(wrapper.find('ConvertIdeaDialog').prop('open')).toBe(true);
});
it('should set Snackbar open based on state', () => {
  const wrapper = getActualIdeaList();
  wrapper.find('Idea').at(0).props().onRequestSnackbar();
  expect(wrapper.find('Snackbar').prop('open')).toBe(true);
});
it('should set Snackbar message based on state', () => {
  const wrapper = getActualIdeaList();
  wrapper.find('Idea').at(0).props().onRequestSnackbar('a cool message');
  expect(wrapper.find('Snackbar').prop('message')).toBe('a cool message');
});