import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { ItemTypes } from './item-types';
import { dragTarget, dropTarget } from './specification';
import { dragCollect, dropCollect } from './collectors';
import ReactResizeDetector from 'react-resize-detector';

// Connect and wrap
export default function (Component) {
  const dndConnectedComponent = (props) => {
    const { connectDragSource, connectDropTarget } = props;
    return connectDragSource(connectDropTarget(Component));
  };

  const dragWrappedComponent =
    DragSource(ItemTypes.COMPONENT, dragTarget, dragCollect)(dndConnectedComponent);
  const dndWrappedComponent =
    DropTarget(ItemTypes.COMPONENT, dropTarget, dropCollect)(dragWrappedComponent);
  return dndWrappedComponent;
}
