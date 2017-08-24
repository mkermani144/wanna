/* eslint-env mocha, jest */

import getActual from '../../shared/testUtils';
import FAB from '../FAB';

const defaultProps = {
  calendarSystem: 'en-US',
  firstDayOfWeek: 0,
  fabRaised: false,
  window: null,
  width: 1024,
  addTask() {},
  addIdea() {},
};
const getActualFAB = getActual(FAB, defaultProps);

it('should render', () => {
  getActualFAB({});
});
it('should be a <HotKeys />', () => {
  const wrapper = getActualFAB({});
  expect(wrapper.is('HotKeys')).toBe(true);
});
it('should have a <SpeedDial />', () => {
  const wrapper = getActualFAB({});
  expect(wrapper.find('SpeedDial').length).toBe(1);
});
it('should have 2 <SpeedDialItem />', () => {
  const wrapper = getActualFAB({});
  expect(wrapper.find('SpeedDialItem').length).toBe(2);
});
it('should have a <NewTaskDialog />', () => {
  const wrapper = getActualFAB({});
  expect(wrapper.find('NewTaskDialog').length).toBe(1);
});
it('should have a <NewIdeaDialog />', () => {
  const wrapper = getActualFAB({});
  expect(wrapper.find('NewIdeaDialog').length).toBe(1);
});

it('should set SpeedDial bottom style based on props', () => {
  const wrapper = getActualFAB({
    fabRaised: true,
    width: 767,
  });
  expect(wrapper.find('SpeedDial').props().style.bottom).toBe(72);
});
it('should set NewTaskDialog calendarSystem based on props', () => {
  const wrapper = getActualFAB({
    calendarSystem: 'fa-IR',
  });
  expect(wrapper.find('NewTaskDialog').prop('calendarSystem')).toBe('fa-IR');
});
it('should set NewTaskDialog firstDayOfWeek based on props', () => {
  const wrapper = getActualFAB({
    firstDayOfWeek: 6,
  });
  expect(wrapper.find('NewTaskDialog').prop('firstDayOfWeek')).toBe(6);
});

it('should call props.addTask inside NewTaskDialog onRequestAdd', () => {
  let a = {
    task: '',
    start: 0,
    end: 0,
    estimation: 0,
    repetition: '',
    done: true,
    id: '',
  };
  const wrapper = getActualFAB({
    addTask(task) {
      a = task;
      a.id = '123';
    },
  });
  wrapper.find('NewTaskDialog').props().onRequestAdd({
    task: 'a cool task',
    start: 0,
    end: 0,
    estimation: 1,
    estimationValue: 60,
    repetition: 0,
    repetitionValue: 1,
  });
  expect(a).toEqual({
    task: 'a cool task',
    start: 0,
    end: 86400000,
    estimation: 60,
    repetition: 0,
    done: false,
    id: '123',
  });
});
it('should call props.addIdea inside NewIdeaDialog onRequestAdd', () => {
  let a = {
    idea: '',
    id: '',
  };
  const wrapper = getActualFAB({
    addIdea(idea) {
      a = idea;
      a.id = '123';
    },
  });
  wrapper.find('NewIdeaDialog').props().onRequestAdd({
    idea: 'a cool idea',
  });
  expect(a).toEqual({
    idea: 'a cool idea',
    id: '123',
  });
});
