import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

import { WORKSPACE_ID } from './../constants';
import { addChild, removeChild, moveChild } from '../actions/workspace';
import getVisComponent from '../components/VisComponents/exporter';
import dndComponentWrapper from '../drag-drop/wrapper-component';
import dropWorkspaceWrapper from '../drag-drop/wrapper-workspace';

class Workspace extends Component {
  renderDeep(componentIDList) {
    if (!Object.keys(componentIDList).length || !componentIDList) {
      return [];
    }

    const allComponents = this.props.components;
    
    return componentIDList.map((componentID) => {
      const componentData = allComponents[componentID];
      const CustomComponent = getVisComponent(componentData.name);
      const children = this.renderDeep(componentData.children);

      const wrappedComponent = (
        <div style={{ display: 'inline-block', margin: '0', padding: '0' }}>
          <CustomComponent {...componentData.props}>
            { children }
          </CustomComponent>
        </div>
      );

      const DndComponent = dndComponentWrapper(wrappedComponent);

      return (
        <DndComponent
          id={componentData.id}
          moveChild={this.props.moveChild}
          key={componentData.id}
        />
      );
    });
  }

  render() {
    const worskpaceChildren = this.props.components.workspace.children;
    const Workspace = () => (
      <div className = 'workspace' style={{ width: '100%', height: '100%', overflowY:'scroll' }}>
        { this.renderDeep(worskpaceChildren) }
      </div>
    );

    const WrappedWorkspace = dropWorkspaceWrapper(Workspace);

    return (
      <WrappedWorkspace id={WORKSPACE_ID} moveChild={this.props.moveChild} />
    );
  }
}



// Validate props
Workspace.propTypes = {
  workspace: PropTypes.object
};

function mapStateToProps(state) {
  return {
    components: state.workspace.components
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addChild, removeChild, moveChild }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Workspace);
