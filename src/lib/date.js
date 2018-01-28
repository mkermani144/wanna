import * as R from 'ramda';

const unixNow = Date.now;
const unixToDateObject = unixTime => new Date(unixTime);
const dateObjectUnixDayStart = dateObject => dateObject.setHours(0, 0, 0, 0);
const dateObjectUnixDayEnd = dateObject => dateObject.setHours(23, 59, 59, 999);
const multiply86400000 = R.multiply(86400000);

const { parse } = Date;
const dayStart = R.pipe(unixToDateObject, dateObjectUnixDayStart);
const dayEnd = R.pipe(unixToDateObject, dateObjectUnixDayEnd);
const todayStart = R.pipe(unixNow, dayStart);

const addDays = R.pipe(multiply86400000, R.add);
const uncurriedAddDays = R.uncurryN(2, addDays);

export {
  parse,
  dayStart,
  todayStart,
  dayEnd,
  uncurriedAddDays as addDays,
};
