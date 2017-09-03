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
it('should set actions onRequestEditDialogOpen based on props', (done) => {
  const wrapper = getActualIdea({
    onRequestEditDialogOpen() {
      done();
    },
  });
  wrapper.find('Actions').prop('onRequestEditDialogOpen')();
});
it('should set actions onRequestConvertDialogOpen based on props', (done) => {
  const wrapper = getActualIdea({
    onRequestConvertDialogOpen() {
      done();
    },
  });
  wrapper.find('Actions').prop('onRequestConvertDialogOpen')();
});
it('should pass props.index when editing idea', () => {
  const wrapper = getActualIdea({
    index: 5,
    onRequestEditDialogOpen(index) {
      expect(index).toBe(5);
    },
  });
  wrapper.find('Actions').prop('onRequestEditDialogOpen')();
});
it('should pass props.index when converting idea', () => {
  const wrapper = getActualIdea({
    index: 5,
    onRequestConvertDialogOpen(index) {
      expect(index).toBe(5);
    },
  });
  wrapper.find('Actions').prop('onRequestConvertDialogOpen')();
});
it('should call onRequestDelete when calling Actions onRequestDelete', (done) => {
  const wrapper = getActualIdea({
    onRequestDelete() {
      done();
    },
  });
  wrapper.find('Actions').props().onRequestDelete();
  jest.runAllTimers();
});

it('should set its class based on state', () => {
  const wrapper = getActualIdea();
  wrapper.find('Actions').props().onRequestDelete();
  expect(wrapper.props().className.includes('will-be-deleted')).toBe(true);
});
