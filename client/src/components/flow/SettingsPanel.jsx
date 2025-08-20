import { useState, useEffect } from 'react';
import * as React from "react";

// Bootstrap Button Component
const Button = React.forwardRef(({ className = "", variant = "primary", size = "md", children, ...props }, ref) => {
  const baseClasses = "btn";
  const variantClass = variant === "primary" ? "btn-primary" : `btn-${variant}`;
  const sizeClass = size === "sm" ? "btn-sm" : size === "lg" ? "btn-lg" : "";
  
  return (
    <button
      className={`${baseClasses} ${variantClass} ${sizeClass} ${className}`.trim()}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});
Button.displayName = "Button";

// Bootstrap Textarea Component
const Textarea = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <textarea
      className={`form-control ${className}`.trim()}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

// Bootstrap Label Component
const Label = React.forwardRef(({ className = "", ...props }, ref) => (
  <label
    ref={ref}
    className={`form-label ${className}`.trim()}
    {...props}
  />
));
Label.displayName = "Label";

export function SettingsPanel({ selectedNode, onUpdateNode, onBack }) {
  const [text, setText] = useState('');

  useEffect(() => {
    if (selectedNode) {
      setText(selectedNode.data.text || '');
    }
  }, [selectedNode]);

  const handleUpdate = () => {
    if (selectedNode) {
      onUpdateNode(selectedNode.id, text);
      onBack(); // Go back to Nodes Panel after updating
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
    // Real-time update
    if (selectedNode) {
      onUpdateNode(selectedNode.id, e.target.value);
    }
  };

  if (!selectedNode) {
    return null;
  }

  return (
    <div className="p-3" data-testid="settings-panel">
      <div className="mb-3">
        <Label htmlFor="node-text" className="form-label fw-medium text-dark mb-2">
          Text
        </Label>
        <Textarea
          id="node-text"
          value={text}
          onChange={handleTextChange}
          className="form-control"
          rows={4}
          placeholder={selectedNode?.data.text || "Enter your message text..."}
          data-testid="input-node-text"
        />
      </div>
      
      <div className="pt-2">
        <Button 
          onClick={handleUpdate}
          className="w-100 btn-primary fw-medium"
          data-testid="button-update-node"
        >
          Update Node
        </Button>
      </div>
    </div>
  );
}