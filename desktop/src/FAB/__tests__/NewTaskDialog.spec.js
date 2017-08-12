/* eslint-env mocha, jest */

import React from 'react';
import { shallow } from 'enzyme';

import NewTaskDialog from '../NewTaskDialog';

it('should render', () => {
  shallow(<NewTaskDialog open={false} />);
});
it('should be a <div />', () => {
  const newTaskDialog = shallow(<NewTaskDialog open={false} />);
  expect(newTaskDialog.is('div.NewTaskDialog')).toEqual(true);
});
it('should have a <Dialog />', () => {
  const newTaskDialog = shallow(<NewTaskDialog open={false} />);
  expect(newTaskDialog.find('Dialog').length).toEqual(1);
});
it('should react to close request', () => {
  const newTaskDialog = shallow(<NewTaskDialog open={false} onRequestClose={() => 'close requested'} />);
  expect(newTaskDialog.instance().props.onRequestClose()).toEqual('close requested');
});
it('should react to add request', () => {
  const newTaskDialog = shallow(<NewTaskDialog open={false} onRequestAdd={() => 'add requested'} />);
  expect(newTaskDialog.instance().props.onRequestAdd()).toEqual('add requested');
});
