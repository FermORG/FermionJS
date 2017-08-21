import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Core from '../components/Core';
import * as methodActions from '../actions/methods';

function mapStateToProps(state) {
  return {
    methods: state.workspace.methods,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(methodActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Core);
