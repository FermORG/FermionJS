export function dragCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

export function dropCollect(connect, monitor) {
  console.log('watdafaq')
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}
