import { useCallback, useRef } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  Background,
  Controls,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { FlowCanvas } from '@/components/flow/FlowCanvas';
import { NodesPanel } from '@/components/flow/NodesPanel';
import { SettingsPanel } from '@/components/flow/SettingsPanel';
import { TextNode } from '@/components/flow/TextNode';
import { useFlowBuilder } from '@/components/flow/useFlowBuilder';

const nodeTypes = {
  textMessage: TextNode,
};

export default function FlowBuilder() {
  const reactFlowWrapper = useRef(null);
  const {
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
    isValidFlow,
    isSaving,
    backToNodes,
    setReactFlowInstance,
  } = useFlowBuilder();

  const onReactFlowInit = useCallback((reactFlowInstance) => {
    setReactFlowInstance(reactFlowInstance);
  }, [setReactFlowInstance]);

  return (
    <div className="d-flex vh-100 bg-light" data-testid="flow-builder">
      {/* Left Sidebar - Nodes Panel */}
      <div className="bg-white border-end" style={{ width: '300px' }} data-testid="sidebar">
        {/* Sidebar Header */}
        <div className="p-3 border-bottom">
          <div className="d-flex align-items-center justify-content-between">
            <h2 className="h5 fw-semibold text-dark mb-0" data-testid="sidebar-title">
              {showSettings ? 'Message' : 'Nodes'}
            </h2>
            {showSettings && (
              <button
                onClick={backToNodes}
                className="btn btn-link text-muted p-0"
                data-testid="button-back-to-nodes"
              >
                <svg className="text-muted" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Panel Content */}
        {showSettings ? (
          <SettingsPanel 
            selectedNode={selectedNode} 
            onUpdateNode={updateNodeText}
            onBack={backToNodes}
          />
        ) : (
          <NodesPanel />
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-fill d-flex flex-column">
        {/* Top Toolbar */}
        <div className="bg-white border-bottom p-3 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-4">
            <h1 className="h5 fw-semibold text-dark mb-0">Chatbot Flow Builder</h1>
            <div className="small text-muted">
              <span data-testid="text-node-count">{nodes.length}</span> nodes, <span data-testid="text-edge-count">{edges.length}</span> connections
            </div>
          </div>
          
          <div className="d-flex align-items-center gap-3">
            {/* Error indicator */}
            {!isValidFlow && nodes.length > 1 && (
              <div className="d-flex align-items-center gap-2 text-danger bg-danger-subtle px-3 py-2 rounded">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span className="small fw-medium">Cannot save flow</span>
              </div>
            )}
            
            <button
              onClick={saveFlow}
              disabled={!isValidFlow || isSaving}
              className={`btn ${isValidFlow ? 'btn-primary' : 'btn-secondary'} d-flex align-items-center gap-2`}
              data-testid="button-save-flow"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </div>
        
        {/* Canvas Area */}
        <div className="flex-fill" ref={reactFlowWrapper}>
          <ReactFlowProvider>
            <FlowCanvas
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
              onInit={onReactFlowInit}
              reactFlowWrapper={reactFlowWrapper}
            />
          </ReactFlowProvider>
        </div>
      </div>
    </div>
  );
}