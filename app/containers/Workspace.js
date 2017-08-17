import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { addChild, removeChild, moveChild, updateStyle } from '../actions/workspace';
import { setActiveComponent } from '../actions/FileSystemActions';
import Workspace from '../components/Workspace';


function mapStateToProps(state) {
  return {
    components: state.workspace.components
  };
}

const actionCreators = { addChild, removeChild, moveChild, updateStyle, setActiveComponent };
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Workspace);
