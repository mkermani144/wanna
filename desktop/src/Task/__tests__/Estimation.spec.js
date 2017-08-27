/* eslint-env mocha, jest */

import getDefault from '../../shared/testUtils';
import Estimation from '../Estimation';

const getActualEstimation = getDefault(Estimation, {});

it('should render', () => {
  getActualEstimation();
});
it('should be a <small />', () => {
  const wrapper = getActualEstimation();
  expect(wrapper.is('small.Estimation')).toEqual(true);
});
