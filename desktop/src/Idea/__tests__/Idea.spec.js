/* eslint-env mocha, jest */

import getDefault from '../../shared/testUtils';
import Idea from '../Idea';

const defaultProps = {
  index: 0,
  onRequestEditDialogOpen() {},
  onRequestConvertDialogOpen() {},
  onRequestDelete() {},
};
const getActualIdea = getDefault(Idea, defaultProps);

jest.useFakeTimers();

it('should render', () => {
  getActualIdea();
});
it('should be a <div />', () => {
  const wrapper = getActualIdea();
  expect(wrapper.is('div.Idea')).toBe(true);
});
it('should have a <p />', () => {
  const wrapper = getActualIdea();
  expect(wrapper.find('p').length).toBe(1);
});
it('should have an <Actions />', () => {
  const wrapper = getActualIdea();
  expect(wrapper.find('Actions').length).toBe(1);
});
it('should set actions onRequestEditDialogOpen based on props', () => {
  const wrapper = getActualIdea({
    onRequestEditDialogOpen() {
      return 3;
    },
  });
  expect(wrapper.find('Actions').prop('onRequestEditDialogOpen')()).toBe(3);
});
it('should set actions onRequestConvertDialogOpen based on props', () => {
  const wrapper = getActualIdea({
    onRequestConvertDialogOpen() {
      return 3;
    },
  });
  expect(wrapper.find('Actions').prop('onRequestConvertDialogOpen')()).toBe(3);
});
it('should pass props.index when editing idea', () => {
  const wrapper = getActualIdea({
    index: 5,
    onRequestEditDialogOpen(index) {
      return index;
    },
  });
  expect(wrapper.find('Actions').prop('onRequestEditDialogOpen')()).toBe(5);
});
it('should pass props.index when converting idea', () => {
  const wrapper = getActualIdea({
    index: 5,
    onRequestConvertDialogOpen(index) {
      return index;
    },
  });
  expect(wrapper.find('Actions').prop('onRequestConvertDialogOpen')()).toBe(5);
});
it('should call onRequestDelete in handling delete request', () => {
  let a = 0;
  const wrapper = getActualIdea({
    onRequestDelete() {
      a = 2;
    },
  });
  wrapper.instance().handleRequestDelete();
  setTimeout(() => {
    expect(a).toBe(2);
  }, 1000);
  jest.runAllTimers();
});
