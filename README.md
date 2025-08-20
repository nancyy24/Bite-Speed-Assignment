# BiteSpeed Chatbot Flow Builder
A modern, extensible chatbot flow builder built with React and React Flow. This application provides an intuitive drag-and-drop interface for creating complex chatbot conversation flows with text messages.

**Deploy Site** : https://bite-speed-assignment-nzzt.vercel.app

## 🚀 Features

- **Visual Flow Builder**: Drag-and-drop interface for creating chatbot flows
- **Text Message Nodes**: Create and customize text message nodes
- **Real-time Editing**: Edit node content directly in the flow
- **Validation System**: Built-in validation to ensure flow integrity
- **Extensible Architecture**: Easy to add new node types and features

## 🛠️ Tech Stack

- **Frontend**: React 18 with Vite
- **Flow Engine**: React Flow (@xyflow/react)
- **Styling**: Bootstrap 5 + Custom CSS
- **Build Tool**: Vite
- **Language**: JavaScript (ES6+)

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bitespeed-chatbot-flow-builder.git
cd bitespeed-chatbot-flow-builder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🎯 Usage Guide

### Creating Your First Flow

1. **Add Nodes**: Drag text message nodes from the left panel to the canvas
2. **Connect Nodes**: Click and drag from the source handle (right side) of one node to the target handle (left side) of another
3. **Edit Content**: Click on any node to open the settings panel and edit the message text
4. **Save Flow**: Click the "Save Changes" button to persist your flow

### Node Types

#### Text Message Node
- **Purpose**: Send a text message to the user
- **Customization**: Edit message text in the settings panel
- **Connections**: One source handle (output), one target handle (input)

### Validation Rules

The application enforces the following validation rules:
- ✅ Source handles can only have one outgoing edge
- ✅ Target handles can receive multiple incoming edges
- ✅ All nodes (except the first) must have at least one incoming connection
- ✅ Flow must be valid before saving

## 🏗️ Project Structure

```
bitespeed-chatbot-flow-builder/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   └── flow/
│   │   │       ├── FlowCanvas.jsx      # Main canvas component
│   │   │       ├── NodesPanel.jsx      # Draggable nodes panel
│   │   │       ├── SettingsPanel.jsx   # Node settings editor
│   │   │       ├── TextNode.jsx        # Text message node component
│   │   │       └── useFlowBuilder.jsx  # Custom hook for flow logic
│   │   ├── pages/
│   │   │   ├── flow-builder.jsx        # Main flow builder page
│   │   │   └── not-found.jsx           # 404 page
│   │   ├── App.jsx                     # Root component
│   │   └── main.jsx                    # Entry point
├── package.json
├── vite.config.ts
└── README.md
```

## 🔧 Core Components

### FlowCanvas
The main canvas component that renders the flow using React Flow. Handles:
- Node and edge rendering
- Connection validation
- Drag and drop functionality
- Zoom and pan controls

### NodesPanel
Left sidebar component that displays available node types:
- Draggable node templates
- Extensible for new node types
- Clean, organized layout

### SettingsPanel
Context-aware settings panel that appears when a node is selected:
- Real-time text editing
- Node-specific configurations
- Back navigation to nodes panel

### TextNode
Custom node component for text messages:
- Visual representation with handles
- Selected state styling
- Responsive text display

### useFlowBuilder
Custom React hook that manages:
- Node and edge state
- Selection handling
- Validation logic
- Save functionality

## 🎨 Customization

### Adding New Node Types

1. Create a new node component in `components/flow/`
2. Add the node type to `nodeTypes` object in `flow-builder.jsx`
3. Update `NodesPanel` to include the new node
4. Add validation rules in `useFlowBuilder` hook

### Manual Testing Checklist
- Drag and drop nodes from panel
- Connect nodes with edges
- Edit node text via settings panel
- Validate flow before saving
- Verify error messages display correctly

