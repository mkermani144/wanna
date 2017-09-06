/* eslint-env mocha, jest */

import getActualComponentFactory from '../../lib/testUtils';
import Actions from '../Actions';

const defaultProps = {
  done: false,
};
const getActualActions = getActualComponentFactory(Actions, defaultProps);

it('should render', () => {
  getActualActions();
});
it('should have 3 <IconButton /> if not done', () => {
  const wrapper = getActualActions();
  expect(wrapper.find('IconButton').length).toEqual(3);
});
it('should have 1 <IconButton /> if done', () => {
  const wrapper = getActualActions({ done: true });
  expect(wrapper.find('IconButton').length).toEqual(1);
});
