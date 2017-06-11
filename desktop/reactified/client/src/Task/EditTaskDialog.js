import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class EditTaskDialog extends Component {
  constructor(props) {
    super(props);
    this.state = { task: this.props.task };
  }
  handleTaskChange = (e) => {
    this.setState({
      task: e.target.value,
    });
  }
  handleRequestClose = () => {
    this.props.onRequestClose();
  }
  handleRequestEdit = () => {
    this.props.onRequestEdit(this.state);
  }
  handleRequestTaskEdit = (taskInfo) => {
    this.props.editTask(this.state.index, {
      task: taskInfo.task,
    });
    this.handleRequestTaskDialogClose();
  }
  render() {
    const actions = [
      <FlatButton
        label="Edit"
        primary={true}
        disabled={!Boolean(this.state.task)}
        onTouchTap={this.handleRequestEdit}
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleRequestClose}
      />,
    ];
    return (
      <div className="EditTaskDialog">
        <Dialog
          title="Edit task"
          actions={actions}
          open={this.props.open}
          onRequestClose={this.props.onRequestClose}
        >
          Edit your task
          <br />
          <TextField
            floatingLabelText="Task title"
            fullWidth={true}
            defaultValue={this.props.task}
            onChange={this.handleTaskChange}
            autoFocus
          />
        </Dialog>
      </div>
    );
  }
}

export default EditTaskDialog;
