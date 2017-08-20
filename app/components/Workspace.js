import React, { Component } from 'react';
import PropTypes from 'prop-types';
import coreStyles from '../components/Core.scss';
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

  componentDidMount() {
    const { width, height } = document.getElementById(WORKSPACE_ID).getBoundingClientRect()
    this.props.updateStyle(WORKSPACE_ID, { width: `${width}px`, height: `${height}px` });
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

      const componentStyle = {
        ...componentData.props.style,
        width: '100%',
        height: '100%',
        left: null,
        top: null,
        overflow: 'hidden'
      };
      
      const [widthInt, heightInt] = [
        parseInt(componentData.props.style.width.split('px')[0], 10),
        parseInt(componentData.props.style.height.split('px')[0], 10)
      ];

      const DivWrappedComponent = (
        <div
          id="divwrappedcomp"
          style={componentStyle}
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
            width: widthInt + 3,
            height: heightInt + 3
          }}
          style={{  border: '1px solid white' }}
          minWidth={50}
          minHeight={50}
          bounds={"parent"}
          disableDragging={this.state.mode}
          onDragStart={(e) => {e.stopPropagation()}}
          onDragStop={(e, data) => {
            const [left, top] = [data.x, data.y];
            setTimeout(() => this.props.updateStyle(componentData.id, { left, top }), 0);
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
      <div id={WORKSPACE_ID} style={{ width: '100%', height: '100%' }}>
        {  this.renderDeep(worskpaceChildren) }
      </div>
      
    );

    const WrappedWorkspace = dropWorkspaceWrapper(Workspace, hideEditor);

    return (
      <div>
      <WrappedWorkspace
        id={WORKSPACE_ID}
        moveChild={this.props.moveChild}
        hideEditor={hideEditor}
      />
            {/* <button onClick={()=>{this.setState({ mode: !this.state.mode })}}>
        dnd mode
      </button>  */}

      </div>
    );
  }
}

// Validate props
Workspace.propTypes = {
  workspace: PropTypes.object,
};

export default Workspace;
