/* eslint-env mocha, jest */

import rootReducer from '../reducer';

it('should return some state if no state and action is provided', () => {
  const actual = rootReducer(undefined, {});
  const expected = {
    tasks: {
      history: {
        present: [],
      },
      present: [],
    },
    ideas: {
      history: {
        present: [],
      },
      present: [],
    },
    appProperties: {},
    appUI: {},
  };
  expect(actual).toEqual(expected);
});
