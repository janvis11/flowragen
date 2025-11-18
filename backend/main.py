"""
RAGFlow Backend - FastAPI Server
Handles workflow execution and LangGraph pipeline orchestration
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import uvicorn
from datetime import datetime

from workflow_executor import WorkflowExecutor
from nodes import NodeRegistry
from config import config

app = FastAPI(
    title="RAGFlow API",
    description="Visual Builder for LangGraph RAG Pipelines",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize components
node_registry = NodeRegistry()
workflow_executor = WorkflowExecutor(node_registry)


# Request/Response Models
class NodeConfig(BaseModel):
    id: str
    type: str
    config: Dict[str, Any]


class EdgeConfig(BaseModel):
    from_: Optional[str] = None
    to: str
    
    model_config = {
        "populate_by_name": True
    }
    
    @classmethod
    def model_validate(cls, obj):
        if isinstance(obj, dict) and 'from' in obj:
            obj['from_'] = obj.pop('from')
        return super().model_validate(obj)


class WorkflowRequest(BaseModel):
    nodes: List[NodeConfig]
    edges: List[EdgeConfig]
    query: Optional[str] = None


class ExecutionTrace(BaseModel):
    node_id: str
    node_type: str
    status: str
    execution_time: float
    output: Any


class WorkflowResponse(BaseModel):
    status: str
    execution_time: float
    trace: List[ExecutionTrace]
    output: Any
    error: Optional[str] = None


# API Endpoints
@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "RAGFlow API",
        "version": "1.0.0",
        "status": "running"
    }


@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "config": config.get_status()
    }


@app.get("/api/config")
async def get_config():
    """Get configuration status"""
    validation = config.validate()
    return {
        "status": config.get_status(),
        "validation": validation
    }


@app.get("/api/nodes")
async def get_available_nodes():
    """Get list of available node types"""
    return {
        "nodes": node_registry.get_all_node_types()
    }


@app.post("/api/execute")
async def execute_workflow(workflow: WorkflowRequest):
    """
    Execute a workflow
    
    Receives workflow configuration and executes the LangGraph pipeline
    """
    try:
        start_time = datetime.now()
        
        print(f"Executing workflow with {len(workflow.nodes)} nodes and {len(workflow.edges)} edges")
        
        # Convert Pydantic models to dicts
        nodes_dict = [node.model_dump() for node in workflow.nodes]
        edges_dict = [edge.model_dump(by_alias=True) for edge in workflow.edges]
        
        # Execute workflow
        result = await workflow_executor.execute(
            nodes=nodes_dict,
            edges=edges_dict,
            query=workflow.query
        )
        
        execution_time = (datetime.now() - start_time).total_seconds()
        
        return {
            "status": "success",
            "execution_time": execution_time,
            "trace": result["trace"],
            "output": result["output"],
            "error": None
        }
        
    except Exception as e:
        import traceback
        error_details = traceback.format_exc()
        print(f"Workflow execution error: {error_details}")
        
        return {
            "status": "error",
            "execution_time": 0.0,
            "trace": [],
            "output": None,
            "error": f"Workflow execution failed: {str(e)}"
        }


@app.post("/api/validate")
async def validate_workflow(workflow: WorkflowRequest):
    """
    Validate workflow configuration
    
    Checks for errors in node connections and configurations
    """
    try:
        # Convert Pydantic models to dicts
        nodes_dict = [node.model_dump() for node in workflow.nodes]
        edges_dict = [edge.model_dump(by_alias=True) for edge in workflow.edges]
        
        validation_result = workflow_executor.validate(
            nodes=nodes_dict,
            edges=edges_dict
        )
        
        return {
            "valid": validation_result["valid"],
            "errors": validation_result.get("errors", []),
            "warnings": validation_result.get("warnings", [])
        }
        
    except Exception as e:
        return {
            "valid": False,
            "errors": [str(e)]
        }


@app.post("/api/export")
async def export_workflow(workflow: WorkflowRequest):
    """
    Export workflow as Python code
    
    Generates executable Python code for the workflow
    """
    try:
        # Convert Pydantic models to dicts
        nodes_dict = [node.model_dump() for node in workflow.nodes]
        edges_dict = [edge.model_dump(by_alias=True) for edge in workflow.edges]
        
        code = workflow_executor.generate_code(
            nodes=nodes_dict,
            edges=edges_dict
        )
        
        return {
            "code": code,
            "language": "python"
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Code generation failed: {str(e)}"
        )


@app.get("/api/templates")
async def get_templates():
    """Get pre-built workflow templates"""
    templates = [
        {
            "id": "basic-rag",
            "name": "Basic RAG Pipeline",
            "description": "Simple document Q&A with retrieval",
            "nodes": [
                {"type": "document-loader", "config": {}},
                {"type": "text-splitter", "config": {}},
                {"type": "embedder", "config": {}},
                {"type": "vector-store", "config": {}},
                {"type": "retriever", "config": {}},
                {"type": "llm-answer", "config": {}},
                {"type": "output-visualizer", "config": {}}
            ]
        },
        {
            "id": "advanced-rag",
            "name": "Advanced RAG with Ranking",
            "description": "RAG pipeline with document ranking",
            "nodes": [
                {"type": "document-loader", "config": {}},
                {"type": "text-splitter", "config": {}},
                {"type": "embedder", "config": {}},
                {"type": "vector-store", "config": {}},
                {"type": "retriever", "config": {}},
                {"type": "ranker", "config": {}},
                {"type": "llm-answer", "config": {}},
                {"type": "output-visualizer", "config": {}}
            ]
        },
        {
            "id": "summarization",
            "name": "Document Summarization",
            "description": "Summarize long documents",
            "nodes": [
                {"type": "document-loader", "config": {}},
                {"type": "text-splitter", "config": {}},
                {"type": "summarizer", "config": {}},
                {"type": "output-visualizer", "config": {}}
            ]
        }
    ]
    
    return {"templates": templates}


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
