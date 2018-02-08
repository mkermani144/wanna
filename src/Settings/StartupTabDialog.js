import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import FlatButton from 'material-ui/FlatButton';
import { blue500, grey50 } from 'material-ui/styles/colors';

class StartupTabDialog extends Component {
  handleRequestClose = (e, target) => {
    setTimeout(() => {
      this.props.onRequestClose(target);
    }, 300);
  }
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onClick={() => this.props.onRequestClose(this.props.startupTab)}
      />,
    ];
    const dialogContentStyle = {
      maxWidth: 256,
    };
    const radioButtonStyle = {
      marginTop: 16,
    };
    const dialogTitleStyle = {
      backgroundColor: blue500,
      color: grey50,
    };
    return (
      <Dialog
        title="Startup tab"
        titleStyle={dialogTitleStyle}
        contentStyle={dialogContentStyle}
        actions={actions}
        open={this.props.open}
        onRequestClose={() => this.props.onRequestClose(this.props.startupTab)}
      >
        <RadioButtonGroup
          name="startupTab"
          defaultSelected={this.props.startupTab}
          onChange={this.handleRequestClose}
        >
          <RadioButton
            label="tasks"
            value="tasks"
            style={radioButtonStyle}
          />
          <RadioButton
            label="ideas"
            value="ideas"
            style={radioButtonStyle}
          />
        </RadioButtonGroup>
      </Dialog>
    );
  }
}

export default StartupTabDialog;
