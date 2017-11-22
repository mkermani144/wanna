/* eslint-env mocha, jest */

import getActualComponentFactory from '../../lib/testUtils';
import Circle from '../Circle';

const getActualCircle = getActualComponentFactory(Circle, {});

it('should render', () => {
  getActualCircle();
});
it('should be a div', () => {
  const wrapper = getActualCircle();
  expect(wrapper.is('div.Circle')).toEqual(true);
});
it('should have a div.Signal if signal prop is true', () => {
  const wrapper = getActualCircle({ signal: true });
  expect(wrapper.find('div.Signal').length).toEqual(1);
});
