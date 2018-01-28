/* eslint-env mocha, jest */

import getActualComponentFactory from '../../lib/testUtils';
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
const getActualFAB = getActualComponentFactory(FAB, defaultProps);

it('should render', () => {
  getActualFAB();
});
it('should be a HotKeys', () => {
  const wrapper = getActualFAB();
  expect(wrapper.is('HotKeys')).toBe(true);
});
it('should have 1 SpeedDial', () => {
  const wrapper = getActualFAB();
  expect(wrapper.find('SpeedDial').length).toBe(1);
});
it('should have 2 SpeedDialItem', () => {
  const wrapper = getActualFAB();
  expect(wrapper.find('SpeedDialItem').length).toBe(2);
});
it('should have 1 NewTaskDialog', () => {
  const wrapper = getActualFAB();
  expect(wrapper.find('NewTaskDialog').length).toBe(1);
});
it('should have 1 NewIdeaDialog', () => {
  const wrapper = getActualFAB();
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

it('should call addTask inside NewTaskDialog onRequestAdd', () => {
  const wrapper = getActualFAB({
    addTask(task) {
      expect(task).toMatchObject({
        task: 'a cool task',
        start: 0,
        end: 86399999,
        estimation: 60,
        repetition: 0,
        done: false,
      });
    },
  });
  wrapper.find('NewTaskDialog').props().onRequestAdd({
    task: 'a cool task',
    start: 0,
    end: 86399999,
    estimation: 1,
    estimationValue: 60,
    repetition: 0,
    repetitionValue: 1,
  });
});
it('should call addIdea inside NewIdeaDialog onRequestAdd', () => {
  const wrapper = getActualFAB({
    addIdea(idea) {
      expect(idea).toMatchObject({
        idea: 'a cool idea',
      });
    },
  });
  wrapper.find('NewIdeaDialog').props().onRequestAdd({
    idea: 'a cool idea',
  });
});

it('should set NewTaskDialog open to true based on state', () => {
  const wrapper = getActualFAB();
  wrapper.find('SpeedDialItem').at(0).props().onClick();
  wrapper.update();
  expect(wrapper.find('NewTaskDialog').prop('open')).toBe(true);
});
it('should set NewIdeaDialog open to true based on state', () => {
  const wrapper = getActualFAB();
  wrapper.find('SpeedDialItem').at(1).props().onClick();
  wrapper.update();
  expect(wrapper.find('NewIdeaDialog').prop('open')).toBe(true);
});
it('should set NewTaskDialog open to false based on state', () => {
  const wrapper = getActualFAB();
  wrapper.find('NewTaskDialog').props().onRequestClose();
  wrapper.update();
  expect(wrapper.find('NewTaskDialog').prop('open')).toBe(false);
});
it('should set NewIdeaDialog open to false based on state', () => {
  const wrapper = getActualFAB();
  wrapper.find('NewIdeaDialog').props().onRequestClose();
  wrapper.update();
  expect(wrapper.find('NewIdeaDialog').prop('open')).toBe(false);
});
