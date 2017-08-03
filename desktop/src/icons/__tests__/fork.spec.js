/* eslint-env mocha, jest */

import React from 'react';
import { shallow } from 'enzyme';

import Fork from '../fork';

it('should render', () => {
  shallow(<Fork />);
});
it('should contain an <svg />', () => {
  const svg = shallow(<Fork />);
  expect(svg.find('path').length).toBeGreaterThan(0);
});
