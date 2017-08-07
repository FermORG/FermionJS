import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from './item-types';
import { dropTarget } from './specification';
import { dropCollect } from './collectors';
import coreStyles from '../components/Core.css';
// Connect and wrap
export default function (Workspace) {
  const divWrappedWorkspace =  (
    <div
      className={coreStyles.workspace}>
      <Workspace />
    </div>
  );

  const dropConnectedWorkspace = (props) => {
    const { connectDropTarget } = props;
    return connectDropTarget(divWrappedWorkspace);
  };

  let dropWrappedWorkspace =
    DropTarget(ItemTypes.COMPONENT, dropTarget, dropCollect)(dropConnectedWorkspace);
  return dropWrappedWorkspace;
}
