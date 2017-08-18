/* eslint-env mocha, jest */

import React from 'react';
import { shallow } from 'enzyme';

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

const getActual = props => shallow(<IdeaList {...Object.assign({}, defaultProps, props)} />);

it('should render', () => {
  getActual();
});
it('should be a <div />', () => {
  const ideaList = getActual();
  expect(ideaList.is('div.IdeaList')).toBe(true);
});
it('should have two <Idea />\'s', () => {
  const ideaList = getActual();
  expect(ideaList.find('Idea').length).toBe(2);
});
it('should have two <Divider />\'s', () => {
  const ideaList = getActual();
  expect(ideaList.find('Divider').length).toBe(2);
});
it('should have two <EditIdeaDialog />\'s', () => {
  const ideaList = getActual();
  expect(ideaList.find('EditIdeaDialog').length).toBe(1);
});
it('should have two <ConvertIdeaDialog />\'s', () => {
  const ideaList = getActual();
  expect(ideaList.find('ConvertIdeaDialog').length).toBe(1);
});
it('should have two <Snackbar />\'s', () => {
  const ideaList = getActual();
  expect(ideaList.find('Snackbar').length).toBe(1);
});

it('should have no <Idea />\'s if props.ideas is empty', () => {
  const ideaList = getActual({
    ideas: [],
  });
  expect(ideaList.find('Idea').length).toBe(0);
});
it('should have no <Divider />\'s if props.ideas is empty', () => {
  const ideaList = getActual({
    ideas: [],
  });
  expect(ideaList.find('Divider').length).toBe(0);
});
it('should have no <EditIdeaDialog />\'s if props.ideas is empty', () => {
  const ideaList = getActual({
    ideas: [],
  });
  expect(ideaList.find('EditIdeaDialog').length).toBe(0);
});
it('should have no <ConvertIdeaDialog />\'s if props.ideas is empty', () => {
  const ideaList = getActual({
    ideas: [],
  });
  expect(ideaList.find('ConvertIdeaDialog').length).toBe(0);
});
it('should be a <div /> if props.ideas is empty', () => {
  const ideaList = getActual({
    ideas: [],
  });
  expect(ideaList.is('div.ideas-empty-state')).toBe(true);
});
it('should have no <Snackbar />\'s if props.ideas is empty', () => {
  const ideaList = getActual({
    ideas: [],
  });
  expect(ideaList.find('Snackbar').length).toBe(1);
});

it('should set left margin based on props', () => {
  const ideaList = getActual({
    sidebarExpanded: false,
  });
  expect(ideaList.prop('style').marginLeft).toBe(56);
});
it('should set ConvertIdeaDialog calendarSystem based on props', () => {
  const ideaList = getActual({
    calendarSystem: 'fa-IR',
  });
  expect(ideaList.find('ConvertIdeaDialog').prop('calendarSystem')).toBe('fa-IR');
});
it('should set ConvertIdeaDialog firstDayOfWeek based on props', () => {
  const ideaList = getActual({
    firstDayOfWeek: 6,
  });
  expect(ideaList.find('ConvertIdeaDialog').prop('firstDayOfWeek')).toBe(6);
});

it('should call editIdea when handling edit idea request', () => {
  let a = 0;
  let b = '';
  const ideaList = getActual({
    editIdea(index, ideaInfo) {
      a = index;
      b = ideaInfo.idea;
    },
  });
  ideaList.instance().setState({ index: 2 }, () => {
    ideaList.instance().handleRequestIdeaEdit({ idea: 'a cool idea' });
  });
  expect(a).toBe(2);
  expect(b).toBe('a cool idea');
});
it('should call deleteIdea when handling delete idea request', () => {
  let a = 0;
  const ideaList = getActual({
    deleteIdea(index) {
      a = index;
    },
  });
  ideaList.instance().handleRequestIdeaDelete(3);
  expect(a).toBe(3);
});
it('should call deleteIdea when handling convert dialog delete request', () => {
  let a = 0;
  const ideaList = getActual({
    deleteIdea(index) {
      a = index;
    },
  });
  ideaList.instance().setState({ index: 2 }, () => {
    ideaList.instance().handleRequestIdeaDelete(3);
  });
  expect(a).toBe(3);
});
it('should call addTask when handling convert idea request', () => {
  let a = 0;
  const ideaList = getActual({
    addTask(taskInfo) {
      a = taskInfo;
    },
  });
  ideaList.instance().handleRequestIdeaConvert({
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
  const ideaList = getActual({
    raiseFab() {
      a = 3;
    },
  });
  ideaList.instance().handleRequestSnackbarOpen();
  expect(a).toBe(3);
});
it('should call lowerFab when handling close snackbar request', () => {
  let a = 0;
  const ideaList = getActual({
    lowerFab() {
      a = 3;
    },
  });
  ideaList.instance().handleRequestSnackbarClose();
  expect(a).toBe(3);
});
it('should call undo when handling undo request', () => {
  let a = 0;
  const ideaList = getActual({
    undo() {
      a = 3;
    },
  });
  ideaList.instance().handleUndo();
  expect(a).toBe(3);
});
