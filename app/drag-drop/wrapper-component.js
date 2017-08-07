import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { ItemTypes } from './item-types';
import { dragTarget, dropTarget } from './specification';
import { dragCollect, dropCollect } from './collectors';

// Connect and wrap
export default function (Component, props, children) {
  const divWrappedComponent = (
    <div style={{ display: 'inline-block', margin: '0', padding: '0' }}>
      <Component {...props}>
        { children }
      </Component>
    </div>
  );

  const dndConnectedComponent = (props) => {
    const { connectDragSource, connectDropTarget } = props;
    return connectDragSource(connectDropTarget(divWrappedComponent));
  };

  const dragWrappedComponent =
    DragSource(ItemTypes.COMPONENT, dragTarget, dragCollect)(dndConnectedComponent);
  const dndWrappedComponent =
    DropTarget(ItemTypes.COMPONENT, dropTarget, dropCollect)(dragWrappedComponent);
  return dndWrappedComponent;
}
