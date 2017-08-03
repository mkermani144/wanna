/* eslint-env mocha, jest */

import React from 'react';
import { shallow } from 'enzyme';

import Actions from '../Actions';

it('should render', () => {
  shallow(<Actions />);
});
it('should have 3 <IconButton /> if not done', () => {
  const actions = shallow(<Actions />);
  expect(actions.find('IconButton').length).toEqual(3);
});
it('should have 1 <IconButton /> if done', () => {
  const actions = shallow(<Actions done />);
  expect(actions.find('IconButton').length).toEqual(1);
});
