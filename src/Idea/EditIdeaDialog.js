import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { yellow800, grey50 } from 'material-ui/styles/colors';

import disableSelectTextStyle from '../globalStyle';

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
        id="edit"
        label="Edit"
        primary
        disabled={!(this.state.idea)}
        onTouchTap={this.handleRequestEdit}
      />,
      <FlatButton
        label="Cancel"
        primary
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
      <Dialog
        className="EditIdeaDialog"
        title="Edit idea"
        actions={actions}
        titleStyle={dialogTitleStyle}
        open={this.props.open}
        onRequestClose={this.props.onRequestClose}
      >
        <br />
        Edit you idea
        <br />
        <TextField
          inputStyle={disableSelectTextStyle}
          floatingLabelText="Idea title"
          fullWidth
          underlineFocusStyle={textFieldStyles.underlineFocusStyle}
          floatingLabelFocusStyle={textFieldStyles.floatingLabelFocusStyle}
          defaultValue={this.props.idea}
          onChange={this.handleIdeaChange}
          autoFocus
        />
      </Dialog>
    );
  }
}

export default EditIdeaDialog;
