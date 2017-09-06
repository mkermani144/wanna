/* eslint-env mocha, jest */

import getActualComponentFactory from '../../lib/testUtils';
import Estimation from '../Estimation';

const getActualEstimation = getActualComponentFactory(Estimation, {});

it('should render', () => {
  getActualEstimation();
});
it('should be a <small />', () => {
  const wrapper = getActualEstimation();
  expect(wrapper.is('small.Estimation')).toEqual(true);
});
