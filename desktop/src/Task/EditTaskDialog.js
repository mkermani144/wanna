import React, { PureComponent } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { green600, grey50 } from 'material-ui/styles/colors';

class EditTaskDialog extends PureComponent {
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
  render() {
    const actions = [
      <FlatButton
        label="Edit"
        primary
        disabled={!(this.state.task)}
        onTouchTap={this.handleRequestEdit}
      />,
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.handleRequestClose}
      />,
    ];
    const dialogTitleStyle = {
      backgroundColor: green600,
      color: grey50,
    };
    const textFieldStyles = {
      underlineFocusStyle: {
        borderColor: green600,
      },
      floatingLabelFocusStyle: {
        color: green600,
      },
    };
    return (
      <Dialog
        className="EditTaskDialog"
        title="Edit task"
        actions={actions}
        titleStyle={dialogTitleStyle}
        open={this.props.open}
        onRequestClose={this.props.onRequestClose}
      >
        <br />
        Edit your task
        <br />
        <TextField
          floatingLabelText="Task title"
          fullWidth
          underlineFocusStyle={textFieldStyles.underlineFocusStyle}
          floatingLabelFocusStyle={textFieldStyles.floatingLabelFocusStyle}
          defaultValue={this.props.task}
          onChange={this.handleTaskChange}
          autoFocus
        />
      </Dialog>
    );
  }
}

export default EditTaskDialog;
