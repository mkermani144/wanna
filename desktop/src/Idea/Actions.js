import React from 'react';
import IconButton from 'material-ui/IconButton';
import Edit from 'material-ui/svg-icons/image/edit';
import Delete from 'material-ui/svg-icons/action/delete';
import { green500, grey600, red500 } from 'material-ui/styles/colors';

import Fork from '../icons/fork';

const Actions = (props) => {
  const colors = {
    arrow: green500,
    edit: grey600,
    delete: red500,
  };
  return (
    <div className="Actions">
      <IconButton
        className="IconButton"
        tooltip="Delete"
        onTouchTap={props.onRequestDelete}
      >
        <Delete color={colors.delete} />
      </IconButton>
      <IconButton
        className="IconButton"
        tooltip="Edit"
        onTouchTap={props.onRequestEditDialogOpen}
      >
        <Edit color={colors.edit} />
      </IconButton>
      <IconButton
        className="IconButton"
        tooltip="Convert"
        onTouchTap={props.onRequestConvertDialogOpen}
      >
        <Fork color={colors.arrow} />
      </IconButton>
    </div>
  );
};

export default Actions;
