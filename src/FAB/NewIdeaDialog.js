import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { yellow800, grey50 } from 'material-ui/styles/colors';

import disableSelectTextStyle from '../globalStyle';

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
        onTouchTap={this.handleRequestFinish}
      />,
      <FlatButton
        id="add-and-continue"
        label="Add and continue"
        primary
        disabled={!(this.state.idea)}
        onTouchTap={this.handleRequestAdd}
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
      MozUserSelect: 'none', /* Firefox */
      MsUserSelect: 'none', /* Internet Explorer */
      KhtmlUserSelect: 'none', /* KHTML browsers (e.g. Konqueror) */
      WebkitUserSelect: 'none', /* Chrome, Safari, and Opera */
      WebkitTouchCallout: 'none', /* Disable Android and iOS callouts */
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
        className="NewIdeaDialog"
        title="Add new idea"
        actions={actions}
        titleStyle={dialogTitleStyle}
        open={this.props.open}
        onRequestClose={this.props.onRequestClose}
      >
        <br />
        <span style={disableSelectTextStyle}>Do you have an idea?</span>
        <br />
        <TextField
          inputStyle={disableSelectTextStyle}
          floatingLabelText="Idea title"
          fullWidth
          underlineFocusStyle={textFieldStyles.underlineFocusStyle}
          floatingLabelFocusStyle={textFieldStyles.floatingLabelFocusStyle}
          value={this.state.idea}
          onChange={this.handleIdeaChange}
          autoFocus
        />
      </Dialog>
    );
  }
}

export default NewIdeaDialog;
