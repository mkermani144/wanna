import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class NewIdeaDialog extends Component {
  constructor() {
    super();
    this.state = { idea: '' };
  }
  handleIdeaChange = (e) => {
    this.setState({
      idea: e.target.value,
    });
  }
  handleRequestClose = () => {
    this.setState({ idea: '' });
    this.props.onRequestClose();
  }
  handleRequestAdd = () => {
    this.props.onRequestAdd(this.state);
    this.setState({ idea: '' });
  }
  render() {
    const actions = [
      <FlatButton
        label="Add"
        primary={true}
        disabled={!Boolean(this.state.idea)}
        onTouchTap={this.handleRequestAdd}
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleRequestClose}
      />,
    ];
    return (
      <div className="NewIdeaDialog">
        <Dialog
          title="Add new idea"
          actions={actions}
          open={this.props.open}
          onRequestClose={this.props.onRequestClose}
        >
          Do you have an idea?
          <br />
          <TextField
            floatingLabelText="Idea title"
            fullWidth={true}
            onChange={this.handleIdeaChange}
            autoFocus
          />
        </Dialog>
      </div>
    );
  }
}

export default NewIdeaDialog;
