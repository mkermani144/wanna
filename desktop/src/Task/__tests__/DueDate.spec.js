/* eslint-env mocha, jest */

import getActualComponentFactory from '../../lib/testUtils';
import DueDate from '../DueDate';

const defaultProps = {
  due: '',
};
const getActualDueDate = getActualComponentFactory(DueDate, defaultProps);

it('should render', () => {
  getActualDueDate();
});
it('should be a span', () => {
  const wrapper = getActualDueDate();
  expect(wrapper.is('span.DueDate')).toEqual(true);
});
it('should have a small if due is tomorrow', () => {
  const wrapper = getActualDueDate({ due: 'tomorrow' });
  expect(wrapper.find('small').length).toBeGreaterThan(0);
});
it('should have a small if due is today', () => {
  const wrapper = getActualDueDate({ due: 'today' });
  expect(wrapper.find('small').length).toBeGreaterThan(0);
});
