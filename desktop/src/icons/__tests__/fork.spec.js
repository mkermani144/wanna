/* eslint-env mocha, jest */

import getDefault from '../../shared/testUtils';
import Fork from '../fork';

const getActualFork = getDefault(Fork, {});

it('should render', () => {
  getActualFork();
});
it('should contain an <svg />', () => {
  const wrapper = getActualFork();
  expect(wrapper.find('path').length).toBeGreaterThan(0);
});
