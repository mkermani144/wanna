import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from './actionCreators';

import Settings from './Settings';

const mapStateToProps = state => ({
  fullscreen: state.appProperties.fullscreen,
  showNotYetTasks: state.appProperties.showNotYetTasks
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

const SettingsContainer = connect(mapStateToProps, mapDispatchToProps)(Settings);

export default SettingsContainer;
