import React from 'react';
import IconButton from 'material-ui/IconButton';
import Arrow from 'material-ui/svg-icons/navigation/arrow-forward';
import Edit from 'material-ui/svg-icons/image/edit';
import Delete from 'material-ui/svg-icons/action/delete';
import { green500, grey600, red500 } from 'material-ui/styles/colors';

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
        onTouchTap={props.onRequestConvertDialogOpen}
      >
        <Arrow color={colors.arrow} />
      </IconButton>
      <IconButton
        className="IconButton"
        onTouchTap={props.onRequestEditDialogOpen}
      >
        <Edit color={colors.edit} />
      </IconButton>
      <IconButton
        className="IconButton"
        onTouchTap={props.onRequestDelete}
      >
        <Delete color={colors.delete} />
      </IconButton>
    </div>
  );
};

export default Actions;
