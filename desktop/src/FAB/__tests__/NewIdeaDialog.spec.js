/* eslint-env mocha, jest */

import React from 'react';
import { shallow } from 'enzyme';

import NewIdeaDialog from '../NewIdeaDialog';

it('should render', () => {
  shallow(<NewIdeaDialog open={false} />);
});
it('should be a <div />', () => {
  const newIdeaDialog = shallow(<NewIdeaDialog open={false} />);
  expect(newIdeaDialog.is('div.NewIdeaDialog')).toEqual(true);
});
it('should be a <div />', () => {
  const newIdeaDialog = shallow(<NewIdeaDialog open={false} />);
  expect(newIdeaDialog.is('div.NewIdeaDialog')).toEqual(true);
});
it('should have a <Dialog />', () => {
  const newIdeaDialog = shallow(<NewIdeaDialog open={false} />);
  expect(newIdeaDialog.find('Dialog').length).toEqual(1);
});
it('should react to close request', () => {
  const newIdeaDialog = shallow(<NewIdeaDialog open={false} onRequestClose={() => 'close requested'} />);
  expect(newIdeaDialog.instance().props.onRequestClose()).toEqual('close requested');
});
it('should react to add request', () => {
  const newIdeaDialog = shallow(<NewIdeaDialog open={false} onRequestAdd={() => 'add requested'} />);
  expect(newIdeaDialog.instance().props.onRequestAdd()).toEqual('add requested');
});
