import { useState, useCallback, useRef } from 'react';
import { 
  addEdge, 
  useNodesState, 
  useEdgesState
} from 'reactflow';
import { toast } from 'react-toastify';

let nodeId = 0;
const getId = () => `node_${nodeId++}`;

export function useFlowBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const reactFlowInstance = useRef(null);

  // Save flow function (simplified - just shows success toast)
  const saveFlowData = useCallback(() => {
    setIsSaving(true);
    
    // Simulate a brief saving delay for better UX
    setTimeout(() => {
      toast.success("Successfully saved");
      setIsSaving(false);
    }, 500);
  }, []);

  // Validation logic
  const isValidFlow = useCallback(() => {
    // Always valid if 1 or fewer nodes
    if (nodes.length <= 1) return true;
    
    // If there are multiple nodes, check if any node is completely isolated
    // Get all node IDs that are connected (either as source or target)
    const connectedNodeIds = new Set();
    edges.forEach(edge => {
      connectedNodeIds.add(edge.source);
      connectedNodeIds.add(edge.target);
    });
    
    // Check if any node is not connected at all
    const hasIsolatedNode = nodes.some(node => !connectedNodeIds.has(node.id));
    
    return !hasIsolatedNode;
  }, [nodes, edges]);

  const saveFlow = useCallback(() => {
    if (!isValidFlow()) {
      toast.error("Cannot save flow: Nodes must be connected to save the flow");
      return;
    }
    
    saveFlowData();
  }, [isValidFlow, saveFlowData]);

  // Handle edge connections
  const onConnect = useCallback(
    (params) => {
      // Check if source already has an outgoing edge
      const sourceHasEdge = edges.some(edge => 
        edge.source === params.source && edge.sourceHandle === params.sourceHandle
      );
      
      if (sourceHasEdge) {
        toast.error("Connection not allowed: Source handle can only have one outgoing connection");
        return;
      }
      
      setEdges((eds) => addEdge(params, eds));
    },
    [edges, setEdges]
  );

  // Handle node selection
  const onNodeClick = useCallback((event, node) => {
    event.stopPropagation();
    setSelectedNode(node);
    setShowSettings(true);
  }, []);

  // Handle pane click (deselect)
  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
    setShowSettings(false);
  }, []);

  // Store ReactFlow instance when initialized
  const setReactFlowInstance = useCallback((instance) => {
    reactFlowInstance.current = instance;
  }, []);

  // Handle node drag and drop from panel
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = event.currentTarget.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      if (!type || !reactFlowInstance.current) {
        return;
      }

      const position = reactFlowInstance.current.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type,
        position,
        data: { text: 'Enter your message text...' },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // Update node text
  const updateNodeText = useCallback((nodeId, text) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, text } }
          : node
      )
    );
    
    // Update selected node as well
    setSelectedNode((prev) => 
      prev?.id === nodeId 
        ? { ...prev, data: { ...prev.data, text } }
        : prev
    );
  }, [setNodes]);

  // Back to nodes panel
  const backToNodes = useCallback(() => {
    setSelectedNode(null);
    setShowSettings(false);
  }, []);

  return {
    nodes,
    edges,
    selectedNode,
    showSettings,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeClick,
    onPaneClick,
    onDrop,
    onDragOver,
    updateNodeText,
    saveFlow,
    isValidFlow: isValidFlow(),
    isSaving,
    backToNodes,
    setReactFlowInstance,
  };
}