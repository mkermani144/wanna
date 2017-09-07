/* eslint-env mocha, jest */

import getActualComponentFactory from '../../lib/testUtils';
import Actions from '../Actions';

const getActualActions = getActualComponentFactory(Actions, {});

it('should render', () => {
  getActualActions();
});
it('should have 3 IconButton', () => {
  const wrapper = getActualActions();
  expect(wrapper.find('IconButton').length).toBe(3);
});
