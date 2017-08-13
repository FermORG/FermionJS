import React, { Component } from 'react';
import PropTypes from 'prop-types';
import baseStyles from './node-renderer-default.scss';
import { isDescendant } from './utils/tree-data-utils';

const styles = baseStyles;
// Add extra classes in browsers that don't support flex


class NodeRendererDefault extends Component {

  componentDidMount() {
    const { toggleChildrenVisibility, node, path, treeIndex } = this.props;
    toggleChildrenVisibility({
      node,
      path,
      treeIndex,
    });
  }
  render() {
    const {
      scaffoldBlockPxWidth,
      toggleChildrenVisibility,
      connectDragPreview,
      connectDragSource,
      isDragging,
      canDrop,
      canDrag,
      node,
      draggedNode,
      path,
      treeIndex,
      isSearchMatch,
      isSearchFocus,
      buttons,
      className,
      style,
      didDrop,
      handleClick,
      clickKey,
      // storeID,
      /* eslint-disable no-unused-vars */
      isOver: _isOver, // Not needed, but preserved for other renderers
      parentNode: _parentNode, // Needed for drag-and-drop utils
      endDrag: _endDrag, // Needed for drag-and-drop utils
      startDrag: _startDrag, // Needed for drag-and-drop utils
      /* eslint-enable no-unused-vars */
      ...otherProps
    } = this.props;
    const { id } = node;
    // console.log('compID: ', id);
    // console.log('COMPNAME: ', node.title);

    let handle;

    const isDraggedDescendant = draggedNode && isDescendant(draggedNode, node);
    const isLandingPadActive = !didDrop && isDragging;

    return (
      <div style={{ height: '100%' }} {...otherProps}>
        {toggleChildrenVisibility &&
          node.children &&
          node.children.length > 0 &&
          <div>
            <button
              type="button"
              aria-label={node.expanded ? 'Collapse' : 'Expand'}
              className={
                node.expanded ? styles.collapseButton : styles.expandButton
              }

              style={{ left: -0.5 * scaffoldBlockPxWidth }}
              onClick={() =>
                toggleChildrenVisibility({
                  node,
                  path,
                  treeIndex,
                })}
            >
              <i className={`${node.expanded ? styles.colArrow : styles.expArrow} fa fa-caret-right`} />
            </button>

          </div>}

        <div className={styles.rowWrapper}>
          {/* Set the row preview to be used during drag and drop */}
          {/* connectDragPreview */(
            <div
              className={
                styles.row +
                (isLandingPadActive ? ` ${styles.rowLandingPad}` : '') +
                (isLandingPadActive && !canDrop
                  ? ` ${styles.rowCancelPad}`
                  : '') +
                (isSearchMatch ? ` ${styles.rowSearchMatch}` : '') +
                (isSearchFocus ? ` ${styles.rowSearchFocus}` : '') +
                (className ? ` ${className}` : '')
              }
              style={{
                opacity: isDraggedDescendant ? 0.5 : 1,
                ...style,
              }}
            >
              {/* {handle} */}
              <div
                className={
                  styles.rowContents +
                  (!canDrag ? ` ${styles.rowContentsDragDisabled}` : '')
                }
                onClick={(e) => {
                  console.log('key,', clickKey);
                  let component = clickKey - 1;
                  if (component <= 0) component = 0;
                  handleClick(e, String(id));
                }
                }
              >
                <div className={styles.rowLabel}>
                  {/* connectDragSource */(<span
                    className={
                      styles.rowTitle +
                      (node.subtitle ? ` ${styles.rowTitleWithSubtitle}` : '')
                    }
                  >
                    {typeof node.title === 'function'
                      ? node.title({
                        node,
                        path,
                        treeIndex,
                      })
                      : node.title}
                  </span>)}
                  {/* , {dropEffect: 'copy',} */}
                  {/* plug the above in after span tag to reenable DnD */}
                  {node.subtitle &&
                    <span className={styles.rowSubtitle}>
                      {typeof node.subtitle === 'function'
                        ? node.subtitle({
                          node,
                          path,
                          treeIndex,
                        })
                        : node.subtitle}
                    </span>}
                </div>

                <div className={styles.rowToolbar}>
                  {buttons.map((btn, index) =>
                    (<div
                      key={index} // eslint-disable-line react/no-array-index-key
                      className={styles.toolbarButton}
                    >
                      {btn}
                    </div>)
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

NodeRendererDefault.defaultProps = {
  isSearchMatch: false,
  isSearchFocus: false,
  canDrag: false,
  toggleChildrenVisibility: null,
  buttons: [],
  className: '',
  style: {},
  parentNode: null,
  draggedNode: null,
  canDrop: false,
};

NodeRendererDefault.propTypes = {
  node: PropTypes.shape({}).isRequired,
  path: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  treeIndex: PropTypes.number.isRequired,
  isSearchMatch: PropTypes.bool,
  isSearchFocus: PropTypes.bool,
  canDrag: PropTypes.bool,
  scaffoldBlockPxWidth: PropTypes.number.isRequired,
  toggleChildrenVisibility: PropTypes.func,
  buttons: PropTypes.arrayOf(PropTypes.node),
  className: PropTypes.string,
  style: PropTypes.shape({}),

  // Drag and drop API functions
  // Drag source
  // connectDragPreview: PropTypes.func.isRequired,
  // connectDragSource: PropTypes.func.isRequired,
  parentNode: PropTypes.shape({}), // Needed for drag-and-drop utils
  // startDrag: PropTypes.func.isRequired, // Needed for drag-and-drop utils
  // endDrag: PropTypes.func.isRequired, // Needed for drag-and-drop utils
  // isDragging: PropTypes.bool.isRequired,
  // didDrop: PropTypes.bool.isRequired,
  draggedNode: PropTypes.shape({}),
  // Drop target
  // isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool,
};

export default NodeRendererDefault;
