import React, { Component } from 'react';
import { SortableTreeWithoutDndContext } from './src/index'; // 'react-sortable-tree';
import { connect } from 'react-redux';
import styles from './photon.css';
import coreStyles from './Core.css';

const path = require('path');
const dirTree = require('directory-tree');

class FileTree extends Component {

  constructor(props) {
    super(props);
    this.state = {
      treeData: this.getInitial()
    };
    this.getInitial = this.getInitial.bind(this);
    this.getUpdate = this.getUpdate.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  // for flow
  props: {
    workspace: {},
    setActiveComponent: ()=> void,
  };

  getUpdate() {
    this.setState({
      treeData: this.getInitial()
    });
  }

  componentDidUpdate() {
    const newData = this.getInitial();
    const oldData = this.state.treeData;
    if (newData[0].children.length !== oldData[0].children.length) {
      this.getUpdate();
    }
  }

  getInitial() {
    const treeStructure = this.props.workspace.components.workspace;
    const treeComponents = this.props.workspace.components;
    const treeData = [getTreeData(treeStructure)];
    function getTreeData(workspaceTree) {
      return {
        title: 'app',
        children: getChildrenData(workspaceTree.children),
        expanded: true,
        id: '0',
      };
    }

    function getChildrenData(childrenArray) {
      const childrenArrayFinal = [];
      for (let i = 0; i < childrenArray.length; i++) {
        const currComponent = treeComponents[childrenArray[i]];
        const currComponentChildren = currComponent.children;
        if (currComponentChildren.length !== 0) {
          childrenArrayFinal.push({
            title: currComponent.name,
            children: getChildrenData(currComponentChildren),
            expanded: true,
            id: currComponent.id,

          });
        } else {
          childrenArrayFinal.push({
            title: currComponent.name,
            expanded: true,
            id: currComponent.id,
          });
        }
      }
      return childrenArrayFinal;
    }
    return treeData;
  }
    // changes activeComponent
  handleClick(e, component) {
    this.props.setActiveComponent(component);
  }
  render() {
    const getData = this.props.workspace;
    return (
      <div style={{ height: '100%' }}>
        <SortableTreeWithoutDndContext
          treeDataRedux={getData}
          treeData={this.state.treeData}
          canDrag={false}
          onChange={(treeDataRedux) => this.setState({ treeData: treeDataRedux })}
          handleClick={this.handleClick}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    workspace: state.workspace
  };
}


export default connect(mapStateToProps)(FileTree);
