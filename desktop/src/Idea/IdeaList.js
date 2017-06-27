import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';
import shortid from 'shortid';

import Idea from './Idea';
import EditIdeaDialog from './EditIdeaDialog';
import ConvertIdeaDialog from './ConvertIdeaDialog';
import * as time from '../lib/time';
import './IdeaList.css';

class IdeaList extends Component {
  constructor() {
    super();
    this.state = {
      ideaDialogOpen: false,
      convertDialogOpen: false,
      snackbarOpen: false,
      snackbarMessage: '',
      index: -1,
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.ideaDialogOpen !== nextState.ideaDialogOpen) {
      return true;
    }
    if (this.state.convertDialogOpen !== nextState.convertDialogOpen) {
      return true;
    }
    if (this.state.snackbarOpen !== nextState.snackbarOpen) {
      return true;
    }
    if (JSON.stringify(this.props) !== JSON.stringify(nextProps)) {
      return true;
    }
    return false;
  }
  handleRequestIdeaDialogClose = () => {
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
    this.handleRequestIdeaDialogClose();
  }
  handleRequestIdeaDelete = (index) => {
    this.props.deleteIdea(index);
  }
  handleRequestConvertDialogClose = () => {
    this.setState({
      convertDialogOpen: false,
    });
  }
  handleRequestConvertDialogDelete = () => {
    this.props.deleteIdea(this.state.index);
  }
  handleRequestConvertDialogOpen = (index) => {
    this.setState({
      convertDialogOpen: true,
      index,
    });
  }
  handleRequestIdeaConvert = (taskInfo) => {
    const startDays = taskInfo.start * taskInfo.startValue;
    const periodDays = taskInfo.period * taskInfo.periodValue;
    const repetitionDays = taskInfo.repetition * taskInfo.repetitionValue;
    const start = time.addDays(time.today(), startDays);
    const end = time.addDays(start, periodDays);
    const id = shortid.generate();
    this.props.addTask({
      task: taskInfo.task,
      start,
      end,
      estimation: taskInfo.estimation * taskInfo.estimationValue,
      repetition: repetitionDays,
      id,
    });
  }
  handleRequestSnackbarOpen = (message) => {
    this.setState({
      snackbarOpen: true,
      snackbarMessage: message,
    });
  }
  handleRequestSnackbarClose = () => {
    this.setState({
      snackbarOpen: false,
      snackbarMessage: '',
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
            onRequestConvertDialogOpen={this.handleRequestConvertDialogOpen}
            onRequestSnackbar={this.handleRequestSnackbarOpen}
            index={index}
            key={idea.id}
          />
        ))}
        <EditIdeaDialog
          onRequestClose={this.handleRequestIdeaDialogClose}
          onRequestEdit={this.handleRequestIdeaEdit}
          idea={this.props.ideas[this.state.index] ?
            this.props.ideas[this.state.index].idea :
            null
          }
          open={this.state.ideaDialogOpen}
        />
        <ConvertIdeaDialog
          onRequestClose={this.handleRequestConvertDialogClose}
          onRequestDelete={this.handleRequestConvertDialogDelete}
          onRequestConvert={this.handleRequestIdeaConvert}
          idea={this.props.ideas[this.state.index] ?
            this.props.ideas[this.state.index].idea :
            null
          }
          open={this.state.convertDialogOpen}
        />
        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.snackbarMessage}
          autoHideDuration={3000}
          onRequestClose={this.handleRequestSnackbarClose}
        />
      </div>
    );
  }
}

export default IdeaList;
