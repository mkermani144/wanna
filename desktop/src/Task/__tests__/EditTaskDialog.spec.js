/* eslint-env mocha, jest */

import React from 'react';
import { shallow } from 'enzyme';

import EditTaskDialog from '../EditTaskDialog';

it('should render', () => {
  shallow(<EditTaskDialog open={false} />);
});
it('should be a <div />', () => {
  const editTaskDialog = shallow(<EditTaskDialog open={false} />);
  expect(editTaskDialog.is('div.EditTaskDialog')).toBe(true);
});
it('should have a <Dialog />', () => {
  const editTaskDialog = shallow(<EditTaskDialog open={false} />);
  expect(editTaskDialog.find('Dialog').length).toBe(1);
});
it('should show/hide <Dialog /> based on props', () => {
  const editTaskDialog = shallow(<EditTaskDialog open />);
  expect(editTaskDialog.find('Dialog').prop('open')).toBe(true);
});
it('should set text field default value based on props', () => {
  const editTaskDialog = shallow(<EditTaskDialog open task="A cool task" />);
  expect(editTaskDialog.find('TextField').prop('defaultValue')).toBe('A cool task');
});
it('should call onRequestClose in handling close request', () => {
  let a = 0;
  const editTaskDialog = shallow(
    <EditTaskDialog open={false} onRequestClose={() => { a = 2; }} />,
  );
  editTaskDialog.instance().handleRequestClose();
  expect(a).toBe(2);
});
it('should call onRequestEdit in handling edit request', () => {
  let a = 0;
  const editTaskDialog = shallow(
    <EditTaskDialog open={false} onRequestEdit={() => { a = 2; }} />,
  );
  editTaskDialog.instance().handleRequestEdit();
  expect(a).toBe(2);
});
