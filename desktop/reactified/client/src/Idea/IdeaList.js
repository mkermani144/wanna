import React, { Component } from 'react';

import './IdeaList.css';

class IdeaList extends Component {
  render() {
    return (
      <div className="IdeaList">
        {this.props.children}
      </div>
    );
  }
}

export default IdeaList;
