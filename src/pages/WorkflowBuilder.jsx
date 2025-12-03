import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Save, FolderOpen, Download, Trash2, Play, 
  ZoomIn, ZoomOut, RotateCcw, ArrowLeft 
} from 'lucide-react';
import Toast from '../components/Toast';
import { nodeConfigs } from '../config/nodeConfigs';
import './WorkflowBuilder.css';

const nodeTypes = {
  'data-input': [
    { id: 'document-loader', name: 'Document Loader', icon: '📄', color: '#FFB3D9' },
    { id: 'text-input', name: 'Text Input', icon: '✏️', color: '#FFB3D9' },
  ],
  'processing': [
    { id: 'text-splitter', name: 'Text Splitter', icon: '✂️', color: '#FFE4CC' },
    { id: 'embedder', name: 'Embedder', icon: '🔢', color: '#FFE4CC' },
    { id: 'summarizer', name: 'Summarizer', icon: '📝', color: '#FFE4CC' },
  ],
  'retrieval': [
    { id: 'vector-store', name: 'Vector Store', icon: '🗄️', color: '#FFB088' },
    { id: 'retriever', name: 'Retriever', icon: '🔎', color: '#FFB088' },
    { id: 'ranker', name: 'Ranker', icon: '📊', color: '#FFB088' },
  ],
  'llm': [
    { id: 'prompt-template', name: 'Prompt Template', icon: '📋', color: '#FF9966' },
    { id: 'llm-answer', name: 'LLM Answer', icon: '🧠', color: '#FF9966' },
  ],
  'output': [
    { id: 'output-visualizer', name: 'Output Visualizer', icon: '👁️', color: '#FFC8E3' },
    { id: 'json-output', name: 'JSON Output', icon: '{ }', color: '#FFC8E3' },
  ],
};

