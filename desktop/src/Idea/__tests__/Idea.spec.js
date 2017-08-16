/* eslint-env mocha, jest */

import React from 'react';
import { shallow } from 'enzyme';

import Idea from '../Idea';

jest.useFakeTimers();

it('should render', () => {
  shallow(<Idea />);
});
it('should be a <div />', () => {
  const idea = shallow(<Idea />);
  expect(idea.is('div.Idea')).toEqual(true);
});
it('should have a <p />', () => {
  const idea = shallow(<Idea />);
  expect(idea.find('p').length).toEqual(1);
});
it('should have an <Actions />', () => {
  const idea = shallow(<Idea />);
  expect(idea.find('Actions').length).toEqual(1);
});
it('should set actions onRequestEditDialogOpen based on props', () => {
  const idea = shallow(
    <Idea onRequestEditDialogOpen={() => 3} />,
  );
  expect(idea.find('Actions').prop('onRequestEditDialogOpen')()).toEqual(3);
});
it('should set actions onRequestConvertDialogOpen based on props', () => {
  const idea = shallow(
    <Idea onRequestConvertDialogOpen={() => 3} />,
  );
  expect(idea.find('Actions').prop('onRequestConvertDialogOpen')()).toEqual(3);
});
it('should pass props.index when editing idea', () => {
  const idea = shallow(
    <Idea index={5} onRequestEditDialogOpen={index => index} />,
  );
  expect(idea.find('Actions').prop('onRequestEditDialogOpen')()).toEqual(5);
});
it('should pass props.index when converting idea', () => {
  const idea = shallow(
    <Idea index={5} onRequestConvertDialogOpen={index => index} />,
  );
  expect(idea.find('Actions').prop('onRequestConvertDialogOpen')()).toEqual(5);
});
it('should call onRequestDelete in handling delete request', () => {
  let a = 0;
  const idea = shallow(
    <Idea onRequestDelete={() => { a = 2; }} />,
  );
  idea.instance().handleRequestDelete();
  setTimeout(() => {
    expect(a).toEqual(2);
  }, 1000);
});
