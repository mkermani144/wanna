import R from 'ramda';

const unixNow = Date.now;
const unixToDateObject = unixTime => new Date(unixTime);
const dateObjectUnixDayStart = dateObject => dateObject.setHours(0, 0, 0, 0);
const dateObjectUnixDayEnd = dateObject => dateObject.setHours(23, 59, 59, 999);

const parse = Date.parse;
const dayStart = R.compose(dateObjectUnixDayStart, unixToDateObject);
const dayEnd = R.compose(dateObjectUnixDayEnd, unixToDateObject);
const todayStart = R.compose(dayStart, unixNow);

export {
  parse,
  dayStart,
  todayStart,
  dayEnd,
};
