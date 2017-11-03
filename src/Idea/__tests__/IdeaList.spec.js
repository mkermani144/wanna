/* eslint-env mocha, jest */

import getActualComponentFactory from '../../lib/testUtils';
import IdeaList from '../IdeaList';

const defaultProps = {
  ideas: [
    {
      idea: 'a cool idea',
    },
    {
      idea: 'another cool idea',
    },
  ],
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
const getActualIdeaList = getActualComponentFactory(IdeaList, defaultProps);


it('should render', () => {
  getActualIdeaList();
});
it('should be a div', () => {
  const wrapper = getActualIdeaList();
  expect(wrapper.is('div.IdeaList')).toBe(true);
});
it('should have 2 Idea', () => {
  const wrapper = getActualIdeaList();
  expect(wrapper.find('Idea').length).toBe(2);
});
it('should have 2 Divider', () => {
  const wrapper = getActualIdeaList();
  expect(wrapper.find('Divider').length).toBe(2);
});
it('should have 2 EditIdeaDialog', () => {
  const wrapper = getActualIdeaList();
  expect(wrapper.find('EditIdeaDialog').length).toBe(1);
});
it('should have 2 ConvertIdeaDialog', () => {
  const wrapper = getActualIdeaList();
  expect(wrapper.find('ConvertIdeaDialog').length).toBe(1);
});
it('should have 2 Snackbar', () => {
  const wrapper = getActualIdeaList();
  expect(wrapper.find('Snackbar').length).toBe(1);
});

it('should have 0 Idea if ideas is empty', () => {
  const wrapper = getActualIdeaList({
    ideas: [],
  });
  expect(wrapper.find('Idea').length).toBe(0);
});
it('should have 0 Divider if ideas is empty', () => {
  const wrapper = getActualIdeaList({
    ideas: [],
  });
  expect(wrapper.find('Divider').length).toBe(0);
});
it('should have 0 EditIdeaDialog if ideas is empty', () => {
  const wrapper = getActualIdeaList({
    ideas: [],
  });
  expect(wrapper.find('EditIdeaDialog').length).toBe(0);
});
it('should have 0 ConvertIdeaDialog if ideas is empty', () => {
  const wrapper = getActualIdeaList({
    ideas: [],
  });
  expect(wrapper.find('ConvertIdeaDialog').length).toBe(0);
});
it('should be a div if ideas is empty', () => {
  const wrapper = getActualIdeaList({
    ideas: [],
  });
  expect(wrapper.is('div.ideas-empty-state')).toBe(true);
});
it('should have 1 Snackbar if ideas is empty', () => {
  const wrapper = getActualIdeaList({
    ideas: [],
  });
  expect(wrapper.find('Snackbar').length).toBe(1);
});

it('should set left margin style based on props', () => {
  const wrapper = getActualIdeaList({
    sidebarExpanded: false,
  });
  expect(wrapper.prop('style').marginLeft).toBe(56);
});
it('should set left margin style based on props if idea is empty', () => {
  const wrapper = getActualIdeaList({
    sidebarExpanded: false,
    ideas: [],
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

it('should call editIdea inside EditIdeaDialog onRequestEdit', () => {
  const wrapper = getActualIdeaList({
    editIdea(index, ideaInfo) {
      expect(index).toBe(2);
      expect(ideaInfo.idea).toBe('a cool idea');
    },
  });
  wrapper.find('Idea').at(0).props().onRequestEditDialogOpen(2);
  wrapper.find('EditIdeaDialog').props().onRequestEdit({ idea: 'a cool idea' });
});
it('should call deleteIdea inside Idea onRequestDelete', () => {
  const wrapper = getActualIdeaList({
    deleteIdea(index) {
      expect(index).toBe(3);
    },
  });
  wrapper.find('Idea').at(0).props().onRequestDelete(3);
});
it('should call deleteIdea inside ConvertIdeaDialog onRequestDelete', () => {
  const wrapper = getActualIdeaList({
    deleteIdea(index) {
      expect(index).toBe(3);
    },
  });
  wrapper.find('Idea').at(0).props().onRequestConvertDialogOpen(3);
  wrapper.find('ConvertIdeaDialog').props().onRequestDelete(3);
});
it('should call addTask inside ConvertIdeaDialog onRequestConvert', () => {
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
  wrapper.find('ConvertIdeaDialog').props().onRequestConvert({
    start: 0,
    end: 86400000,
    estimation: 2,
    estimationValue: 60,
    repetition: 0,
    repetitionValue: 1,
    task: 'a cool task',
  });
});
it('should call raiseFab inside Idea onRequestSnackbar', (done) => {
  const wrapper = getActualIdeaList({
    raiseFab() {
      done();
    },
  });
  wrapper.find('Idea').at(0).props().onRequestSnackbar();
});
it('should call lowerFab inside Snackbar onRequestClose', (done) => {
  const wrapper = getActualIdeaList({
    lowerFab() {
      done();
    },
  });
  wrapper.find('Snackbar').props().onRequestClose();
});
it('should call undo inside Snackbar onActionTouchTap', (done) => {
  const wrapper = getActualIdeaList({
    undo() {
      done();
    },
  });
  wrapper.find('Snackbar').props().onActionTouchTap();
});

it('should set EditIdeaDialog open based on state', () => {
  const wrapper = getActualIdeaList();
  wrapper.find('Idea').at(0).props().onRequestEditDialogOpen(0);
  expect(wrapper.find('EditIdeaDialog').prop('open')).toBe(true);
});
it('should set EditIdeaDialog idea based on state', () => {
  const wrapper = getActualIdeaList();
  wrapper.find('Idea').at(0).props().onRequestEditDialogOpen(0);
  expect(wrapper.find('EditIdeaDialog').prop('idea')).toBe('a cool idea');
});
it('should set ConvertIdeaDialog open to true based on state', () => {
  const wrapper = getActualIdeaList();
  wrapper.find('Idea').at(0).props().onRequestConvertDialogOpen(0);
  expect(wrapper.find('ConvertIdeaDialog').prop('open')).toBe(true);
});
it('should set ConvertIdeaDialog open to false based on state', () => {
  const wrapper = getActualIdeaList();
  wrapper.find('ConvertIdeaDialog').props().onRequestClose();
  expect(wrapper.find('ConvertIdeaDialog').prop('open')).toBe(false);
});
it('should set ConvertIdeaDialog idea based on state', () => {
  const wrapper = getActualIdeaList();
  wrapper.find('Idea').at(0).props().onRequestEditDialogOpen(0);
  expect(wrapper.find('ConvertIdeaDialog').prop('idea')).toBe('a cool idea');
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
