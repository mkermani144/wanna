import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { shallow } from 'enzyme';
import r from 'ramda';

const getActual = (Component, defaultProps, props) => shallow(
  <Component {...r.merge(defaultProps, props)} />,
);

const getDefault = (...args) => r.partial(getActual, args);

export default getDefault;
