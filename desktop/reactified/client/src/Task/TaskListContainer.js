import { connect } from 'react-redux';

import TaskList from './TaskList';

const mapStateToProps = state => ({ state });

const TaskListContainer = connect(mapStateToProps, null)(TaskList);

export default TaskListContainer;
