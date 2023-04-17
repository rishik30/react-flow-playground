import React, { useCallback, useRef, useState } from "react";
import ReactFlow, {
  addEdge,
  ConnectionLineType,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  BackgroundVariant,
  MarkerType,
  ReactFlowInstance,
} from "reactflow";
import dagre from "dagre";
import "reactflow/dist/style.css";

import { initialNodesRes, initialEdges, initialEdgesRes } from "./nodesEdges";

import "./index.css";
import CustomEdge from "./CustomEdge";

const dagreGraph = new dagre.graphlib.Graph({compound: true});
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;
const groupNodeWidth = 300;
const groupNodeHeight = 500;

let groupx = 0

const getLayoutedElements = (nodes, edges, direction = "LR") => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: node.type === 'group' ? groupNodeWidth : nodeWidth, height: node.type === 'group' ? groupNodeHeight : nodeHeight });
    if (node.type !== 'group') {
      dagreGraph.setParent(node.id, node.parentNode)
    }
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);
  console.log({dagreGraph})

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? "left" : "top";
    node.sourcePosition = isHorizontal ? "right" : "bottom";

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    if (node.type === 'group') {
      node.position = {
        x: groupx,
        y: 0,
      }
      groupx += 300
      node.width = 300
      node.height = 500
    }  else {
      node.position = {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      };
    }

    return node;
  });

  return { nodes, edges };
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodesRes,
  initialEdgesRes
);

const edgeTypes = {
  custom: CustomEdge,
};

const LayoutFlow = () => {
  const [reactFlowRef, setReactFlowRef] = useState<ReactFlowInstance | null>(null)
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          { ...params, type: ConnectionLineType.Bezier, animated: true },
          eds
        )
      ),
    []
  );
  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges]
  );

  return (
    <div className="layoutflow">
      <ReactFlow
        onInit={setReactFlowRef}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionLineType={ConnectionLineType.Bezier}
        fitView
        edgeTypes={edgeTypes}
        defaultEdgeOptions={{
          animated: false, 
          markerEnd: {
            type: MarkerType.Arrow,
            width: 15,
            height: 15,
            color: '#FF0072'
          }, 
          style: {
            strokeWidth: 2,
            stroke: '#FF0072',
          }
        }}
      >
        <Controls />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
      <div className="controls">
        <button onClick={() => onLayout("TB")}>vertical layout</button>
        <button onClick={() => onLayout("LR")}>horizontal layout</button>
        <button onClick={() => {
          const rfObj = reactFlowRef?.toObject()
          console.log(rfObj)
        }}>Show output</button>
      </div>
    </div>
  );
};

export default LayoutFlow;
