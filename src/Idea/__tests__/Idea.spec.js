/* eslint-env mocha, jest */

import getActualComponentFactory from '../../lib/testUtils';
import Idea from '../Idea';

const defaultProps = {
  index: 0,
  onRequestEditDialogOpen() {},
  onRequestConvertDialogOpen() {},
  onRequestDelete() {},
};
const getActualIdea = getActualComponentFactory(Idea, defaultProps);

jest.useFakeTimers();

it('should render', () => {
  getActualIdea();
});
it('should be a div', () => {
  const wrapper = getActualIdea();
  expect(wrapper.is('div.Idea')).toBe(true);
});
it('should have 1 p', () => {
  const wrapper = getActualIdea();
  expect(wrapper.find('p').length).toBe(1);
});
it('should have 1 Actions', () => {
  const wrapper = getActualIdea();
  expect(wrapper.find('Actions').length).toBe(1);
});
it('should set actions onRequestEditDialogOpen based on props', (done) => {
  const wrapper = getActualIdea({
    onRequestEditDialogOpen() {
      done();
    },
  });
  wrapper.find('Actions').props().onRequestEditDialogOpen();
});
it('should set actions onRequestConvertDialogOpen based on props', (done) => {
  const wrapper = getActualIdea({
    onRequestConvertDialogOpen() {
      done();
    },
  });
  wrapper.find('Actions').props().onRequestConvertDialogOpen();
});
it('should call onRequestEditDialogOpen inside Actions onRequestEditDialogOpen', () => {
  const wrapper = getActualIdea({
    index: 5,
    onRequestEditDialogOpen(index) {
      expect(index).toBe(5);
    },
  });
  wrapper.find('Actions').props().onRequestEditDialogOpen();
});
it('should call onRequestConvertDialogOpen inside Actions onRequestConvertDialogOpen', () => {
  const wrapper = getActualIdea({
    index: 5,
    onRequestConvertDialogOpen(index) {
      expect(index).toBe(5);
    },
  });
  wrapper.find('Actions').props().onRequestConvertDialogOpen();
});
it('should call onRequestDelete inside Actions onRequestDelete', (done) => {
  const wrapper = getActualIdea({
    onRequestDelete() {
      done();
    },
  });
  wrapper.find('Actions').props().onRequestDelete();
  jest.runAllTimers();
});
