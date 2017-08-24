import React, { Component } from 'react';
import PropTypes from 'prop-types';
import coreStyles from '../components/Core.scss';
import { DropTarget } from 'react-dnd';
import { DragDropContext } from 'react-dnd';
import Rnd from 'react-rnd';

import { WORKSPACE_ID, STATIC_INNER_COMPONENT_STYLE } from './../constants';
import getVisComponent from '../components/VisComponents/exporter';
import dndComponentWrapper from '../drag-drop/wrapper-component';
import dropWorkspaceWrapper from '../drag-drop/wrapper-workspace';
import { setActiveComponent } from '../actions/FileSystemActions';
import { pixelsToInt } from '../utilities/helperFunctions';

class Workspace extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: false,
      activeComp: this.props.workspace.activeComponent
    }

    this.onResizeStopHandler = this.onResizeStopHandler.bind(this);
  }

  componentDidMount() {
    const { activeComponent } = this.props.workspace;
    document.body.onkeydown = (event) => {
      if (event.ctrlKey && event.keyCode === 46) this.props.deleteComponent(activeComponent)
    };


    const { width, height } = document.getElementById(WORKSPACE_ID).getBoundingClientRect();
    this.props.updateStyle(WORKSPACE_ID, { width: `${width}px`, height: `${height}px` });
  }

  renderDeep(componentIDList) {
    if (!Object.keys(componentIDList).length || !componentIDList) return [];

    const allComponents = this.props.workspace.components;

    return componentIDList.map((componentID) => {
      const componentData = allComponents[componentID];
      const CustomComponent = getVisComponent(componentData.name);
      const children = this.renderDeep(componentData.children);

      const [widthInt, heightInt] = [
        pixelsToInt(componentData.props.style.width), 
        pixelsToInt(componentData.props.style.height)
      ];

      const innerComponentStyle = { ...componentData.props.style, ...STATIC_INNER_COMPONENT_STYLE };
      
      const DivWrappedComponent = (
        <div
          id="divwrappedcomp"
          style={innerComponentStyle}
          onClick={(e) => {
            e.stopPropagation();
            this.props.setActiveComponent(componentData.id.toString());
          }}
        >
          <CustomComponent {...componentData.props} style={innerComponentStyle}>
            { children }
          </CustomComponent>
        </div>
      );
      
      const DndComponent = this.props.freeMoveMode ? 
        () => DivWrappedComponent : dndComponentWrapper(DivWrappedComponent);
        
      return (
        <Rnd
          key={componentData.id} 
          default={{
            x: componentData.props.style.left || 0,
            y: componentData.props.style.top || 0,
            width: widthInt,
            height: heightInt
          }}
          style={{  border: '1px solid white' }}
          minWidth={50}
          minHeight={50}
          bounds={"parent"}
          disableDragging={!this.props.freeMoveMode}
          onDragStart={e => {e.stopPropagation(); if(componentData.id.toString() !== this.state.activeComp) this.props.setActiveComponent(componentData.id.toString())}}
          onDragStop={(e, data) => {
            const [left, top] = [data.x, data.y];
            setTimeout(() => this.props.updateStyle(componentData.id, { left, top }), 0);
          }}
          onResizeStart={()=> this.props.setActiveComponent(componentData.id.toString())}
          onResizeStop={(e, dir, ref, delta) => this.onResizeStopHandler(componentData, ref)}
        >
          <DndComponent
            id={componentData.id}
            moveComponent={this.props.moveComponent}
          />
        </ Rnd>
      );
    });
  }

  onResizeStopHandler(componentData, ref) {
    const allComponents = this.props.workspace.components;
    
    let [resizeWidth, resizeHeight] = 
      [ref.style.width, ref.style.height].map(elem => parseInt(elem, 0));
    
    componentData.children.forEach((childID) => {
      const childStyle = allComponents[childID].props.style;
      
      const [childWidth, childHeight] = 
        [childStyle.width, childStyle.height].map(elem => pixelsToInt(elem));

      const [childLeft, childTop] = [childStyle.left, childStyle.top];

      if (childWidth + childLeft > resizeWidth) resizeWidth = childWidth + childLeft;
      if (childHeight + childTop > resizeHeight) resizeHeight = childHeight + childTop;
    });

    setTimeout(() => 
      this.props.updateStyle(componentData.id, { 
        width: `${resizeWidth}px`,
        height: `${resizeHeight}px` 
      }), 0);
  }

  render() {
    const worskpaceChildren = this.props.workspace.components.workspace.children;
    const { hideEditor, moveComponent } = this.props;
    const Workspace = () => (
      <div id={WORKSPACE_ID} style={{ width: '100%', height: '100%' }}>
        { this.renderDeep(worskpaceChildren) }
      </div>     
    );
    
    const WrappedWorkspace = dropWorkspaceWrapper(Workspace, hideEditor);

    return (
      <div>
        <WrappedWorkspace
          id={WORKSPACE_ID}
          moveComponent={moveComponent}
          hideEditor={hideEditor}
        />
      </div>
    );
  }
}

// Validate props
Workspace.propTypes = {
  workspace: PropTypes.object,
};

export default Workspace;
