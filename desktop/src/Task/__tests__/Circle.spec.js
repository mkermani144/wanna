/* eslint-env mocha, jest */

import React from 'react';
import { shallow } from 'enzyme';

import Circle from '../Circle';

it('should render', () => {
  shallow(<Circle />);
});
it('should be a <p />', () => {
  const circle = shallow(<Circle />);
  expect(circle.is('p.Circle')).toEqual(true);
});
