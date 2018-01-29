/* eslint-env jest */
import calculateBottom from '../calculateBottom';

it('should return 32 when FABOpen is 0', () => {
  const actual = 32;
  const expected = calculateBottom(0, 0);
  expect(actual).toBe(expected);
});
it('should return 92 if FABOpen is 1 and FABNum is 0', () => {
  const actual = 92;
  const expected = calculateBottom(1, 0);
  expect(actual).toBe(expected);
});
it('should return 142 if FABOpen is 1 and FABNum is 0', () => {
  const actual = 142;
  const expected = calculateBottom(1, 1);
  expect(actual).toBe(expected);
});
