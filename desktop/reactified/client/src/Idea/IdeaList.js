import React, { Component } from 'react';

import Snackbar from 'material-ui/Snackbar';

import Idea from './Idea';

import EditIdeaDialog from './EditIdeaDialog';

import './IdeaList.css';

class IdeaList extends Component {
  constructor() {
    super();
    this.state = {
      ideaDialogOpen: false,
      snackbarOpen: false,
      snackbarMessage: '',
      index: -1,
    };
  }
  handleRequestClose = () => {
    this.setState({
      ideaDialogOpen: false,
    });
  }
  handleRequestIdeaDialogOpen = (index) => {
    this.setState({
      ideaDialogOpen: true,
      index,
    });
  }
  handleRequestIdeaEdit = (ideaInfo) => {
    this.props.editIdea(this.state.index, {
      idea: ideaInfo.idea,
    });
    this.handleRequestClose();
  }
  handleRequestIdeaDelete = (index) => {
    this.props.deleteIdea(index);
  }
  handleRequestSnackbar = (message) => {
    this.setState({
      snackbarOpen: true,
      snackbarMessage: message,
    });
  }
  render() {
    return (
      <div className="IdeaList">
        {this.props.ideas.map((idea, index) => (
          <Idea
            text={idea.idea}
            onRequestEditDialogOpen={this.handleRequestIdeaDialogOpen}
            onRequestDelete={this.handleRequestIdeaDelete}
            onRequestSnackbar={this.handleRequestSnackbar}
            index={index}
            key={index}
          />
        ))}
        <EditIdeaDialog
          onRequestClose={this.handleRequestClose}
          onRequestEdit={this.handleRequestIdeaEdit}
          idea={this.props.ideas[this.state.index] ?
            this.props.ideas[this.state.index].idea :
            null
          }
          open={this.state.ideaDialogOpen}
        />
        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.snackbarMessage}
          autoHideDuration={3000}
        />
      </div>
    );
  }
}

export default IdeaList;
