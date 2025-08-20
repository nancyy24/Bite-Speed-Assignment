import { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  BackgroundVariant,
} from 'reactflow';

export function FlowCanvas({
  nodes,
  edges,
  nodeTypes,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onNodeClick,
  onPaneClick,
  onDrop,
  onDragOver,
  onInit,
  reactFlowWrapper,
}) {
  
  // Handle connection validation - source handles can only have one outgoing edge
  const isValidConnection = useCallback((connection) => {
    // Check if source handle already has an outgoing edge
    const sourceHasEdge = edges.some(edge => 
      edge.source === connection.source && edge.sourceHandle === connection.sourceHandle
    );
    return !sourceHasEdge;
  }, [edges]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeClick={onNodeClick}
      onPaneClick={onPaneClick}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onInit={onInit}
      isValidConnection={isValidConnection}
      fitView
      data-testid="flow-canvas"
    >
      <Background 
        variant={BackgroundVariant.Dots} 
        gap={20} 
        size={1}
        className="opacity-25"
      />
      <Controls 
        className="bg-white border border-secondary rounded shadow-lg"
      />
    </ReactFlow>
  );
}