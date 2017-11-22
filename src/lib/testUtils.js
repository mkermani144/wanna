import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { shallow } from 'enzyme';
import R from 'ramda';

const componentory = (Component, props) => shallow(<Component {...props} />);
const merge = (defaultProps, props) => R.mergeAll([defaultProps, props]);

const getActualComponentFactory = (Component, defaultProps) => R.pipe(
  R.partial(merge, [defaultProps]),
  R.partial(componentory, [Component]),
);

export default getActualComponentFactory;
