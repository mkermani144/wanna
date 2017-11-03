import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import changeTab from './actionCreators';
import Sidebar from './Sidebar';

const mapStateToProps = state => ({
  currentTab: state.appUI.currentTab,
});

const mapDispatchToProps = dispatch => bindActionCreators({ changeTab }, dispatch);

const SidebarContainer = connect(mapStateToProps, mapDispatchToProps)(Sidebar);

export default SidebarContainer;
