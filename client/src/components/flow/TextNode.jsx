import { memo } from 'react';
import { Handle, Position } from 'reactflow';

export const TextNode = memo(({ data, selected }) => {
  return (
    <div 
      className={`bg-white border rounded shadow-sm hover:shadow-md transition-all cursor-pointer ${
        selected ? "border-primary shadow-md" : "border-secondary"
      }`}
      style={{ maxWidth: '250px', minWidth: '200px' }}
      data-testid={`text-node-${data.text.substring(0, 10)}`}
    >
      {/* Target Handle */}
      <Handle
        type="target"
        position={Position.Left}
        className="bg-secondary border border-white rounded-circle hover:bg-primary transition-colors"
        style={{ width: '16px', height: '16px' }}
        data-testid="handle-target"
      />
      
      {/* Node Header */}
      <div className={`px-3 py-2 border-bottom rounded-top ${
        selected ? "bg-primary-subtle border-primary" : "bg-success-subtle border-secondary"
      }`}>
        <div className="d-flex align-items-center gap-2">
          <svg className={`text-success ${
            selected ? "text-primary" : "text-success"
          }`} width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="small fw-medium text-dark">Send Message</span>
        </div>
      </div>
      
      {/* Node Content */}
      <div className="p-3">
        <p 
          className="small text-secondary mb-0" 
          data-testid="text-node-content" 
          style={{ 
            wordBreak: 'break-word',
            wordWrap: 'break-word',
            whiteSpace: 'pre-wrap',
            overflowWrap: 'break-word',
            hyphens: 'auto',
            lineHeight: '1.4'
          }}
        >
          {data.text || 'Click to edit message...'}
        </p>
      </div>
      
      {/* Source Handle */}
      <Handle
        type="source"
        position={Position.Right}
        className="bg-secondary border border-white rounded-circle hover:bg-primary transition-colors"
        style={{ width: '16px', height: '16px' }}
        data-testid="handle-source"
      />
    </div>
  );
});

TextNode.displayName = 'TextNode';