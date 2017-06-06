import * as moment from 'moment';

const today = () => moment().startOf('day').unix() * 1000;

const endOf = time => moment(time).endOf('day').unix() * 1000;

const addDays = (start, days) => moment(start).add(days, 'days').unix() * 1000;

const diff = (start, end) => moment(end).diff(start, 'days');

export { today, endOf, diff, addDays };
