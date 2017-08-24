import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Core from '../components/Core';
import * as methodActions from '../actions/methods';
import { deleteComponent } from '../actions/workspace';

function mapStateToProps(state) {
  return {
    methods: state.workspace.methods,
    activeComponent: state.workspace.activeComponent
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...methodActions, deleteComponent }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Core);
