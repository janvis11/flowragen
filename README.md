# 🚀 RAGFlow - Visual Workflow Builder for RAG Pipelines

<div align="center">

![RAGFlow Banner](https://img.shields.io/badge/RAGFlow-Visual_RAG_Builder-FF6B35?style=for-the-badge)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![LangChain](https://img.shields.io/badge/LangChain-Latest-1C3C3C?style=for-the-badge)](https://langchain.com/)
[![License](https://img.shields.io/badge/License-MIT-FFC8DD?style=for-the-badge)](LICENSE)

**Build, visualize, and execute Retrieval-Augmented Generation (RAG) pipelines with an intuitive drag-and-drop interface.**

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Architecture](#-architecture) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Usage Guide](#-usage-guide)
- [Architecture](#-architecture)
- [API Documentation](#-api-documentation)
- [Configuration](#-configuration)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**RAGFlow** is an industry-grade visual workflow builder designed for creating, managing, and executing Retrieval-Augmented Generation (RAG) pipelines. Whether you're building a document Q&A system, content summarizer, or complex multi-step AI workflow, RAGFlow provides an intuitive interface to design and deploy your pipelines without writing code.

### Why RAGFlow?

- **🎨 Visual First**: Drag-and-drop interface for building complex RAG pipelines
- **🔌 Modular Design**: 12+ pre-built nodes for data input, processing, retrieval, and LLM operations
- **⚡ Real-time Execution**: Execute workflows and see results instantly
- **🔧 Fully Configurable**: Every node is customizable with detailed property panels
- **📊 Execution Tracing**: Detailed timeline view of workflow execution
- **💾 Persistent Storage**: Save and load workflows from browser storage
- **🚀 Production Ready**: Built with FastAPI backend and React frontend
- **🤖 LLM Agnostic**: Supports OpenAI, Anthropic, Groq, and more

---

## ✨ Features

### 🎨 Visual Workflow Builder

- **Drag-and-Drop Interface**: Intuitive node-based workflow creation
- **Visual Connections**: Click-to-connect ports with curved SVG paths
- **Real-time Preview**: See your workflow structure as you build
- **Zoom & Pan Controls**: Navigate large workflows easily
- **Grid Background**: Aligned node placement for clean layouts

### 🧩 Node Library (12+ Node Types)

#### 📥 Data Input Nodes
- **Document Loader**: Load PDF, TXT, DOCX files
- **Text Input**: Manual text entry for queries

#### ⚙️ Processing Nodes
- **Text Splitter**: Chunk documents with configurable size and overlap
- **Embedder**: Generate embeddings using OpenAI, HuggingFace, or Cohere
- **Summarizer**: Summarize text with LLM models

#### 🔍 Retrieval Nodes
- **Vector Store**: Store embeddings in FAISS, Chroma, or Pinecone
- **Retriever**: Retrieve relevant documents with similarity search
- **Ranker**: Re-rank results for better relevance

#### 🤖 LLM Nodes
- **Prompt Template**: Format prompts with variables
- **LLM Answer**: Generate answers with GPT-4, Claude, or other models

#### 📤 Output Nodes
- **Output Visualizer**: Display formatted results
- **JSON Output**: Export structured data

### ⚙️ Advanced Features

- **Editable Properties**: Configure every aspect of each node
- **Workflow Management**: Save, load, and export workflows
- **Example Templates**: Pre-built RAG pipeline templates
- **Code Export**: Generate Python code from visual workflows
- **Execution Trace**: Step-by-step execution timeline
- **Toast Notifications**: Real-time feedback for all actions
- **Error Handling**: Detailed error messages and debugging info

### 🎨 Modern UI/UX

- **Brutalist Design**: Bold, clean interface with strong visual hierarchy
- **Responsive Layout**: Works on desktop and tablet devices
- **Themed Components**: Consistent color palette (Pink, Orange, Peach)
- **Smooth Animations**: Polished interactions and transitions
- **Accessibility**: Keyboard shortcuts and screen reader support

---

## 🛠️ Tech Stack

### Frontend
- **React 18.2** - Modern UI library
- **React Router 6** - Client-side routing
- **Vite 7** - Lightning-fast build tool
- **Lucide React** - Beautiful icon library
- **Vanilla CSS** - Custom styling with CSS variables

### Backend
- **FastAPI** - High-performance Python web framework
- **LangChain** - LLM application framework
- **LangGraph** - Workflow orchestration
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server

### AI/ML Libraries
- **OpenAI** - GPT models and embeddings
- **Groq** - Fast LLM inference
- **Anthropic** - Claude models
- **FAISS** - Vector similarity search
- **Sentence Transformers** - Embedding models

### Document Processing
- **PyPDF** - PDF parsing
- **python-docx** - DOCX parsing
- **tiktoken** - Token counting

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.11+
- **Git**

### One-Command Setup (Windows)

```bash
# Clone the repository
git clone https://github.com/yourusername/ragflow.git
cd ragflow

# Run the startup script
start.bat
```

This will:
1. Start the frontend server on `http://localhost:5173`
2. Create Python virtual environment
3. Install backend dependencies
4. Start backend server on `http://localhost:8000`
5. Open the workflow builder in your browser

### Manual Setup

#### Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will be available at `http://localhost:5173`

#### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start backend server
python main.py
```

Backend will be available at `http://localhost:8000`

---

## 📖 Usage Guide

### Creating Your First Workflow

1. **Open the Workflow Builder**
   - Navigate to `http://localhost:5173/workflow`
   - You'll see the node library on the left

2. **Add Nodes to Canvas**
   - Drag nodes from the sidebar to the canvas
   - Position them to create your workflow flow

3. **Connect Nodes**
   - Click on the **orange output port** (right side) of a node
   - Click on the **pink input port** (left side) of the target node
   - A connection line will appear

4. **Configure Nodes**
   - Click on a node to select it
   - Edit properties in the right panel
   - All changes are saved automatically

5. **Save Your Workflow**
   - Click the **Save** button in the toolbar
   - Give your workflow a name
   - It's saved to browser localStorage

6. **Run Your Workflow**
   - Click the **Run** button
   - View execution results in the dedicated results page
   - See step-by-step execution timeline

### Example: Basic RAG Pipeline

```
Document Loader → Text Splitter → Embedder → Vector Store
                                                    ↓
Text Input (Query) → Retriever → LLM Answer → Output Visualizer
```

**Load the example workflow:**
1. Click **Load** button
2. Select **Load Example Workflow**
3. The basic RAG pipeline will be loaded automatically

---

## 🏗️ Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────┐
│                     Frontend (React)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Landing    │  │   Workflow   │  │   Results    │  │
│  │     Page     │  │    Builder   │  │     Page     │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                           ↓ HTTP/REST
┌─────────────────────────────────────────────────────────┐
│                   Backend (FastAPI)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │     API      │  │   Workflow   │  │     Node     │  │
│  │   Endpoints  │  │   Executor   │  │   Registry   │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│              External Services & Storage                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   OpenAI     │  │    FAISS     │  │  ChromaDB    │  │
│  │     API      │  │  Vector DB   │  │  Vector DB   │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Data Flow

1. **Workflow Creation**: User builds workflow visually in React frontend
2. **Serialization**: Workflow converted to JSON with nodes and connections
3. **API Request**: Frontend sends workflow to backend `/api/execute` endpoint
4. **Validation**: Backend validates workflow structure and dependencies
5. **Execution**: WorkflowExecutor runs nodes in topological order
6. **Tracing**: Each node execution is logged with timing and output
7. **Response**: Results sent back to frontend with execution trace
8. **Display**: Results shown in dedicated results page with timeline

### Project Structure

```
RAGflow/
├── src/                          # Frontend source
│   ├── components/               # Reusable components
│   │   └── Toast.jsx            # Toast notifications
│   ├── config/                   # Configuration
│   │   └── nodeConfigs.js       # Node definitions
│   ├── pages/                    # Page components
│   │   ├── LandingPage.jsx      # Home page
│   │   ├── WorkflowBuilder.jsx  # Main builder
│   │   ├── ResultsPage.jsx      # Results display
│   │   ├── FeaturesPage.jsx     # Features page
│   │   └── AboutPage.jsx        # About page
│   ├── App.jsx                   # Main app component
│   └── main.jsx                  # Entry point
├── backend/                      # Backend source
│   ├── main.py                   # FastAPI application
│   ├── nodes.py                  # Node implementations
│   ├── workflow_executor.py     # Execution engine
│   ├── config.py                 # Configuration
│   └── requirements.txt          # Python dependencies
├── examples/                     # Example workflows
│   └── basic-rag-workflow.json  # Basic RAG template
├── public/                       # Static assets
├── index.html                    # HTML entry point
├── package.json                  # Node dependencies
├── vite.config.js               # Vite configuration
├── start.bat                     # Windows startup script
└── README.md                     # This file
```

---

## 🔌 API Documentation

### Base URL
```
http://localhost:8000
```

### Endpoints

#### `GET /api/health`
Health check endpoint

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-11-09T05:55:00.000Z",
  "config": {
    "openai_configured": true,
    "groq_configured": false
  }
}
```

#### `POST /api/execute`
Execute a workflow

**Request:**
```json
{
  "nodes": [
    {
      "id": "node-1",
      "type": "document-loader",
      "config": {
        "source": "upload",
        "path": "document.pdf"
      }
    }
  ],
  "edges": [
    {
      "from": "node-1",
      "to": "node-2"
    }
  ],
  "query": "What is RAG?"
}
```

**Response:**
```json
{
  "status": "success",
  "execution_time": 2.34,
  "trace": [
    {
      "node_id": "node-1",
      "node_type": "document-loader",
      "status": "success",
      "execution_time": 0.45,
      "output": "Document loaded successfully"
    }
  ],
  "output": "Final workflow output"
}
```

#### `GET /api/nodes`
List all available node types

**Response:**
```json
{
  "nodes": [
    {
      "id": "document-loader",
      "name": "Document Loader",
      "category": "data-input",
      "config_schema": {...}
    }
  ]
}
```

#### `POST /api/validate`
Validate workflow structure

**Request:**
```json
{
  "nodes": [...],
  "edges": [...]
}
```

**Response:**
```json
{
  "valid": true,
  "errors": [],
  "warnings": []
}
```

### Interactive API Docs

Visit `http://localhost:8000/docs` for interactive Swagger UI documentation.

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# OpenAI Configuration
OPENAI_API_KEY=sk-your-api-key-here
OPENAI_MODEL=gpt-4-turbo-preview

# Groq Configuration (Optional)
GROQ_API_KEY=your-groq-api-key

# Anthropic Configuration (Optional)
ANTHROPIC_API_KEY=your-anthropic-api-key

# Vector Store Configuration
VECTOR_STORE_TYPE=faiss
VECTOR_STORE_PATH=./vector_stores

# Server Configuration
BACKEND_HOST=0.0.0.0
BACKEND_PORT=8000
FRONTEND_URL=http://localhost:5173
```

### Node Configuration

Each node type has specific configuration options. See the properties panel in the workflow builder for available settings.

---

## 🚢 Deployment

### Frontend Deployment (Netlify/Vercel)

```bash
# Build for production
npm run build

# Deploy the dist/ folder
```

### Backend Deployment (Docker)

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ .

EXPOSE 8000

CMD ["python", "main.py"]
```

### Environment Setup

1. Set environment variables in your hosting platform
2. Configure CORS origins for your frontend URL
3. Set up SSL/TLS certificates
4. Configure database persistence (if using vector stores)

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Adding New Node Types

1. **Define Node Class** in `backend/nodes.py`:
```python
class MyCustomNode(BaseNode):
    def execute(self, state: Dict[str, Any]) -> Dict[str, Any]:
        # Your node logic here
        return state
```

2. **Register Node** in `NodeRegistry`:
```python
node_registry.register("my-custom-node", MyCustomNode)
```

3. **Add to Frontend** in `src/config/nodeConfigs.js`:
```javascript
{
  id: 'my-custom-node',
  name: 'My Custom Node',
  icon: '🎯',
  color: '#FF6B35',
  config: {...}
}
```

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Style

- **Frontend**: Follow React best practices, use functional components
- **Backend**: Follow PEP 8, use type hints
- **Documentation**: Update README and inline comments

---

## 📚 Documentation

- **[Quick Start Guide](QUICKSTART.md)** - Get started in 5 minutes
- **[Workflow Guide](WORKFLOW_GUIDE.md)** - Complete workflow builder guide
- **[Architecture](PROJECT_STRUCTURE.md)** - Detailed architecture overview
- **[Production Guide](PRODUCTION_READY.md)** - Production deployment checklist
- **[Theme Guide](THEME_GUIDE.md)** - UI/UX design system

---

## 🐛 Troubleshooting

### Common Issues

**Backend won't start:**
- Check Python version (3.11+ required)
- Verify virtual environment is activated
- Install dependencies: `pip install -r requirements.txt`

**Frontend build errors:**
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version (18+ required)

**Workflow execution fails:**
- Verify API keys are set in `.env`
- Check backend logs for errors
- Validate workflow structure

**Connection errors:**
- Ensure backend is running on port 8000
- Check CORS configuration
- Verify network connectivity

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **LangChain** - For the amazing LLM framework
- **FastAPI** - For the high-performance web framework
- **React** - For the powerful UI library
- **OpenAI** - For GPT models and embeddings
- **Community** - For feedback and contributions

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/ragflow/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/ragflow/discussions)
- **Email**: support@ragflow.dev

---

## 🗺️ Roadmap

### Version 2.0 (Coming Soon)
- [ ] Real-time collaborative editing
- [ ] Workflow templates marketplace
- [ ] Custom node SDK
- [ ] Version control for workflows
- [ ] Performance monitoring dashboard
- [ ] Dark mode support
- [ ] Mobile app (React Native)
- [ ] Multi-language support

### Version 1.5 (In Progress)
- [x] Visual workflow builder
- [x] 12+ node types
- [x] Execution tracing
- [x] Code export
- [ ] User authentication
- [ ] Cloud storage integration
- [ ] Workflow sharing

---

<div align="center">

**Built with ❤️ for AI Engineers and LLM Enthusiasts**

⭐ Star us on GitHub — it motivates us a lot!

[Website](https://ragflow.dev) • [Documentation](https://docs.ragflow.dev) • [Blog](https://blog.ragflow.dev)

</div>
