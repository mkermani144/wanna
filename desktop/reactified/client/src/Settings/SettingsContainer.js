import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from './actionCreators';

import Settings from './Settings';

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

const SettingsContainer = connect(null, mapDispatchToProps)(Settings);

export default SettingsContainer;
