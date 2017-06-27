import React, { PureComponent } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { yellow800, grey50 } from 'material-ui/styles/colors';

class EditIdeaDialog extends PureComponent {
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
      <div className="EditIdeaDialog">
        <Dialog
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
            floatingLabelText="Idea title"
            fullWidth
            underlineFocusStyle={textFieldStyles.underlineFocusStyle}
            floatingLabelFocusStyle={textFieldStyles.floatingLabelFocusStyle}
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
