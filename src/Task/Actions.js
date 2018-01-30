import React from 'react';
import IconButton from 'material-ui/IconButton';
import Done from 'material-ui/svg-icons/action/done';
import Edit from 'material-ui/svg-icons/image/edit';
import Delete from 'material-ui/svg-icons/action/delete';
import { blue500, grey600, red500 } from 'material-ui/styles/colors';

const Actions = (props) => {
  const colors = {
    done: blue500,
    edit: grey600,
    delete: red500,
  };
  return (
    <div className="Actions">
      <IconButton
        className="IconButton delete"
        tooltip="Delete"
        onClick={props.onRequestDelete}
      >
        <Delete color={colors.delete} />
      </IconButton>
      {!props.done &&
        <IconButton
          className="IconButton edit"
          tooltip="Edit"
          onClick={props.onRequestEditDialogOpen}
        >
          <Edit color={colors.edit} />
        </IconButton>
      }
      {!props.done &&
        <IconButton
          className="IconButton mark-as-done"
          tooltip="Mark as done"
          onClick={props.onRequestDo}
        >
          <Done color={colors.done} />
        </IconButton>
      }
    </div>
  );
};

export default Actions;