const WorkflowBuilder = () => {
  const navigate = useNavigate();
  const [workflowName, setWorkflowName] = useState('Untitled Workflow');
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [connectingFrom, setConnectingFrom] = useState(null);
  const [tempConnection, setTempConnection] = useState(null);
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [workflowOutput, setWorkflowOutput] = useState(null);
  const [showOutput, setShowOutput] = useState(false);
  const canvasRef = useRef(null);
  const svgRef = useRef(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleNodeDragStart = (e, nodeType) => {
    e.dataTransfer.setData('nodeType', JSON.stringify(nodeType));
  };

  const handlePortClick = (nodeId, portType) => {
    if (portType === 'output') {
      // Start connection from output port
      setConnectingFrom(nodeId);
    } else if (portType === 'input' && connectingFrom) {
      // Complete connection to input port
      const newConnection = {
        id: `conn-${Date.now()}`,
        from: connectingFrom,
        to: nodeId
      };
      setConnections([...connections, newConnection]);
      setConnectingFrom(null);
      setTempConnection(null);
      showToast('✅ Connection created successfully!', 'success');
    }
  };

  const handleCanvasMouseMove = (e) => {
    if (connectingFrom && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / zoom;
      const y = (e.clientY - rect.top) / zoom;
      setTempConnection({ x, y });
    }
  };

  const handleCanvasClick = (e) => {
    if (e.target === canvasRef.current || e.target.classList.contains('canvas-grid')) {
      setConnectingFrom(null);
      setTempConnection(null);
      setSelectedNode(null);
    }
  };

  const getNodeCenter = (node) => {
    return {
      x: node.x + 100, // Half of node width (200px)
      y: node.y + 50   // Half of node height (100px)
    };
  };

  const handleDeleteConnection = (connId) => {
    setConnections(connections.filter(c => c.id !== connId));
    showToast('🗑️ Connection deleted', 'info');
  };

  const handleCanvasDrop = (e) => {
    e.preventDefault();
    const nodeType = JSON.parse(e.dataTransfer.getData('nodeType'));
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - pan.x) / zoom;
    const y = (e.clientY - rect.top - pan.y) / zoom;

    // Initialize config with default values
    const defaultConfig = {};
    if (nodeConfigs[nodeType.id]) {
      nodeConfigs[nodeType.id].fields.forEach(field => {
        defaultConfig[field.name] = field.default;
      });
    }

    const newNode = {
      id: `node-${Date.now()}`,
      type: nodeType.id,
      name: nodeType.name,
      icon: nodeType.icon,
      color: nodeType.color,
      x,
      y,
      config: defaultConfig,
    };

    setNodes([...nodes, newNode]);
    showToast(`✅ ${nodeType.name} added to canvas`, 'success');
  };

  const handleCanvasDragOver = (e) => {
    e.preventDefault();
  };

  const handleNodeSelect = (node) => {
    setSelectedNode(node);
  };

  const handleNodeDelete = (nodeId) => {
    const node = nodes.find(n => n.id === nodeId);
    setNodes(nodes.filter(n => n.id !== nodeId));
    setConnections(connections.filter(c => c.from !== nodeId && c.to !== nodeId));
    if (selectedNode?.id === nodeId) {
      setSelectedNode(null);
    }
    showToast(`🗑️ ${node?.name || 'Node'} deleted`, 'info');
  };

  const handlePropertyChange = (field, value) => {
    if (!selectedNode) return;

    const updatedNodes = nodes.map(node => {
      if (node.id === selectedNode.id) {
        return {
          ...node,
          config: {
            ...node.config,
            [field]: value
          }
        };
      }
      return node;
    });

    setNodes(updatedNodes);
    setSelectedNode({
      ...selectedNode,
      config: {
        ...selectedNode.config,
        [field]: value
      }
    });
    showToast(`⚙️ Property "${field}" updated`, 'info');
  };

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 0.1, 0.5));
  };

  const handleResetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleSaveWorkflow = () => {
    const workflow = { 
      name: workflowName,
      nodes, 
      connections,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('workflow', JSON.stringify(workflow));
    localStorage.setItem('workflowName', workflowName);
    showToast(`💾 Workflow "${workflowName}" saved successfully!`, 'success');
  };

  const handleLoadWorkflow = () => {
    setShowLoadModal(true);
  };

  const loadFromLocalStorage = () => {
    const saved = localStorage.getItem('workflow');
    if (saved) {
      const workflow = JSON.parse(saved);
      setWorkflowName(workflow.name || 'Untitled Workflow');
      setNodes(workflow.nodes || []);
      setConnections(workflow.connections || []);
      setShowLoadModal(false);
      showToast(`📂 Workflow "${workflow.name}" loaded successfully!`, 'success');
    } else {
      showToast('⚠️ No saved workflow found!', 'warning');
    }
  };

  const loadExampleWorkflow = async () => {
    try {
      const response = await fetch('/examples/basic-rag-workflow.json');
      const workflow = await response.json();
      
      setWorkflowName(workflow.name || 'Basic RAG Pipeline');
      
      // Map nodes with proper structure
      const mappedNodes = workflow.nodes.map(node => ({
        id: node.id,
        type: node.type,
        name: nodeTypes['data-input'].concat(
          nodeTypes['processing'],
          nodeTypes['retrieval'],
          nodeTypes['llm'],
          nodeTypes['output']
        ).find(n => n.id === node.type)?.name || node.type,
        icon: nodeTypes['data-input'].concat(
          nodeTypes['processing'],
          nodeTypes['retrieval'],
          nodeTypes['llm'],
          nodeTypes['output']
        ).find(n => n.id === node.type)?.icon || '📦',
        color: nodeTypes['data-input'].concat(
          nodeTypes['processing'],
          nodeTypes['retrieval'],
          nodeTypes['llm'],
          nodeTypes['output']
        ).find(n => n.id === node.type)?.color || '#FFB3D9',
        x: node.x,
        y: node.y,
        config: node.config || {}
      }));
      
      setNodes(mappedNodes);
      setConnections(workflow.connections || []);
      setShowLoadModal(false);
      showToast(`📋 Example workflow "${workflow.name}" loaded!`, 'success');
    } catch (error) {
      console.error('Error loading example:', error);
      showToast('❌ Error loading example workflow', 'error');
    }
  };

  const handleClearCanvas = () => {
    if (confirm('Clear all nodes and connections?')) {
      setNodes([]);
      setConnections([]);
      setSelectedNode(null);
      setWorkflowName('Untitled Workflow');
      showToast('🗑️ Canvas cleared', 'info');
    }
  };

  const handleRunWorkflow = async () => {
    try {
      // Format nodes for backend
      const formattedNodes = nodes.map(node => ({
        id: node.id,
        type: node.type,
        config: node.config || {}
      }));

      // Format connections for backend
      const formattedEdges = connections.map(conn => ({
        from: conn.from,
        to: conn.to
      }));

      const response = await fetch('http://localhost:8000/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          nodes: formattedNodes, 
          edges: formattedEdges,
          query: "Sample query"
        }),
      });
      
      const result = await response.json();
      
      if (result.status === 'success') {
        showToast(`✅ Workflow executed! Time: ${result.execution_time.toFixed(2)}s`, 'success');
        console.log('Execution Result:', result);
        
        // Show output panel
        setWorkflowOutput(result);
        setShowOutput(true);
      } else {
        showToast(`❌ Execution failed: ${result.error}`, 'error');
        console.error('Execution Error:', result);
        setWorkflowOutput({ error: result.error });
        setShowOutput(true);
      }
    } catch (error) {
      showToast('❌ Backend connection error. Make sure it\'s running on port 8000', 'error');
      console.error('Connection Error:', error);
      setWorkflowOutput({ error: error.message });
      setShowOutput(true);
    }
  };

  const handleExportCode = async () => {
    try {
      // Format nodes for backend
      const formattedNodes = nodes.map(node => ({
        id: node.id,
        type: node.type,
        config: node.config || {}
      }));

      // Format connections for backend
      const formattedEdges = connections.map(conn => ({
        from: conn.from,
        to: conn.to
      }));

      const response = await fetch('http://localhost:8000/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          nodes: formattedNodes, 
          edges: formattedEdges
        }),
      });
      
      const result = await response.json();
      
      if (result.code) {
        const blob = new Blob([result.code], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'workflow.py';
        a.click();
        showToast('📥 Workflow code exported successfully!', 'success');
      }
    } catch (error) {
      // Fallback to simple export if backend is not available
      const code = `# Generated RAGFlow Workflow\n\n${nodes.map(n => `# ${n.name} (${n.type})`).join('\n')}`;
      const blob = new Blob([code], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'workflow.py';
      a.click();
      showToast('📥 Code exported (fallback mode)', 'warning');
      console.warn('Using fallback export (backend not available):', error);
    }
  };

  return (
    <div className="workflow-builder">
      {/* Header */}
      <header className="builder-header">
        <div className="header-left">
          <button className="btn btn-icon" onClick={() => navigate('/')}>
            <ArrowLeft size={20} />
          </button>
          <h1 className="builder-logo">FLOWRAGEN.</h1>
          <div className="workflow-name-container">
            <input
              type="text"
              className="workflow-name-input"
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
              placeholder="Enter workflow name"
            />
          </div>
        </div>
        <div className="header-right">
          <button className="btn btn-secondary" onClick={handleSaveWorkflow}>
            <Save size={18} /> Save
          </button>
          <button className="btn btn-secondary" onClick={handleLoadWorkflow}>
            <FolderOpen size={18} /> Load
          </button>
          <button className="btn btn-secondary" onClick={handleExportCode}>
            <Download size={18} /> Export
          </button>
          <button className="btn btn-danger" onClick={handleClearCanvas}>
            <Trash2 size={18} /> Clear
          </button>
          <button className="btn btn-primary" onClick={handleRunWorkflow}>
            <Play size={18} /> Run
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="builder-content">
        {/* Sidebar */}
        <aside className="builder-sidebar">
          <h2 className="sidebar-title">Node Library</h2>
          
          {Object.entries(nodeTypes).map(([category, types]) => (
            <div key={category} className="node-category">
              <h3 className="category-title">
                {category === 'data-input' && '📥 Data Input'}
                {category === 'processing' && '⚙️ Processing'}
                {category === 'retrieval' && '🔍 Retrieval'}
                {category === 'llm' && '🤖 LLM'}
                {category === 'output' && '📤 Output'}
              </h3>
              {types.map(type => (
                <div
                  key={type.id}
                  className="node-item"
                  draggable
                  onDragStart={(e) => handleNodeDragStart(e, type)}
                  style={{ borderLeftColor: type.color, borderLeftWidth: '4px' }}
                >
                  <span className="node-icon">{type.icon}</span>
                  <span className="node-name">{type.name}</span>
                </div>
              ))}
            </div>
          ))}
        </aside>

        {/* Canvas */}
        <main className="builder-canvas-container">
          <div className="canvas-controls">
            <button className="control-btn" onClick={handleZoomIn}>
              <ZoomIn size={18} />
            </button>
            <button className="control-btn" onClick={handleZoomOut}>
              <ZoomOut size={18} />
            </button>
            <button className="control-btn" onClick={handleResetZoom}>
              <RotateCcw size={18} />
            </button>
            <span className="zoom-level">{Math.round(zoom * 100)}%</span>
          </div>
          
          <div
            ref={canvasRef}
            className="builder-canvas"
            onDrop={handleCanvasDrop}
            onDragOver={handleCanvasDragOver}
            onMouseMove={handleCanvasMouseMove}
            onClick={handleCanvasClick}
            style={{
              transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
            }}
          >
            {/* Grid Background */}
            <div className="canvas-grid"></div>
            
            {/* SVG for Connections */}
            <svg className="connections-svg" ref={svgRef}>
              {/* Existing Connections */}
              {connections.map(conn => {
                const fromNode = nodes.find(n => n.id === conn.from);
                const toNode = nodes.find(n => n.id === conn.to);
                if (!fromNode || !toNode) return null;
                
                const from = getNodeCenter(fromNode);
                const to = getNodeCenter(toNode);
                
                return (
                  <g key={conn.id}>
                    <path
                      d={`M ${from.x} ${from.y} C ${from.x + 100} ${from.y}, ${to.x - 100} ${to.y}, ${to.x} ${to.y}`}
                      stroke="#000000"
                      strokeWidth="3"
                      fill="none"
                      className="connection-path"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm('Delete this connection?')) {
                          handleDeleteConnection(conn.id);
                        }
                      }}
                    />
                    <circle cx={from.x} cy={from.y} r="5" fill="#FF9966" />
                    <circle cx={to.x} cy={to.y} r="5" fill="#FFC8E3" />
                  </g>
                );
              })}
              
              {/* Temporary Connection */}
              {connectingFrom && tempConnection && (() => {
                const fromNode = nodes.find(n => n.id === connectingFrom);
                if (!fromNode) return null;
                const from = getNodeCenter(fromNode);
                return (
                  <path
                    d={`M ${from.x} ${from.y} L ${tempConnection.x} ${tempConnection.y}`}
                    stroke="#FF9966"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    fill="none"
                  />
                );
              })()}
            </svg>
            
            {/* Nodes */}
            {nodes.map(node => (
              <div
                key={node.id}
                className={`workflow-node ${selectedNode?.id === node.id ? 'selected' : ''} ${connectingFrom === node.id ? 'connecting' : ''}`}
                style={{
                  left: node.x,
                  top: node.y,
                  borderColor: node.color,
                  backgroundColor: node.color + '40',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleNodeSelect(node);
                }}
              >
                <div className="node-header">
                  <span className="node-icon">{node.icon}</span>
                  <span className="node-title">{node.name}</span>
                  <button
                    className="node-delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNodeDelete(node.id);
                    }}
                  >
                    ×
                  </button>
                </div>
                <div className="node-ports">
                  <div 
                    className="node-port input" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePortClick(node.id, 'input');
                    }}
                    title="Click to connect"
                  ></div>
                  <div 
                    className="node-port output"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePortClick(node.id, 'output');
                    }}
                    title="Click to start connection"
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Properties Panel */}
        <aside className="builder-properties">
          <h2 className="properties-title">Properties</h2>
          {selectedNode ? (
            <div className="properties-content">
              <div className="property-group">
                <label className="property-label">Node Type</label>
                <input
                  type="text"
                  className="property-input"
                  value={selectedNode.name}
                  readOnly
                />
              </div>
              <div className="property-group">
                <label className="property-label">Node ID</label>
                <input
                  type="text"
                  className="property-input"
                  value={selectedNode.id}
                  readOnly
                />
              </div>
              
              {/* Dynamic Configuration Fields */}
              {nodeConfigs[selectedNode.type] && (
                <>
                  <div className="property-divider"></div>
                  <h3 className="property-section-title">Configuration</h3>
                  {nodeConfigs[selectedNode.type].fields.map(field => (
                    <div key={field.name} className="property-group">
                      <label className="property-label">{field.label}</label>
                      {field.type === 'text' && (
                        <input
                          type="text"
                          className="property-input"
                          value={selectedNode.config[field.name] || field.default}
                          onChange={(e) => handlePropertyChange(field.name, e.target.value)}
                          placeholder={field.default}
                        />
                      )}
                      {field.type === 'number' && (
                        <input
                          type="number"
                          className="property-input"
                          value={selectedNode.config[field.name] || field.default}
                          onChange={(e) => handlePropertyChange(field.name, parseFloat(e.target.value))}
                          step={field.step || 1}
                        />
                      )}
                      {field.type === 'textarea' && (
                        <textarea
                          className="property-textarea"
                          value={selectedNode.config[field.name] || field.default}
                          onChange={(e) => handlePropertyChange(field.name, e.target.value)}
                          rows={4}
                          placeholder={field.default}
                        />
                      )}
                      {field.type === 'select' && (
                        <select
                          className="property-select"
                          value={selectedNode.config[field.name] || field.default}
                          onChange={(e) => handlePropertyChange(field.name, e.target.value)}
                        >
                          {field.options.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      )}
                      {field.type === 'checkbox' && (
                        <label className="property-checkbox">
                          <input
                            type="checkbox"
                            checked={selectedNode.config[field.name] !== undefined ? selectedNode.config[field.name] : field.default}
                            onChange={(e) => handlePropertyChange(field.name, e.target.checked)}
                          />
                          <span>Enable</span>
                        </label>
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>
          ) : (
            <p className="empty-state">Select a node to view and edit properties</p>
          )}
        </aside>
      </div>

      {/* Load Modal */}
      {showLoadModal && (
        <div className="modal-overlay" onClick={() => setShowLoadModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Load Workflow</h2>
            <div className="load-options">
              <button className="load-option-btn" onClick={loadFromLocalStorage}>
                <Save size={24} />
                <div>
                  <h3>Load Saved Workflow</h3>
                  <p>Load your previously saved workflow from browser storage</p>
                </div>
              </button>
              <button className="load-option-btn" onClick={loadExampleWorkflow}>
                <FolderOpen size={24} />
                <div>
                  <h3>Load Example Workflow</h3>
                  <p>Load the Basic RAG Pipeline example from examples folder</p>
                </div>
              </button>
            </div>
            <button className="btn btn-secondary modal-close" onClick={() => setShowLoadModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Output Panel Modal */}
      {showOutput && workflowOutput && (
        <div className="modal-overlay" onClick={() => setShowOutput(false)}>
          <div className="modal-content output-modal" onClick={(e) => e.stopPropagation()}>
            <div className="output-header">
              <div className="output-header-left">
                <div className="output-icon-wrapper">
                  {workflowOutput.error ? '❌' : '✨'}
                </div>
                <div>
                  <h2 className="modal-title">
                    {workflowOutput.error ? 'Execution Failed' : 'Workflow Results'}
                  </h2>
                  <p className="output-subtitle">
                    {workflowOutput.error 
                      ? 'An error occurred during execution' 
                      : `Completed in ${workflowOutput.execution_time?.toFixed(2)}s`}
                  </p>
                </div>
              </div>
              <button className="btn btn-icon close-btn" onClick={() => setShowOutput(false)}>
                ×
              </button>
            </div>
            
            <div className="output-content">
              {workflowOutput.error ? (
                <div className="output-error-container">
                  <div className="error-badge">
                    <span className="error-icon">⚠️</span>
                    <span className="error-text">Error Details</span>
                  </div>
                  <div className="error-message">
                    <pre>{workflowOutput.error}</pre>
                  </div>
                  <div className="error-actions">
                    <button className="btn btn-secondary" onClick={() => setShowOutput(false)}>
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Execution Summary Cards */}
                  <div className="summary-cards">
                    <div className="summary-card success-card">
                      <div className="card-icon">✅</div>
                      <div className="card-content">
                        <div className="card-label">Status</div>
                        <div className="card-value">{workflowOutput.status || 'Success'}</div>
                      </div>
                    </div>
                    <div className="summary-card time-card">
                      <div className="card-icon">⏱️</div>
                      <div className="card-content">
                        <div className="card-label">Execution Time</div>
                        <div className="card-value">{workflowOutput.execution_time?.toFixed(3)}s</div>
                      </div>
                    </div>
                    <div className="summary-card nodes-card">
                      <div className="card-icon">🔗</div>
                      <div className="card-content">
                        <div className="card-label">Nodes Executed</div>
                        <div className="card-value">{workflowOutput.trace?.length || 0}</div>
                      </div>
                    </div>
                  </div>

                  {/* Final Output Section */}
                  {workflowOutput.output && (
                    <div className="result-section">
                      <div className="section-header">
                        <div className="section-icon">💬</div>
                        <h3 className="section-title">Final Output</h3>
                      </div>
                      <div className="result-content">
                        {typeof workflowOutput.output === 'object' ? (
                          <div className="json-output">
                            <pre>{JSON.stringify(workflowOutput.output, null, 2)}</pre>
                          </div>
                        ) : (
                          <div className="text-output">
                            <p>{workflowOutput.output}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Execution Trace Timeline */}
                  {workflowOutput.trace && workflowOutput.trace.length > 0 && (
                    <div className="result-section">
                      <div className="section-header">
                        <div className="section-icon">🔍</div>
                        <h3 className="section-title">Execution Timeline</h3>
                        <span className="section-badge">{workflowOutput.trace.length} steps</span>
                      </div>
                      <div className="timeline-container">
                        {workflowOutput.trace.map((step, index) => (
                          <div key={index} className={`timeline-item ${step.status || 'success'}`}>
                            <div className="timeline-marker">
                              <div className="timeline-dot"></div>
                              {index < workflowOutput.trace.length - 1 && (
                                <div className="timeline-line"></div>
                              )}
                            </div>
                            <div className="timeline-content">
                              <div className="timeline-header">
                                <div className="timeline-step-info">
                                  <span className="timeline-step-number">Step {index + 1}</span>
                                  <span className="timeline-node-id">{step.node_id}</span>
                                </div>
                                <div className="timeline-meta">
                                  <span className="timeline-status">
                                    {step.status === 'error' ? '❌' : '✅'}
                                  </span>
                                  <span className="timeline-time">
                                    {step.execution_time?.toFixed(3)}s
                                  </span>
                                </div>
                              </div>
                              {step.output && (
                                <div className="timeline-output">
                                  <div className="output-label">Output:</div>
                                  <div className="output-value">
                                    {typeof step.output === 'object' 
                                      ? JSON.stringify(step.output, null, 2)
                                      : step.output}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="output-footer">
              <button className="btn btn-secondary" onClick={() => setShowOutput(false)}>
                Close
              </button>
              {!workflowOutput.error && (
                <button 
                  className="btn btn-primary" 
                  onClick={() => {
                    const data = JSON.stringify(workflowOutput, null, 2);
                    const blob = new Blob([data], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `workflow-result-${Date.now()}.json`;
                    a.click();
                    showToast('📥 Results exported successfully!', 'success');
                  }}
                >
                  Export Results
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default WorkflowBuilder;
