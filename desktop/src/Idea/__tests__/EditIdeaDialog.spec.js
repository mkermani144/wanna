/* eslint-env mocha, jest */

import React from 'react';
import { shallow } from 'enzyme';

import EditIdeaDialog from '../EditIdeaDialog';

it('should render', () => {
  shallow(<EditIdeaDialog open={false} />);
});
it('should be a <div />', () => {
  const editIdeaDialog = shallow(<EditIdeaDialog open={false} />);
  expect(editIdeaDialog.is('div.EditIdeaDialog')).toBe(true);
});
it('should have a <Dialog />', () => {
  const editIdeaDialog = shallow(<EditIdeaDialog open={false} />);
  expect(editIdeaDialog.find('Dialog').length).toBe(1);
});
it('should show/hide <Dialog /> based on props', () => {
  const editIdeaDialog = shallow(<EditIdeaDialog open />);
  expect(editIdeaDialog.find('Dialog').prop('open')).toBe(true);
});
it('should set text field default value based on props', () => {
  const editIdeaDialog = shallow(<EditIdeaDialog open idea="A cool idea" />);
  expect(editIdeaDialog.find('TextField').prop('defaultValue')).toBe('A cool idea');
});
it('should call onRequestClose in handling close request', () => {
  let a = 0;
  const editIdeaDialog = shallow(
    <EditIdeaDialog open={false} onRequestClose={() => { a = 2; }} />,
  );
  editIdeaDialog.instance().handleRequestClose();
  expect(a).toBe(2);
});
it('should call onRequestEdit in handling edit request', () => {
  let a = 0;
  const editIdeaDialog = shallow(
    <EditIdeaDialog open={false} onRequestEdit={() => { a = 2; }} />,
  );
  editIdeaDialog.instance().handleRequestEdit();
  expect(a).toBe(2);
});
