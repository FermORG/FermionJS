let components = [
{
  id: 0,
  name: 'BlackBox',
  children: [],
  props: {
    style: {
      position: 'relative',
      zIndex: 1,
    },
    'zIndex': 'testProp',
  }
},
{
  id: 1,
  name: 'BlueBox',
  children: [],
  props: {
    style: {
      position: 'relative',
      height: '30px',
    },
  }
}
]
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
    this.components = components
  }
  convert(){
    return this.components.reduce((acc, component)=>{
      const cc = new ComponentConverter(component)
      acc.push({name: cc.name, code: cc.generateCode()})
      return acc
    }, [])
  }
}
// const w = new WorkspaceConverter(components)
// const converted = w.convert()
module.exports = WorkspaceConverter