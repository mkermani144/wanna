import React, { Component } from 'react';

import IdeaContainer from './IdeaContainer';

import './IdeaList.css';

class IdeaList extends Component {
  render() {
    return (
      <div className="IdeaList">
        <IdeaContainer
          text="Sample Idea"
        />
        <IdeaContainer
          text="Sample Idea"
        />
        <IdeaContainer
          text="Sample Idea"
        />
      </div>
    );
  }
}

export default IdeaList;
