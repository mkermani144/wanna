import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from './actionCreators';

import FAB from './FAB';

const mapStateToProps = state => ({ calendarSystem: state.appProperties.calendarSystem });

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

const FABContainer = connect(mapStateToProps, mapDispatchToProps)(FAB);

export default FABContainer;
