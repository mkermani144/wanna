/* eslint-env mocha, jest */

import React from 'react';
import { shallow } from 'enzyme';

import Estimation from '../Estimation';

it('should render', () => {
  shallow(<Estimation />);
});
it('should be a <small />', () => {
  const estimation = shallow(<Estimation />);
  expect(estimation.is('small.Estimation')).toEqual(true);
});
