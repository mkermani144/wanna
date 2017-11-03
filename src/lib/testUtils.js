import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { shallow } from 'enzyme';
import R from 'ramda';

const componentory = (Component, props) => shallow(<Component {...props} />);
const merge = (defaultProps, props) => R.mergeAll([defaultProps, props]);

const getActualComponentFactory = (Component, defaultProps) => R.compose(
  R.partial(componentory, [Component]),
  R.partial(merge, [defaultProps]),
);

export default getActualComponentFactory;
