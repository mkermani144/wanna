const unixTime = dateObj => Date.parse(dateObj);
const today = () => {
  const todayDateObj = new Date();
  todayDateObj.setHours(0, 0, 0, 0);
  return todayDateObj;
};

const isPassedDay = day => unixTime(day) < unixTime(today());
const isBeforeStartDay = (day, startDay) =>
  unixTime(day) < unixTime(startDay);

export {
  isPassedDay,
  isBeforeStartDay,
};
