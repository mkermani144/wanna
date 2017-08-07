/* eslint-env mocha, jest */

import React from 'react';
import { shallow } from 'enzyme';
import RepeatIcon from 'material-ui/svg-icons/av/repeat';

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
  expect(repeat.find(RepeatIcon).length).toEqual(0);
});
it('should show icon if repeat is not 0', () => {
  const repeat = shallow(<Repeat repeat="3" />);
  expect(repeat.find(RepeatIcon).length).toBeGreaterThan(0);
});
