import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import FlatButton from 'material-ui/FlatButton';
import { blue500, grey50 } from 'material-ui/styles/colors';

class FirstDayOfWeekDialog extends Component {
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
        onTouchTap={() => this.props.onRequestClose(this.props.firstDayOfWeek)}
      />,
    ];
    const dialogContentStyle = {
      maxWidth: 256,
      MozUserSelect: 'none', /* Firefox */
      MsUserSelect: 'none', /* Internet Explorer */
      KhtmlUserSelect: 'none', /* KHTML browsers (e.g. Konqueror) */
      WebkitUserSelect: 'none', /* Chrome, Safari, and Opera */
      WebkitTouchCallout: 'none', /* Disable Android and iOS callouts */
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
        title="First day of week"
        titleStyle={dialogTitleStyle}
        contentStyle={dialogContentStyle}
        actions={actions}
        open={this.props.open}
        onRequestClose={() => this.props.onRequestClose(this.props.firstDayOfWeek)}
      >
        <RadioButtonGroup
          name="firstDayOfWeek"
          defaultSelected={`${this.props.firstDayOfWeek}`}
          onChange={this.handleRequestClose}
        >
          <RadioButton
            label="Saturday"
            value="6"
            style={radioButtonStyle}
          />
          <RadioButton
            label="Sunday"
            value="0"
            style={radioButtonStyle}
          />
          <RadioButton
            label="Monday"
            value="1"
            style={radioButtonStyle}
          />
        </RadioButtonGroup>
      </Dialog>
    );
  }
}

export default FirstDayOfWeekDialog;
