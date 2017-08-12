import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import styles from './tree-node.scss';

class TreeNode extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const {
      children,
      listIndex,
      swapFrom,
      swapLength,
      swapDepth,
      scaffoldBlockPxWidth,
      lowerSiblingCounts,
      connectDropTarget,
      isOver,
      draggedNode,
      canDrop,
      treeIndex,
      /* eslint-disable no-unused-vars */
      customCanDrop: _customCanDrop, // Delete from otherProps
      dragHover: _dragHover, // Delete from otherProps
      getNodeKey: _getNodeKey, // Delete from otherProps
      getPrevRow: _getPrevRow, // Delete from otherProps
      maxDepth: _maxDepth, // Delete from otherProps
      node: _node, // Delete from otherProps
      path: _path, // Delete from otherProps
      treeData: _treeData, // Delete from otherProps
      /* eslint-enable no-unused-vars */
      ...otherProps
    } = this.props;

    // Construct the scaffold representing the structure of the tree
     const scaffoldBlockCount = lowerSiblingCounts.length;
    //  const scaffold = [];

    return connectDropTarget(
      <div {...otherProps} className={styles.node}>
        {/* {scaffold} */}
        <div
          className={styles.nodeContent}
          style={{ left: scaffoldBlockPxWidth * scaffoldBlockCount }}
          // onClick={()=>{this.props.onClick(String(this.props.treeIndex - 1))}}
        >
          {Children.map(children, child =>
            cloneElement(child, {
              isOver,
              canDrop,
              draggedNode,
            })
          )}
        </div>
      </div>
    );
  }
}

TreeNode.defaultProps = {
  swapFrom: null,
  swapDepth: null,
  swapLength: null,
  canDrop: false,
  draggedNode: null,
  customCanDrop: null,
  maxDepth: null,
  treeData: null,
};

TreeNode.propTypes = {
  treeIndex: PropTypes.number.isRequired,
  node: PropTypes.shape({}).isRequired,
  path: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  swapFrom: PropTypes.number,
  swapDepth: PropTypes.number,
  swapLength: PropTypes.number,
  scaffoldBlockPxWidth: PropTypes.number.isRequired,
  lowerSiblingCounts: PropTypes.arrayOf(PropTypes.number).isRequired,

  listIndex: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,

  // Drop target
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool,
  draggedNode: PropTypes.shape({}),

  customCanDrop: PropTypes.func, // used in drag-and-drop-utils
  dragHover: PropTypes.func.isRequired, // used in drag-and-drop-utils
  getNodeKey: PropTypes.func.isRequired, // used in drag-and-drop-utils
  getPrevRow: PropTypes.func.isRequired, // used in drag-and-drop-utils
  maxDepth: PropTypes.number, // used in drag-and-drop-utils
  treeData: PropTypes.arrayOf(PropTypes.object), // used in drag-and-drop-utils
};

export default TreeNode;
