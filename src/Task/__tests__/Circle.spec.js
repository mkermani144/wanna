/* eslint-env mocha, jest */

import getActualComponentFactory from '../../lib/testUtils';
import Circle from '../Circle';

const getActualCircle = getActualComponentFactory(Circle, {});

it('should render', () => {
  getActualCircle();
});
it('should be 1 p', () => {
  const wrapper = getActualCircle();
  expect(wrapper.is('p.Circle')).toEqual(true);
});
