import React, { PureComponent } from 'react';
import Dialog from 'material-ui/Dialog';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import FlatButton from 'material-ui/FlatButton';
import { blue500, grey50 } from 'material-ui/styles/colors';

class CalendarSystemDialog extends PureComponent {
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
        onTouchTap={() => this.props.onRequestClose(this.props.calendarSystem)}
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
        title="Calendar system"
        titleStyle={dialogTitleStyle}
        contentStyle={dialogContentStyle}
        actions={actions}
        open={this.props.open}
        onRequestClose={() => this.props.onRequestClose(this.props.calendarSystem)}
      >
        <RadioButtonGroup
          name="calendarSystem"
          defaultSelected={this.props.calendarSystem}
          onChange={this.handleRequestClose}
        >
          <RadioButton
            label="EN-us"
            value="EN-us"
            style={radioButtonStyle}
          />
          <RadioButton
            label="IR-fa"
            value="IR-fa"
            style={radioButtonStyle}
          />
        </RadioButtonGroup>
      </Dialog>
    );
  }
}

export default CalendarSystemDialog;
