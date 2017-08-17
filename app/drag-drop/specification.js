export const dragTarget = {
  canDrag(props, monitor) {
    return !props.resizing;
  },
  beginDrag(props) {
    return { id: props.id };
  },
  endDrag(props, monitor) {
    if (!monitor.didDrop()) return;
    const targetID = monitor.getDropResult().id;
    const sourceID = props.id;
    props.moveChild(sourceID, targetID);
  }
};

export const dropTarget = {
  drop(props, monitor) {
    if (monitor.didDrop()) return;
    return { id: props.id };
  }
};
