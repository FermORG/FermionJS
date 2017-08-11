import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FileSystem from '../components/FileSystem';
import * as FileSystemActions from '../actions/FileSystemActions';

function mapStateToProps(state) {
  return {
    workspace: state.workspace,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(FileSystemActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FileSystem);
