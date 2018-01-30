import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import Snackbar from 'material-ui/Snackbar';
import shortid from 'shortid';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import Idea from './Idea';
import EditIdeaDialog from './EditIdeaDialog';
import ConvertIdeaDialog from './ConvertIdeaDialog';
import './IdeaList.css';
import './Animations.css';

class IdeaList extends Component {
  constructor() {
    super();
    this.state = {
      ideaDialogOpen: false,
      convertDialogOpen: false,
      snackbarOpen: false,
      snackbarMessage: '',
      index: -1,
      current: 5,
    };
    this.interval = null;
  }
  componentDidMount = () => {
    this.interval = setInterval(() => this.renderMore(), 0);
  }
  componentWillUnmount = () => {
    clearInterval(this.interval);
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
      end: taskInfo.end,
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
  renderMore = () => {
    if (this.state.current === this.props.ideas.length - 1) {
      clearInterval(this.interval);
    } else {
      this.setState(prev => ({ current: prev.current + 1 }));
    }
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
    return (
      <div
        className="IdeaList"
        style={
          this.props.sidebarExpanded ?
          marginStyles.expanded :
          marginStyles.mini
        }
        onScroll={this.handleScroll}
      >
        <CSSTransitionGroup
          className="transition-container"
          transitionName="ideas-empty-state"
          transitionEnterTimeout={170}
          transitionLeaveTimeout={150}
        >
          {!this.props.ideas.length &&
            <div
              className="ideas-empty-state"
            >
              <h1>
                Ideas gone
              </h1>
              <h4>
                Your ideas list is empty
              </h4>
            </div>
          }
        </CSSTransitionGroup>
        <CSSTransitionGroup
          transitionName="idea"
          transitionEnterTimeout={170}
          transitionLeaveTimeout={150}
        >
          {this.props.ideas.map((idea, index) => (index > this.state.current ?
            <div key={idea.id} className="Idea" /> :
            (
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
            )))
          }
        </CSSTransitionGroup>
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
          onActionClick={this.handleUndo}
          onRequestClose={this.handleRequestSnackbarClose}
        />
      </div>
    );
  }
}

export default IdeaList;
