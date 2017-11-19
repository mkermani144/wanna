import R from 'ramda';

const unixNow = Date.now;
const unixToDateObject = unixTime => new Date(unixTime);
const dateObjectUnixDayStart = dateObject => dateObject.setHours(0, 0, 0, 0);
const dateObjectUnixDayEnd = dateObject => dateObject.setHours(23, 59, 59, 999);
const multiply86400000 = R.multiply(86400000);

const parse = Date.parse;
const dayStart = R.compose(dateObjectUnixDayStart, unixToDateObject);
const dayEnd = R.compose(dateObjectUnixDayEnd, unixToDateObject);
const todayStart = R.compose(dayStart, unixNow);

const addDays = R.compose(R.add, multiply86400000);
const uncurriedAddDays = R.uncurryN(2, addDays);

export {
  parse,
  dayStart,
  todayStart,
  dayEnd,
  uncurriedAddDays as addDays,
};
