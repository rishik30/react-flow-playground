import React, { useCallback, useEffect } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, Controls, Background, BackgroundVariant, MarkerType, ConnectionLineType } from 'reactflow';

import 'reactflow/dist/style.css';
import LayoutFlow from './DagreTree';
import { initialEdgesRes, initialNodesRes } from './nodesEdges';
import TierCustomNode from './CustomNode/TierNode';
import WorkloadGroupIdentifier from './CustomNode/WorkloadGroupIdentifier';
import RuleNode from './CustomNode/RuleNode';
import { transformNodes } from './transformer';

// const initialNodes = [
//   { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
//   { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
//   { id: '3', position: { x: 100, y: 200 }, data: { label: '3',  } },
// ];
// const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }, { id: 'e2-3', source: '2', target: '3', animated: true, style: {stroke: 'red'} }];

const nodeTypes = {
  tierGroup: TierCustomNode,
  workloadGroupIdentifier: WorkloadGroupIdentifier,
  ruleNode: RuleNode
}

const defaultEdgeOptions = {
  animated: true, 
  type: ConnectionLineType.SmoothStep,
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 15,
    height: 15,
    color: '#D9DAE5'
  }, 
  style: {
    strokeWidth: 1,
    stroke: '#D9DAE5',
  }
}

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodesRes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdgesRes);

  useEffect(() => {
    console.log('NODES TRANSFOrMED', initialNodesRes)
  }, [])

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        fitView
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        proOptions={{hideAttribution: true}}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
      >
        <button style={{position: 'absolute', zIndex: 4}} onClick={() => {
          const newNode = {id: `${nodes.length + 1}`, position: {x: 70, y: 150}, data: {label: '4'} }
          setNodes(nds => nds.concat(newNode))
        }}>Add node</button>
        <Controls />
        <Background color='red' variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
      {/* <LayoutFlow /> */}
    </div>
  );
}