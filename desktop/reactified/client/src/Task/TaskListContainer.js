import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from './actionCreators';

import TaskList from './TaskList';

const mapStateToProps = state => ({ tasks: state.tasks, showNotYetTasks: state.showNotYetTasks });

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

const TaskListContainer = connect(mapStateToProps, mapDispatchToProps)(TaskList);

export default TaskListContainer;
