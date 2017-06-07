import React, { Component } from 'react';

import Idea from './Idea';

import EditIdeaDialog from './EditIdeaDialog';

import './IdeaList.css';

class IdeaList extends Component {
  constructor() {
    super();
    this.state = {
      ideaDialogOpen: false,
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
  render() {
    return (
      <div className="IdeaList">
        {this.props.ideas.map((idea, index) => (
          <Idea
            text={idea.idea}
            onRequestEditDialogOpen={this.handleRequestIdeaDialogOpen}
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
      </div>
    );
  }
}

export default IdeaList;
