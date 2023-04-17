import React from 'react'

interface TierCustomNodeProps {
  data: any
}

const TierCustomNode: React.FC<TierCustomNodeProps> = ({data}) => {
  return (
    <div style={{
      background: '#1E272C',
      borderRadius: 5,
      border: '1px solid rgba(193, 158, 255, 0.5)',
      width: 300,
      height: 600
    }}>
      <div style={{
        background: 'rgba(193, 158, 255, 0.2)',
        textAlign: 'center',
        fontSize: 12,
        color: '#C19EFF'
      }}>{data.label}</div>
      <p style={{
        fontSize: 10,
        textAlign: 'right',
        padding: '0 10px'
      }}>Idle time: 10 min</p>
    </div>
  )
}

export default TierCustomNode