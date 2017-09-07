/* eslint-env mocha, jest */

import RepeatIcon from 'material-ui/svg-icons/av/repeat';

import getActualComponentFactory from '../../lib/testUtils';
import Repeat from '../Repeat';

const defaultProps = {
  repeat: 0,
};
const getActualRepeat = getActualComponentFactory(Repeat, defaultProps);


it('should render', () => {
  getActualRepeat();
});
it('should be a small', () => {
  const wrapper = getActualRepeat();
  expect(wrapper.is('small.Repeat')).toEqual(true);
});
it('should have 0 RepeatIcon if repeat is 0', () => {
  const wrapper = getActualRepeat({ repeat: '0' });
  expect(wrapper.find(RepeatIcon).length).toEqual(0);
});
it('should have some RepeatIcon if repeat is not 0', () => {
  const wrapper = getActualRepeat({ repeat: '3' });
  expect(wrapper.find(RepeatIcon).length).toBeGreaterThan(0);
});
