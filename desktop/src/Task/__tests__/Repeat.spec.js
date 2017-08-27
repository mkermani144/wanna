/* eslint-env mocha, jest */

import RepeatIcon from 'material-ui/svg-icons/av/repeat';

import getDefault from '../../shared/testUtils';
import Repeat from '../Repeat';

const defaultProps = {
  repeat: 0,
};
const getActualRepeat = getDefault(Repeat, defaultProps);


it('should render', () => {
  getActualRepeat();
});
it('should be a <small />', () => {
  const wrapper = getActualRepeat();
  expect(wrapper.is('small.Repeat')).toEqual(true);
});
it('should not show icon if repeat is 0', () => {
  const wrapper = getActualRepeat({ repeat: '0' });
  expect(wrapper.find(RepeatIcon).length).toEqual(0);
});
it('should show icon if repeat is not 0', () => {
  const wrapper = getActualRepeat({ repeat: '3' });
  expect(wrapper.find(RepeatIcon).length).toBeGreaterThan(0);
});
