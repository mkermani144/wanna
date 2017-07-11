import React, { PureComponent } from 'react';

import Actions from './Actions';
import './Idea.css';

class Idea extends PureComponent {
  constructor() {
    super();
    this.state = {
      class: '',
    };
  }
  handleRequestDelete = () => {
    this.setState({
      class: 'will-be-deleted',
    }, () => {
      setTimeout(() => {
        this.setState({
          class: '',
        }, () => {
          this.props.onRequestDelete(this.props.index);
          this.props.onRequestSnackbar('Idea deleted');
        });
      }, 1000);
    });
  }
  render() {
    return (
      <div className={`Idea ${this.state.class}`}>
        <p>{this.props.text}</p>
        <Actions
          onRequestConvertDialogOpen={() => this.props.onRequestConvertDialogOpen(this.props.index)}
          onRequestDelete={this.handleRequestDelete}
          onRequestEditDialogOpen={() => this.props.onRequestEditDialogOpen(this.props.index)}
        />
      </div>
    );
  }
}

export default Idea;
