import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class EditIdeaDialog extends Component {
  constructor(props) {
    super(props);
    this.state = { idea: this.props.idea };
  }
  handleIdeaChange = (e) => {
    this.setState({
      idea: e.target.value,
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
        primary={true}
        disabled={!Boolean(this.state.idea)}
        onTouchTap={this.handleRequestEdit}
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleRequestClose}
      />,
    ];
    return (
      <div className="EditIdeaDialog">
        <Dialog
          title="Edit idea"
          actions={actions}
          open={this.props.open}
          onRequestClose={this.props.onRequestClose}
        >
          Edit you idea
          <br />
          <TextField
            floatingLabelText="Idea title"
            fullWidth={true}
            defaultValue={this.props.idea}
            onChange={this.handleIdeaChange}
            autoFocus
          />
        </Dialog>
      </div>
    );
  }
}

export default EditIdeaDialog;
