/* eslint-env mocha, jest */

import {
  isPassedDay,
  isBeforeStartDay,
} from '../datePickerUtils';

const yesterday = () => {
  const yesterdayDateObj = new Date(Date.now() - 86400000);
  yesterdayDateObj.setHours(0, 0, 0, 0);
  return yesterdayDateObj;
};
const today = () => {
  const todayDateObj = new Date();
  todayDateObj.setHours(0, 0, 0, 0);
  return todayDateObj;
};

it('should return true if the day is passed', () => {
  const expected = true;
  const passedDay = yesterday();
  const actual = isPassedDay(passedDay);
  expect(actual).toBe(expected);
});
it('should return true if the day is before start day', () => {
  const expected = true;
  const day = yesterday();
  const startDay = today();
  const actual = isBeforeStartDay(day, startDay);
  expect(actual).toBe(expected);
});
