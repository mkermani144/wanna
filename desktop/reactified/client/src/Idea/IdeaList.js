import React, { Component } from 'react';

import IdeaContainer from './IdeaContainer';

import './IdeaList.css';

class IdeaList extends Component {
  render() {
    return (
      <div className="IdeaList">
        {this.props.ideas.map(idea => (
          <IdeaContainer
            text={idea.idea}
          />
        ))}
      </div>
    );
  }
}

export default IdeaList;
