import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from './actionCreators';

import Task from './Task';

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

const TaskContainer = connect(null, mapDispatchToProps)(Task);

export default TaskContainer;
