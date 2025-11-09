<div align="center">
  <img src="./public/flowragen-logo.svg" alt="Flowragen Logo" width="100"/>
  
  # Flowragen
  
  **Visual RAG Pipeline Builder Powered by LangGraph**
  
  Transform complex retrieval-augmented generation workflows into intuitive visual diagrams. Build, test, and deploy production-ready RAG systems without writing a single line of code—unless you want to export it.
  
  [![Python 3.11+](https://img.shields.io/badge/python-3.11+-blue.svg)](https://www.python.org/downloads/)
  [![React 18](https://img.shields.io/badge/react-18.2-blue.svg)](https://reactjs.org/)
  [![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-green.svg)](https://fastapi.tiangolo.com/)
</div>

---

## Why Flowragen?

Most RAG implementations fall into two extremes: oversimplified templates that lack flexibility, or complex code-first approaches that require deep technical expertise. Flowragen bridges this gap by providing a visual interface that maintains the power and flexibility of LangGraph while remaining accessible to non-engineers.

**The result?** Faster prototyping, clearer architecture visualization, and production-ready code generation—all from a drag-and-drop interface.

---

## Core Capabilities

### Visual Workflow Design
Construct RAG pipelines using an intuitive node-based editor. Each node represents a discrete operation in your pipeline—document loading, text splitting, embedding generation, vector storage, retrieval, and LLM inference.

### Real-Time Execution
Execute workflows directly in the browser with live execution traces. Watch data flow through your pipeline, inspect intermediate outputs, and debug bottlenecks in real-time.

### Code Generation
Export your visual workflow as executable Python code using LangGraph. The generated code is production-ready, fully documented, and can be integrated into existing systems without modification.

### Dual-Mode Operation
- **Demo Mode**: Test and prototype without API keys using mock responses
- **Production Mode**: Connect to real LLM providers (Groq, OpenAI, Anthropic) for live execution

---


### Data Flow

```
User Input → Visual Editor → Workflow JSON → Backend Validation
                                                      ↓
                                              Graph Construction
                                                      ↓
                                              Node Execution
                                                      ↓
                                            Execution Trace + Output
                                                      ↓
                                              Frontend Display
```

---

## Technology Stack

### Frontend Layer
- **React 18.2** - Component architecture with hooks
- **Vite 7.2** - Lightning-fast build tooling
- **React Router 6.20** - Client-side routing
- **Lucide React** - Icon system
- **Custom Canvas Engine** - Node-based visual editor with zoom/pan

### Backend Layer
- **FastAPI 0.104+** - High-performance async API framework
- **LangChain 0.1+** - LLM orchestration framework
- **LangGraph 0.0.26+** - Stateful multi-actor applications
- **Pydantic 2.5+** - Data validation and settings management

### AI & ML Stack
- **Groq** - Primary LLM provider (Llama 3.1 70B)
- **OpenAI** - Alternative LLM provider (GPT-4)
- **Anthropic** - Alternative LLM provider (Claude 3)
- **Sentence Transformers** - Local embedding generation
- **FAISS** - Vector similarity search
- **Chroma** - Alternative vector database

### Document Processing
- **PyPDF 3.17+** - PDF parsing
- **python-docx 1.1+** - Word document processing
- **tiktoken 0.5+** - Token counting and management

---

## Project Structure

```
flowragen/
├── backend/
│   ├── main.py                 # FastAPI application entry point
│   ├── workflow_executor.py    # LangGraph pipeline execution engine
│   ├── nodes.py                # Node implementations (12 types)
│   ├── config.py               # Configuration and environment management
│   ├── requirements.txt        # Python dependencies
│   └── .env                    # Environment variables (API keys)
│
├── src/
│   ├── pages/
│   │   ├── LandingPage.jsx     # Marketing landing page
│   │   ├── WorkflowBuilder.jsx # Main canvas editor
│   │   ├── FeaturesPage.jsx    # Feature showcase
│   │   └── AboutPage.jsx       # About section
│   ├── components/
│   │   └── Toast.jsx           # Notification system
│   ├── config/
│   │   └── nodeConfigs.js      # Node type definitions
│   ├── App.jsx                 # Root component with routing
│   └── main.jsx                # Application entry point
│
├── public/
│   └── flowragen-logo.svg      # Brand logo
│
├── package.json                # Node.js dependencies
├── vite.config.js              # Vite configuration
└── index.html                  # HTML entry point
```

---

## Node Types

Flowragen provides 12 specialized node types organized into 5 categories:

### Data Input Nodes
- **Document Loader** - Import PDF, DOCX, TXT files
- **Text Input** - Manual text entry for queries

### Processing Nodes
- **Text Splitter** - Chunk documents with configurable size and overlap
- **Embedder** - Generate vector embeddings (OpenAI, HuggingFace, local)
- **Summarizer** - Create document summaries using LLMs

### Retrieval Nodes
- **Vector Store** - Persist embeddings in FAISS or Chroma
- **Retriever** - Semantic search with configurable top-k
- **Ranker** - Re-rank retrieved documents by relevance

### LLM Nodes
- **Prompt Template** - Structure prompts with variables
- **LLM Answer** - Generate responses using GPT-4, Llama, or Claude

### Output Nodes
- **Output Visualizer** - Format and display results
- **JSON Output** - Export structured data

---

## Quick Start

### Prerequisites
- Python 3.11 or higher
- Node.js 16+ (for frontend development)
- Git

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/yourusername/flowragen.git
cd flowragen
```

**2. Start the frontend**
```bash
# Using Python's built-in server (simplest)
python -m http.server 3000

# Or using Node.js (for development)
npm install
npm run dev
```

**3. Configure the backend**
```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate

pip install -r requirements.txt
```

**4. Add API keys (optional for demo mode)**

Edit `backend/.env`:
```env
GROQ_API_KEY=your_groq_api_key_here
DEFAULT_LLM_PROVIDER=groq
```

Get a free Groq API key at [console.groq.com](https://console.groq.com)

**5. Start the backend**
```bash
python main.py
```

**6. Access the application**
- Frontend: `http://localhost:3000`
- Workflow Builder: `http://localhost:3000/workflow`
- API Documentation: `http://localhost:8000/docs`

---

## Usage Guide

### Building Your First Workflow

1. **Open the Workflow Builder**
   Navigate to `http://localhost:3000/workflow`

2. **Add Nodes**
   Drag nodes from the left palette onto the canvas:
   - Document Loader (to load your data)
   - Text Splitter (to chunk documents)
   - Embedder (to create vectors)
   - Vector Store (to persist embeddings)
   - Retriever (to search semantically)
   - LLM Answer (to generate responses)
   - Output Visualizer (to display results)

3. **Connect Nodes**
   Click the output port (right side) of one node, then click the input port (left side) of the next node to create connections.

4. **Configure Nodes**
   Click any node to open the properties panel. Adjust parameters like:
   - Chunk size and overlap for Text Splitter
   - Embedding model for Embedder
   - Top-k results for Retriever
   - Temperature and model for LLM Answer

5. **Execute Workflow**
   Click the "Run Workflow" button. View real-time execution traces and inspect outputs at each stage.

6. **Export Code**
   Click "Export Code" to download production-ready Python code using LangGraph.

### Example Workflow: Document Q&A

```
Document Loader → Text Splitter → Embedder → Vector Store
                                                    ↓
                                                Retriever
                                                    ↓
                                                LLM Answer
                                                    ↓
                                            Output Visualizer
```

This pipeline:
1. Loads documents from your filesystem
2. Splits them into manageable chunks
3. Generates embeddings for semantic search
4. Stores vectors in FAISS
5. Retrieves relevant context for queries
6. Generates answers using an LLM
7. Displays formatted results

---

## API Reference

### Core Endpoints

**POST /api/execute**
Execute a workflow with the provided configuration.

Request:
```json
{
  "nodes": [
    {"id": "node-1", "type": "document-loader", "config": {...}},
    {"id": "node-2", "type": "text-splitter", "config": {...}}
  ],
  "edges": [
    {"from": "node-1", "to": "node-2"}
  ],
  "query": "What is this document about?"
}
```

Response:
```json
{
  "status": "success",
  "execution_time": 2.34,
  "trace": [...],
  "output": "This document discusses..."
}
```

**POST /api/validate**
Validate workflow configuration before execution.

**POST /api/export**
Generate Python code from workflow definition.

**GET /api/nodes**
List all available node types and their configurations.

**GET /api/templates**
Retrieve pre-built workflow templates.

Full API documentation available at `http://localhost:8000/docs`

---

## Configuration

### Environment Variables

Create `backend/.env` with the following:

```env
# LLM Provider (groq, openai, anthropic)
DEFAULT_LLM_PROVIDER=groq

# API Keys
GROQ_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here
ANTHROPIC_API_KEY=your_key_here

# Model Selection
GROQ_MODEL=llama-3.1-70b-versatile
OPENAI_MODEL=gpt-4-turbo
EMBEDDING_MODEL=text-embedding-ada-002

# Vector Store
VECTOR_STORE_TYPE=faiss
VECTOR_STORE_PATH=./vector_stores

# Application
DEBUG=True
LOG_LEVEL=INFO
```

### Provider Comparison

| Provider | Speed | Cost | Best For |
|----------|-------|------|----------|
| **Groq** | Fastest | Free | Development, prototyping |
| **OpenAI** | Fast | Paid | Production, complex reasoning |
| **Anthropic** | Medium | Paid | Long context, analysis |

---

## Deployment

### Frontend Deployment

**Netlify/Vercel**
```bash
npm run build
# Deploy the dist/ folder
```

**Static Hosting**
```bash
python -m http.server 3000
# Or use nginx, Apache, etc.
```

### Backend Deployment

**Docker**
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY backend/requirements.txt .
RUN pip install -r requirements.txt
COPY backend/ .
CMD ["python", "main.py"]
```

**Railway/Heroku**
```bash
# Add Procfile
web: cd backend && python main.py
```

**Environment Variables**
Ensure all API keys are set in your deployment platform's environment configuration.

---

## Performance Considerations

### Optimization Strategies

1. **Embedding Caching**: Store generated embeddings to avoid recomputation
2. **Batch Processing**: Process multiple documents in parallel
3. **Vector Store Indexing**: Use FAISS IVF indices for large datasets
4. **LLM Response Streaming**: Stream responses for better UX
5. **Connection Pooling**: Reuse HTTP connections to LLM providers

### Scalability

- **Horizontal Scaling**: Deploy multiple backend instances behind a load balancer
- **Async Execution**: FastAPI's async support handles concurrent requests efficiently
- **Vector Store Sharding**: Distribute embeddings across multiple FAISS indices
- **Caching Layer**: Add Redis for frequently accessed data

---

## Troubleshooting

### Common Issues

**Backend won't start**
```bash
# Check Python version
python --version  # Should be 3.11+

# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

**API key errors**
```bash
# Verify .env file exists
ls backend/.env

# Check configuration status
curl http://localhost:8000/api/config
```

**Frontend connection issues**
```bash
# Verify backend is running
curl http://localhost:8000/api/health

# Check CORS settings in main.py
```

**Workflow execution fails**
- Verify all nodes are properly connected
- Check node configurations in properties panel
- Inspect execution trace for specific error messages
- Ensure API keys are valid and have sufficient quota

---

## Roadmap

### Planned Features

- [ ] Custom node creation SDK
- [ ] Workflow versioning and rollback
- [ ] Collaborative editing (multi-user)
- [ ] Advanced debugging tools (breakpoints, step-through)
- [ ] Integration with external vector databases (Pinecone, Weaviate)
- [ ] Workflow templates marketplace
- [ ] Performance profiling and optimization suggestions
- [ ] Automated testing framework for workflows
- [ ] Multi-language support (TypeScript, Go, Rust code generation)

---

## Contributing

Contributions are welcome. Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Setup

```bash
# Install pre-commit hooks
pip install pre-commit
pre-commit install

# Run tests
cd backend
pytest

# Run linter
flake8 .
```

---

## License

See [LICENSE](./LICENSE) for details.

---

## Acknowledgments

Built with:
- [LangChain](https://github.com/langchain-ai/langchain) - LLM orchestration
- [LangGraph](https://github.com/langchain-ai/langgraph) - Stateful agent framework
- [FastAPI](https://fastapi.tiangolo.com/) - Modern Python web framework
- [React](https://reactjs.org/) - UI library
- [FAISS](https://github.com/facebookresearch/faiss) - Vector similarity search

---

## Support

- Documentation: [Read the full docs](./QUICKSTART.md)
- Issues: [GitHub Issues](https://github.com/yourusername/flowragen/issues)
- Discussions: [GitHub Discussions](https://github.com/yourusername/flowragen/discussions)

---

<div align="center">
  <p>Built for the RAG community by developers who believe in visual thinking.</p>
  <p><strong>Make RAG accessible. Make RAG visual. Make RAG powerful.</strong></p>
</div>
