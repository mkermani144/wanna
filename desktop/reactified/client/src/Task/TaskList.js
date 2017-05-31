import React, { Component } from 'react';

import './TaskList.css';

class TaskList extends Component {
  render() {
    return (
      <div className="TaskList">
        {this.props.children}
      </div>
    );
  }
}

export default TaskList;
