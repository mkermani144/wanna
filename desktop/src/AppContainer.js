import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import changeTab from './Sidebar/actionCreators';
import App from './App';
import store from './store';

const mapStateToProps = state => ({
  currentTab: state.appUI.currentTab,
});

const mapDispatchToProps = dispatch => bindActionCreators({ changeTab }, dispatch);

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

const AppContainerWithStore = props => (
  <AppContainer {...props} store={store} />
);

export default AppContainerWithStore;
