import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { ResizableBox } from 'react-resizable';

import { WORKSPACE_ID } from './../constants';
import { addChild, removeChild, moveChild, updateStyle } from '../actions/workspace';
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

      const [widthInt, heightInt] = [
        parseInt(componentData.props.style.width.split('%')[0], 10),
        parseInt(componentData.props.style.height.split('%')[0], 10)
      ];

      const CustomComponent = getVisComponent(componentData.name);
      const children = this.renderDeep(componentData.children);

      const wrappedComponent = (
        <div style={{ display: 'inline-block', margin: '0', padding: '0' }}>
          <ResizableBox
            width={widthInt}
            height={heightInt}
            onResizeStop={
              (e, data) => {
                const [newWidth, newHeight] = [`${data.size.width}px`, `${data.size.height}px`];
                this.props.updateStyle(componentData.id, { width: newWidth, height: newHeight });
              }
            }
          >
            <CustomComponent {...componentData.props}>
              { children }
            </CustomComponent>
          </ResizableBox>
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
      <div className="workspace" style={{ width: '100%', height: '100%', overflowY: 'scroll' }}>
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
  return bindActionCreators({ addChild, removeChild, moveChild, updateStyle }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Workspace);
