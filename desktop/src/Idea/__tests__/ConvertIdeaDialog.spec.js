/* eslint-env mocha, jest */

import React from 'react';
import { shallow } from 'enzyme';

import ConvertIdeaDialog from '../ConvertIdeaDialog';

it('should render', () => {
  shallow(<ConvertIdeaDialog open={false} />);
});
it('should be a <div />', () => {
  const convertIdeaDialog = shallow(<ConvertIdeaDialog open={false} />);
  expect(convertIdeaDialog.is('div.ConvertIdeaDialog')).toBe(true);
});
it('should have a <Dialog />', () => {
  const convertIdeaDialog = shallow(<ConvertIdeaDialog open={false} />);
  expect(convertIdeaDialog.find('Dialog').length).toBe(1);
});
it('should show/hide <Dialog /> based on props', () => {
  const convertIdeaDialog = shallow(<ConvertIdeaDialog open />);
  expect(convertIdeaDialog.find('Dialog').prop('open')).toBe(true);
});
it('should set date picker calendar system based on props', () => {
  const convertIdeaDialog = shallow(<ConvertIdeaDialog open={false} calendarSystem="fa-IR" />);
  expect(convertIdeaDialog.find('DatePicker').at(0).prop('locale')).toBe('fa-IR');
});
it('should set date picker first day of week based on props', () => {
  const convertIdeaDialog = shallow(<ConvertIdeaDialog open={false} firstDayOfWeek={6} />);
  expect(convertIdeaDialog.find('DatePicker').at(0).prop('firstDayOfWeek')).toBe(6);
});
it('should call onRequestClose in handling close request', () => {
  let a = 0;
  const convertIdeaDialog = shallow(
    <ConvertIdeaDialog open={false} onRequestClose={() => { a = 2; }} />,
  );
  convertIdeaDialog.instance().handleRequestClose();
  expect(a).toBe(2);
});
it('should call onRequestClose in handling finish request', () => {
  let a = 0;
  const convertIdeaDialog = shallow(
    <ConvertIdeaDialog open={false} onRequestClose={() => { a = 2; }} />,
  );
  convertIdeaDialog.instance().handleRequestFinish();
  expect(a).toBe(2);
});
it('should call onRequestConvert in handling convert request', () => {
  let a = 0;
  const convertIdeaDialog = shallow(
    <ConvertIdeaDialog open={false} onRequestConvert={() => { a = 2; }} />,
  );
  convertIdeaDialog.instance().handleRequestConvert();
  expect(a).toBe(2);
});
it('should call onRequestConvert in handling finish request', () => {
  let a = 0;
  const convertIdeaDialog = shallow(
    <ConvertIdeaDialog open={false} onRequestConvert={() => { a = 2; }} />,
  );
  convertIdeaDialog.instance().handleRequestFinish();
  expect(a).toBe(2);
});
it('should call onRequestDelete in handling convert request', () => {
  let a = 0;
  const convertIdeaDialog = shallow(
    <ConvertIdeaDialog open={false} onRequestDelete={() => { a = 2; }} />,
  );
  convertIdeaDialog.instance().handleRequestFinish();
  expect(a).toBe(2);
});
