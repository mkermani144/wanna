import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { shallow } from 'enzyme';
import R from 'ramda';

const componentory = (Component, props) => shallow(<Component {...props} />);
const getActual = (...props) => R.mergeAll(props);

const getActualComponentFactory = (Component, defaultProps) => R.compose(
  R.partial(componentory, [Component]),
  R.partial(getActual, [defaultProps]),
);

export {
  getActualComponentFactory as default,
  getActual,
};
