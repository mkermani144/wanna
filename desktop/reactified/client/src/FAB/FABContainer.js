import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from './actionCreators';

import FAB from './FAB';

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

const DashboardContainer = connect(null, mapDispatchToProps)(FAB);

export default DashboardContainer;
