import React, { Component } from 'react';

import IconButton from 'material-ui/IconButton';

import Done from 'material-ui/svg-icons/action/done';
import Edit from 'material-ui/svg-icons/image/edit';
import Delete from 'material-ui/svg-icons/action/delete';

import { blue500, grey600, red500 } from 'material-ui/styles/colors';

class Actions extends Component {
  render() {
    const colors = {
      done: blue500,
      edit: grey600,
      delete: red500
    };
    return (
      <div className="Actions">
        <IconButton className="IconButton">
          <Done color={colors.done} />
        </IconButton>
        <IconButton className="IconButton"
          onTouchTap={this.props.onRequestEditDialogOpen}
        >
          <Edit color={colors.edit} />
        </IconButton>
        <IconButton className="IconButton"
          onTouchTap={this.props.onRequestDelete}
        >
          <Delete color={colors.delete} />
        </IconButton>
      </div>
    );
  }
}

export default Actions;
