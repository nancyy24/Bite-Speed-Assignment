export function NodesPanel() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="p-3" data-testid="nodes-panel">
      <p className="small text-muted mb-3">Drag a node onto the canvas</p>
      
      {/* Draggable Message Node */}
      <div
        className="bg-white border border-2 border-dashed border-secondary rounded p-3 hover:border-primary transition-colors"
        style={{ cursor: 'grab' }}
        draggable
        onDragStart={(event) => onDragStart(event, 'textMessage')}
        data-testid="draggable-message-node"
        onMouseDown={(e) => e.currentTarget.style.cursor = 'grabbing'}
        onMouseUp={(e) => e.currentTarget.style.cursor = 'grab'}
      >
        <div className="d-flex align-items-center gap-3">
          <div className="bg-primary-subtle rounded p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
            <svg className="text-primary" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div>
            <h3 className="fw-medium text-dark mb-1">Message</h3>
            <p className="small text-muted mb-0">Send a text message</p>
          </div>
        </div>
      </div>
    </div>
  );
}