/* eslint-env mocha, jest */

import getDefault from '../../shared/testUtils';
import Circle from '../Circle';

const getActualCircle = getDefault(Circle, {});

it('should render', () => {
  getActualCircle();
});
it('should be a <p />', () => {
  const wrapper = getActualCircle();
  expect(wrapper.is('p.Circle')).toEqual(true);
});
