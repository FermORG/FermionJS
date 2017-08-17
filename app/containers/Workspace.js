import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../actions/workspace';
import { setActiveComponent } from '../actions/FileSystemActions';
import Workspace from '../components/Workspace';


function mapStateToProps(state) {
  return {
    components: state.workspace.components
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...actionCreators, setActiveComponent }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Workspace);
