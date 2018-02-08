import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { yellow800, grey50 } from 'material-ui/styles/colors';
import { HotKeys } from 'react-hotkeys';

class NewIdeaDialog extends Component {
  state = { idea: '' };
  keyMap = {
    confirmAddNewIdeaAndFinish: 'shift+enter',
    confirmAddNewIdeaAndContinue: 'enter',
  };

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
  handleRequestFinish = () => {
    this.handleRequestAdd();
    this.handleRequestClose();
  }
  render() {
    const actions = [
      <FlatButton
        id="add-and-finish"
        label="Add and finish"
        primary
        disabled={!(this.state.idea)}
        onClick={this.handleRequestFinish}
      />,
      <FlatButton
        id="add-and-continue"
        label="Add and continue"
        primary
        disabled={!(this.state.idea)}
        onClick={this.handleRequestAdd}
      />,
      <FlatButton
        label="Cancel"
        primary
        onClick={this.handleRequestClose}
      />,
    ];
    const dialogTitleStyle = {
      backgroundColor: yellow800,
      color: grey50,
      cursor: 'default',
    };
    const textFieldStyles = {
      underlineFocusStyle: {
        borderColor: yellow800,
      },
      floatingLabelFocusStyle: {
        color: yellow800,
      },
    };
    const handlers = {
      confirmAddNewIdeaAndFinish: () => {
        this.state.idea && this.handleRequestFinish();
      },
      confirmAddNewIdeaAndContinue: () => {
        this.state.idea && this.handleRequestAdd();
      },
    };
    return (
      <Dialog
        className="NewIdeaDialog"
        title="Add new idea"
        actions={actions}
        titleStyle={dialogTitleStyle}
        open={this.props.open}
        onRequestClose={this.props.onRequestClose}
      >
        <br />
        <p>Do you have an idea?</p>
        <br />
        <HotKeys
          keyMap={this.keyMap}
          handlers={handlers}
        >
          <TextField
            floatingLabelText="Idea title"
            fullWidth
            underlineFocusStyle={textFieldStyles.underlineFocusStyle}
            floatingLabelFocusStyle={textFieldStyles.floatingLabelFocusStyle}
            value={this.state.idea}
            onChange={this.handleIdeaChange}
            autoFocus
          />
        </HotKeys>
      </Dialog>
    );
  }
}

export default NewIdeaDialog;
