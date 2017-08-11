class ComponentConverter {
  constructor(component) {
    this.component = component
  }
  get name(){
    return this.component.name
  }
  getImports(){
    return this.component.children.reduce((final, childName )=>{
      final += `import ${childName} from './${childName}'` + "\n"
      return final
    }, '')
  }
  getClass(){
    return `${this.component.name}`
  }
  getStyle(){
    if(!this.component.props) return
    let style = this.component.props.style
    return JSON.stringify(style)
  }

  getProps(){
    let props = Object.assign({}, this.component.props)
    delete props['style']
    return Object.keys(props).reduce((final, key)=>{
      final += `${key}="${props[key]}" `
      return final
    }, '')
  }
  generateCode(){
    return (
`
import React, { Component } from 'react'
${this.getImports()}
const divStyle = ${this.getStyle()}
class ${this.getClass()} extends Component { 
  constructor(props){
    super(props)
  }
  render(){
  <div
    style={divStyle}
    ${this.getProps()}
   >
    {children}
  </div>
  }
}
`
    )
  }
}
class WorkspaceConverter {
  constructor(components){
    let childcomps= Object.assign({}, components)
    delete childcomps['workspace']
    this.components = this.convertIDtoName(childcomps)
  }
  convertIDtoName(components){
    let converted = Object.keys(components).reduce((acc, id)=>{
      let newComponent = Object.assign({}, components[id])
      newComponent.children = components[id].children.map(childID =>{
        return components[childID].name
      })
      acc[id] = newComponent
      return acc
    }, {})
    return converted
  }
  convert(){
    return Object.keys(this.components).reduce((acc, key)=>{
      const cc = new ComponentConverter(this.components[key])
      acc.push({name: cc.name, code: cc.generateCode()})
      return acc
    }, [])
  }
}
module.exports = WorkspaceConverter