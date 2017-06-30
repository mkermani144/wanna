import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from './actionCreators';
import IdeaList from './IdeaList';

const mapStateToProps = state => ({
  ideas: state.ideas.present,
  calendarSystem: state.appProperties.calendarSystem.present,
  firstDayOfWeek: state.appProperties.firstDayOfWeek.present,
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

const IdeaListContainer = connect(mapStateToProps, mapDispatchToProps)(IdeaList);

export default IdeaListContainer;
