import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Right from '../components/Right';
import * as TabActions from '../actions/tabs';

function mapStateToProps(state) {
  return {
    activeTab: state.tabs.activeTab,
    tabs: state.tabs.tabs,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TabActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Right);
