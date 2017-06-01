import React, { Component } from 'react';

import Idea from './Idea';

import './IdeaList.css';

class IdeaList extends Component {
  render() {
    return (
      <div className="IdeaList">
        <Idea
          text="Sample Idea"
        />
        <Idea
          text="Sample Idea"
        />
        <Idea
          text="Sample Idea"
        />
      </div>
    );
  }
}

export default IdeaList;
