/* eslint-env mocha, jest */

import appUIReducer from '../appUI';

const setup = ({ type, tab } = {}) => ({
  appUI: {
    fabRaised: false,
    currentTab: 'tasks',
  },
  action: {
    type,
    tab,
  },
});

it('should return some state if no state is provided', () => {
  const actual = appUIReducer(undefined, {});
  const expected = {};
  expect(actual).toEqual(expected);
});
it('should make `fabRaised` true', () => {
  const { appUI, action } = setup({
    type: 'RAISE_FAB',
  });
  const actual = appUIReducer(appUI, action);
  const expected = { ...appUI, fabRaised: true };
  expect(actual).toEqual(expected);
});
it('should make `fabRaised` false', () => {
  const { appUI, action } = setup({
    type: 'LOWER_FAB',
  });
  action.fabRaised = true;
  const actual = appUIReducer(appUI, action);
  const expected = { ...appUI, fabRaised: false };
  expect(actual).toEqual(expected);
});
it('should update `currentTab`', () => {
  const { appUI, action } = setup({
    type: 'CHANGE_TAB',
    tab: 'ideas',
  });
  const actual = appUIReducer(appUI, action);
  const expected = { ...appUI, currentTab: 'ideas' };
  expect(actual).toEqual(expected);
});
