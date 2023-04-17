import React from 'react'
import { Handle, Position } from 'reactflow'

type RuleNodeType = 'input' | 'output' | 'default'

interface RuleNodeProps {
  data: any
}

const RuleNode: React.FC<RuleNodeProps> = ({data}) => {
  const {nodeType, label} = data
  return (
    <div style={{
      padding: 8,
      borderRadius: 3,
      width: 100,
      fontSize: 10,
      color: '#FDFDFD',
      textAlign: 'center',
      border: '1px solid #4D4D4D',
      backgroundColor: '#101517',
      position: 'relative'
}}>
      {nodeType !== 'input' && <Handle 
        type={"target"}
        position={Position.Left}
       />
      }
      <div style={{}}>{label}</div>
      <span style={{position: 'absolute', top: -5, left: -5, paddingRight: 4, paddingLeft: 4, background: '#89501B', fontSize: 8, borderRadius: 2}}>RULE 1</span>
      {nodeType !== 'output' && <Handle 
        type={'source'}
        position={Position.Right}
       />}
    </div>
  )
}

export default RuleNode