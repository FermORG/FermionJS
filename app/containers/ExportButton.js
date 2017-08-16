import { connect } from 'react-redux';
import ExportButton from '../components/ExportButton';

function mapStateToProps(state) {
  return {
    components: state.workspace.components
  };
}

export default connect(mapStateToProps, {})(ExportButton);
