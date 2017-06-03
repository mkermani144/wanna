import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from './actionCreators';

import Idea from './Idea';

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

const IdeaContainer = connect(null, mapDispatchToProps)(Idea);

export default IdeaContainer;
