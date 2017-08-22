import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from './item-types';
import { dropTarget } from './specification';
import { dropCollect } from './collectors';
import coreStyles from '../components/Core.scss';
// Connect and wrap
export default function (Workspace, hideEditor) {
  const divWrappedWorkspace = (
    <div
      className={` ${hideEditor ? coreStyles.workspace : coreStyles.showEditor}`}
    >
      <Workspace />
    </div>
  );

  const dropConnectedWorkspace = (props) => {
    const { connectDropTarget } = props;
    return connectDropTarget(divWrappedWorkspace);
  };

  const dropWrappedWorkspace =
    DropTarget(ItemTypes.COMPONENT, dropTarget, dropCollect)(dropConnectedWorkspace);
  return dropWrappedWorkspace;
}
