import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import { yellow800, grey50 } from 'material-ui/styles/colors';

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
    const dialogTitleStyle = {
      backgroundColor: yellow800,
      color: grey50,
    };
    const textFieldStyles = {
      underlineFocusStyle: {
        borderColor: yellow800,
      },
      floatingLabelFocusStyle: {
        color: yellow800,
      },
    };
    return (
      <div className="NewIdeaDialog">
        <Dialog
          title="Add new idea"
          actions={actions}
          titleStyle={dialogTitleStyle}
          open={this.props.open}
          onRequestClose={this.props.onRequestClose}
        >
          <br />
          Do you have an idea?
          <br />
          <TextField
            floatingLabelText="Idea title"
            fullWidth={true}
            underlineFocusStyle={textFieldStyles.underlineFocusStyle}
            floatingLabelFocusStyle={textFieldStyles.floatingLabelFocusStyle}
            onChange={this.handleIdeaChange}
            autoFocus
          />
        </Dialog>
      </div>
    );
  }
}

export default NewIdeaDialog;
