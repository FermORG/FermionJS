import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

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
      console.log('AC: ', allComponents);
    return componentIDList.map((componentID) => {
      const component = allComponents[componentID];
      const CustomComponent = getVisComponent(component.name);
      const children = this.renderDeep(component.children);
      const DndComponent = dndComponentWrapper(CustomComponent, component.style, children);

      return (
        <DndComponent
          id={component.id}
          moveChild={this.props.moveChild}
          key={component.id}
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
