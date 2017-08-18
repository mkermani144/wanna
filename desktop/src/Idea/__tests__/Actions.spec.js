/* eslint-env mocha, jest */

import React from 'react';
import { shallow } from 'enzyme';

import Actions from '../Actions';

it('should render', () => {
  shallow(<Actions />);
});
it('should have 3 <IconButton />', () => {
  const actions = shallow(<Actions />);
  expect(actions.find('IconButton').length).toBe(3);
});
