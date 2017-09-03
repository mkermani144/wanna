import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import Snackbar from 'material-ui/Snackbar';
import shortid from 'shortid';

import Idea from './Idea';
import EditIdeaDialog from './EditIdeaDialog';
import ConvertIdeaDialog from './ConvertIdeaDialog';
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
    const repetitionDays = taskInfo.repetition * taskInfo.repetitionValue;
    const id = shortid.generate();
    this.props.addTask({
      task: taskInfo.task,
      start: taskInfo.start,
      end: taskInfo.end + 86400000,
      estimation: taskInfo.estimation * taskInfo.estimationValue,
      repetition: repetitionDays,
      done: false,
      id,
    });
  }
  handleRequestSnackbarOpen = (message) => {
    this.setState({
      snackbarOpen: true,
      snackbarMessage: message,
    });
    this.props.raiseFab();
  }
  handleRequestSnackbarClose = () => {
    this.setState({
      snackbarOpen: false,
      snackbarMessage: '',
    });
    this.props.lowerFab();
  }
  handleUndo = () => {
    this.props.undo();
    this.handleRequestSnackbarClose();
  }
  render() {
    const marginStyles = {
      expanded: {
        marginLeft: 200,
      },
      mini: {
        marginLeft: 56,
      },
    };
    const emptyStateMarginStyles = {
      expanded: {
        marginLeft: 200,
      },
      mini: {
        marginLeft: 56,
      },
    };
    if (this.props.ideas.length === 0) {
      return (
        <div
          className="ideas-empty-state"
          style={
            this.props.sidebarExpanded ?
            emptyStateMarginStyles.expanded :
            emptyStateMarginStyles.mini
          }
        >
          <h1>
            Ideas gone
          </h1>
          <h4>
            Your ideas list is empty
          </h4>
          <Snackbar
            open={this.state.snackbarOpen}
            message={this.state.snackbarMessage}
            autoHideDuration={3000}
            action="undo"
            onActionTouchTap={this.handleUndo}
            onRequestClose={this.handleRequestSnackbarClose}
          />
        </div>
      );
    }
    return (
      <div
        className="IdeaList"
        style={
          this.props.sidebarExpanded ?
          marginStyles.expanded :
          marginStyles.mini
        }
      >
        {this.props.ideas.map((idea, index) => (
          <div key={idea.id}>
            <Idea
              text={idea.idea}
              index={index}
              onRequestEditDialogOpen={this.handleRequestIdeaDialogOpen}
              onRequestDelete={this.handleRequestIdeaDelete}
              onRequestConvertDialogOpen={this.handleRequestConvertDialogOpen}
              onRequestSnackbar={this.handleRequestSnackbarOpen}
            />
            <Divider />
          </div>
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
          calendarSystem={this.props.calendarSystem}
          firstDayOfWeek={this.props.firstDayOfWeek}
        />
        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.snackbarMessage}
          autoHideDuration={3000}
          action="undo"
          onActionTouchTap={this.handleUndo}
          onRequestClose={this.handleRequestSnackbarClose}
        />
      </div>
    );
  }
}

export default IdeaList;
