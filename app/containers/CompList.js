import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CompList from '../components/CompList';
// import * as CompListActions from '../actions/complist';
// import * as workspaceActions from '../actions/workspace';
import * a workspaceActions from '../actions/workspace';

function mapStateToProps(state) {
  return {
    availableComponents: state.availableComponents,
    workspace: state.workspace,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(workspaceActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CompList);
