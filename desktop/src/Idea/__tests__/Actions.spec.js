/* eslint-env mocha, jest */

import getDefault from '../../lib/testUtils';
import Actions from '../Actions';

const getActualActions = getDefault(Actions, {});

it('should render', () => {
  getActualActions();
});
it('should have 3 <IconButton />', () => {
  const wrapper = getActualActions();
  expect(wrapper.find('IconButton').length).toBe(3);
});
