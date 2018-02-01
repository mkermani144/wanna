import React, { PureComponent } from 'react';

import Actions from './Actions';
import './Idea.css';

class Idea extends PureComponent {
  state = { class: '' };

  handleRequestDelete = () => {
    this.props.onRequestDelete && this.props.onRequestDelete(this.props.index);
    this.props.onRequestSnackbar && this.props.onRequestSnackbar('Idea deleted');
  }
  render() {
    return (
      <div className={`Idea ${this.state.class}`}>
        <p>{this.props.text}</p>
        <Actions
          onRequestEditDialogOpen={() => this.props.onRequestEditDialogOpen(this.props.index)}
          onRequestDelete={this.handleRequestDelete}
          onRequestConvertDialogOpen={() => this.props.onRequestConvertDialogOpen(this.props.index)}
        />
      </div>
    );
  }
}

export default Idea;
