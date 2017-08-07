/* eslint-env mocha, jest */

import React from 'react';
import { shallow } from 'enzyme';

import Repeat from '../Repeat';

it('should render', () => {
  shallow(<Repeat />);
});
it('should be a <small />', () => {
  const repeat = shallow(<Repeat />);
  expect(repeat.is('small.Repeat')).toEqual(true);
});
it('should not show icon if repeat is 0', () => {
  const repeat = shallow(<Repeat repeat="0" />);
  expect(repeat.find('path').length).toEqual(0);
});
