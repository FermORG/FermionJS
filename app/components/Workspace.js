import React, { Component } from 'react';
import PropTypes from 'prop-types';
import coreStyles from '../components/Core.css';
import { DropTarget } from 'react-dnd';
import { DragDropContext } from 'react-dnd';
import Rnd from 'react-rnd';

import { WORKSPACE_ID } from './../constants';
import getVisComponent from '../components/VisComponents/exporter';
import dndComponentWrapper from '../drag-drop/wrapper-component';
import dropWorkspaceWrapper from '../drag-drop/wrapper-workspace';
import { addChild, removeChild, moveChild, updateStyle } from '../actions/workspace';
import { setActiveComponent } from '../actions/FileSystemActions';

class Workspace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: false
    }
  }

  renderDeep(componentIDList) {
    if (!Object.keys(componentIDList).length || !componentIDList) {
      return [];
    }

    const allComponents = this.props.components;

    return componentIDList.map((componentID) => {
      const componentData = allComponents[componentID];
      const CustomComponent = getVisComponent(componentData.name);
      const children = this.renderDeep(componentData.children);

      /**
       * Change component width and height to 100%
       * Actual width and height gets set on ResizableBox wrapper
       */
      const componentStyle = {
        ...componentData.props.style,
        width: '100%',
        height: '100%'
      };

      
      /**
       * Since ResizableBox takes integer width and heights,
       * we extract them from the strings suffixed with 'px'
       */
      const [widthInt, heightInt] = [
        parseInt(componentData.props.style.width.split('px')[0], 10),
        parseInt(componentData.props.style.height.split('px')[0], 10)
      ];

      /**
       * Wrap CustomComponent with a ResizableBox and an outer div
       * to be prepared to be wrapped again by the drag and drop wrapper
       */
      const DivWrappedComponent = (
        <div
          id="divwrappedcomp"
          style={{ 
            ...componentData.props.style,
            left: null,
            top: null,
          }}
          onClick={(e) => {
            e.stopPropagation();
            this.props.setActiveComponent(componentData.id.toString());
          }}
        >
          <CustomComponent {...componentData.props} style={componentStyle}>
            { children }
          </CustomComponent>
        </div>
      );

      const DndComponent = this.state.mode ? 
        dndComponentWrapper(DivWrappedComponent) : () => DivWrappedComponent;

      return (
        <Rnd
          key={componentData.id} 
          default={{
            x: componentData.props.style.left || 0,
            y: componentData.props.style.top || 0,
            width: widthInt,
            height: heightInt
          }}
          style={{
            border: '1px solid red'
          }}
          minWidth={50}
          minHeight={50}
          bounds={"parent"}
          disableDragging={this.state.mode}
          onDragStart={(e) => {e.stopPropagation()}}
          onDragStop={(e, data) => {
            setTimeout(
              () => this.props.updateStyle(componentData.id, { left: data.x, top: data.y }), 0
            );
          }}
          onResizeStop={(e, dir, ref, delta) => {
            const { width, height } = ref.style;
            setTimeout(() => this.props.updateStyle(componentData.id, { width, height }), 0);
          }}
        >
          <DndComponent
            id={componentData.id}
            moveChild={this.props.moveChild}
          />
        </ Rnd>
      );
    });
  }

  render() {
    const worskpaceChildren = this.props.components.workspace.children;
    const { hideEditor } = this.props;
    const Workspace = () => (
      <div id="test" style={{ width: '100%', height: '100%', overflowY: 'scroll' }}>
        {  this.renderDeep(worskpaceChildren) }
      </div>
    );

    const WrappedWorkspace = dropWorkspaceWrapper(Workspace, hideEditor);

    return (
      <WrappedWorkspace
        id={WORKSPACE_ID}
        moveChild={this.props.moveChild}
        hideEditor={hideEditor}
      />
    );
  }
}

// Validate props
Workspace.propTypes = {
  workspace: PropTypes.object,
};

export default Workspace;
