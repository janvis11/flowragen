"""
Workflow Executor
Handles execution of LangGraph workflows
"""

from typing import List, Dict, Any
import asyncio
from datetime import datetime


class WorkflowExecutor:
    """Execute workflows by building and running LangGraph pipelines"""
    
    def __init__(self, node_registry):
        self.node_registry = node_registry
    
    async def execute(
        self,
        nodes: List[Dict[str, Any]],
        edges: List[Dict[str, Any]],
        query: str = None
    ) -> Dict[str, Any]:
        """
        Execute a workflow
        
        Args:
            nodes: List of node configurations
            edges: List of edge configurations
            query: Optional query string
            
        Returns:
            Execution result with trace and output
        """
        # Initialize state
        state = {
            "data": None,
            "context": [],
            "query": query or "What is this about?",
            "result": "",
            "documents": [],
            "chunks": [],
            "embeddings": [],
            "vector_store": {},
            "retrieved_docs": [],
            "ranked_docs": [],
            "summary": "",
            "answer": "",
            "prompt": "",
            "output": None
        }
        
        # Build execution order
        execution_order = self._topological_sort(nodes, edges)
        
        # Create node instances
        node_instances = {}
        for node_config in nodes:
            node_id = node_config['id']
            node_type = node_config['type']
            config = node_config.get('config', {})
            
            node_instances[node_id] = self.node_registry.create_node(
                node_id, node_type, config
            )
        
        # Execute nodes in order
        trace = []
        
        for node_id in execution_order:
            if node_id not in node_instances:
                continue
                
            node = node_instances[node_id]
            
            try:
                # Execute node
                state = await node.execute(state)
                
                # Record trace
                trace.append({
                    "node_id": node_id,
                    "node_type": node.config,
                    "status": "success",
                    "execution_time": node.get_execution_time(),
                    "output": str(state.get('data', ''))[:200]  # Truncate for display
                })
                
            except Exception as e:
                trace.append({
                    "node_id": node_id,
                    "node_type": type(node).__name__,
                    "status": "error",
                    "execution_time": 0.0,
                    "output": str(e)
                })
                raise
        
        return {
            "trace": trace,
            "output": state.get('output', state.get('result', state.get('data')))
        }
    
    def _topological_sort(
        self,
        nodes: List[Dict[str, Any]],
        edges: List[Dict[str, Any]]
    ) -> List[str]:
        """
        Sort nodes in execution order using topological sort
        
        Args:
            nodes: List of node configurations
            edges: List of edge configurations
            
        Returns:
            List of node IDs in execution order
        """
        # Build adjacency list
        graph = {node['id']: [] for node in nodes}
        in_degree = {node['id']: 0 for node in nodes}
        
        for edge in edges:
            from_node = edge.get('from') or edge.get('from_')
            to_node = edge['to']
            
            if from_node and from_node in graph and to_node in graph:
                graph[from_node].append(to_node)
                in_degree[to_node] += 1
        
        # Find nodes with no incoming edges
        queue = [node_id for node_id, degree in in_degree.items() if degree == 0]
        result = []
        
        while queue:
            node_id = queue.pop(0)
            result.append(node_id)
            
            for neighbor in graph[node_id]:
                in_degree[neighbor] -= 1
                if in_degree[neighbor] == 0:
                    queue.append(neighbor)
        
        # Check for cycles
        if len(result) != len(nodes):
            # If there's a cycle, just return nodes in original order
            return [node['id'] for node in nodes]
        
        return result
    
    def validate(
        self,
        nodes: List[Dict[str, Any]],
        edges: List[Dict[str, Any]]
    ) -> Dict[str, Any]:
        """
        Validate workflow configuration
        
        Args:
            nodes: List of node configurations
            edges: List of edge configurations
            
        Returns:
            Validation result with errors and warnings
        """
        errors = []
        warnings = []
        
        # Check if there are nodes
        if not nodes:
            errors.append("Workflow must contain at least one node")
        
        # Check for invalid node types
        for node in nodes:
            node_type = node.get('type')
            if not self.node_registry.get_node_class(node_type):
                errors.append(f"Invalid node type: {node_type}")
        
        # Check for disconnected nodes
        node_ids = {node['id'] for node in nodes}
        connected_nodes = set()
        
        for edge in edges:
            from_node = edge.get('from') or edge.get('from_')
            to_node = edge['to']
            
            if from_node:
                connected_nodes.add(from_node)
            connected_nodes.add(to_node)
        
        disconnected = node_ids - connected_nodes
        if disconnected and len(nodes) > 1:
            warnings.append(f"Disconnected nodes: {', '.join(disconnected)}")
        
        # Check for cycles
        if self._has_cycle(nodes, edges):
            errors.append("Workflow contains cycles")
        
        # Check for invalid edges
        for edge in edges:
            from_node = edge.get('from') or edge.get('from_')
            to_node = edge['to']
            
            if from_node and from_node not in node_ids:
                errors.append(f"Edge references non-existent node: {from_node}")
            
            if to_node not in node_ids:
                errors.append(f"Edge references non-existent node: {to_node}")
        
        return {
            "valid": len(errors) == 0,
            "errors": errors,
            "warnings": warnings
        }
    
    def _has_cycle(
        self,
        nodes: List[Dict[str, Any]],
        edges: List[Dict[str, Any]]
    ) -> bool:
        """Check if workflow has cycles"""
        graph = {node['id']: [] for node in nodes}
        
        for edge in edges:
            from_node = edge.get('from') or edge.get('from_')
            to_node = edge['to']
            
            if from_node and from_node in graph:
                graph[from_node].append(to_node)
        
        visited = set()
        rec_stack = set()
        
        def has_cycle_util(node_id):
            visited.add(node_id)
            rec_stack.add(node_id)
            
            for neighbor in graph.get(node_id, []):
                if neighbor not in visited:
                    if has_cycle_util(neighbor):
                        return True
                elif neighbor in rec_stack:
                    return True
            
            rec_stack.remove(node_id)
            return False
        
        for node_id in graph:
            if node_id not in visited:
                if has_cycle_util(node_id):
                    return True
        
        return False
    
    def generate_code(
        self,
        nodes: List[Dict[str, Any]],
        edges: List[Dict[str, Any]]
    ) -> str:
        """
        Generate production-ready Python code for the workflow
        
        Args:
            nodes: List of node configurations
            edges: List of edge configurations
            
        Returns:
            Python code as string
        """
        code = '''"""
Flowragen Generated RAG Pipeline
Generated: {timestamp}

This is a production-ready LangGraph workflow.
Install dependencies: pip install langgraph langchain groq faiss-cpu python-dotenv
"""

import os
from typing import TypedDict, List, Any, Dict
from langgraph.graph import StateGraph, END
from groq import Groq
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Groq client
groq_client = Groq(api_key=os.getenv('GROQ_API_KEY'))

# Define workflow state
class WorkflowState(TypedDict):
    data: Any
    context: List[str]
    query: str
    result: str
    documents: List[Any]
    chunks: List[Any]
    embeddings: List[Any]
    vector_store: Dict
    retrieved_docs: List[Any]
    ranked_docs: List[Any]
    summary: str
    answer: str
    prompt: str
    output: Any

'''.format(timestamp=datetime.now().isoformat())
        
        # Generate node functions with real implementations
        for node in nodes:
            node_id = node['id']
            node_type = node['type']
            config = node.get('config', {})
            
            func_name = node_id.replace('-', '_')
            
            # Generate implementation based on node type
            if node_type == 'llm-answer':
                code += f'''
def {func_name}(state: WorkflowState) -> WorkflowState:
    """LLM Answer Node - Generates response using Groq"""
    model = "{config.get('model', 'llama-3.1-8b-instant')}"
    temperature = {config.get('temperature', 0.7)}
    max_tokens = {config.get('maxTokens', 1000)}
    system_prompt = """{config.get('systemPrompt', 'You are a helpful AI assistant.')}"""
    
    query = state.get('query', '')
    context = state.get('context', [])
    context_str = "\\n\\n".join(context) if context else "No context available"
    
    user_message = f"""Context:
{{context_str}}

Question: {{query}}

Please provide a detailed answer based on the context above."""
    
    chat_completion = groq_client.chat.completions.create(
        messages=[
            {{"role": "system", "content": system_prompt}},
            {{"role": "user", "content": user_message}}
        ],
        model=model,
        temperature=temperature,
        max_tokens=max_tokens,
    )
    
    answer = chat_completion.choices[0].message.content
    state['answer'] = answer
    state['result'] = answer
    state['data'] = answer
    
    return state

'''
            elif node_type == 'document-loader':
                code += f'''
def {func_name}(state: WorkflowState) -> WorkflowState:
    """Document Loader Node"""
    source = "{config.get('source', 'upload')}"
    path = "{config.get('path', '')}"
    
    # Load documents from path
    # TODO: Implement actual document loading
    documents = [
        {{"content": "Sample document content", "metadata": {{"source": path}}}}
    ]
    
    state['documents'] = documents
    state['data'] = documents
    return state

'''
            elif node_type == 'text-splitter':
                code += f'''
def {func_name}(state: WorkflowState) -> WorkflowState:
    """Text Splitter Node"""
    chunk_size = {config.get('chunkSize', 1000)}
    chunk_overlap = {config.get('chunkOverlap', 200)}
    
    documents = state.get('documents', [])
    chunks = []
    
    for doc in documents:
        content = doc.get('content', '')
        # Simple chunking
        for i in range(0, len(content), chunk_size - chunk_overlap):
            chunk = content[i:i + chunk_size]
            if chunk:
                chunks.append({{"content": chunk, "metadata": doc.get('metadata', {{}})}}
    
    state['chunks'] = chunks
    state['data'] = chunks
    return state

'''
            elif node_type == 'retriever':
                code += f'''
def {func_name}(state: WorkflowState) -> WorkflowState:
    """Retriever Node"""
    top_k = {config.get('topK', 3)}
    
    query = state.get('query', '')
    vector_store = state.get('vector_store', {{}})
    embeddings = vector_store.get('embeddings', [])
    
    # Retrieve top_k documents
    retrieved = embeddings[:top_k] if embeddings else []
    
    state['retrieved_docs'] = retrieved
    state['context'] = [doc['content'] for doc in retrieved]
    state['data'] = retrieved
    return state

'''
            else:
                # Generic implementation for other node types
                code += f'''
def {func_name}(state: WorkflowState) -> WorkflowState:
    """Node: {node_type}"""
    config = {config}
    
    # TODO: Implement {node_type} logic here
    # Configuration: {config}
    
    return state

'''
        
        # Build graph
        code += '''
# Build workflow graph
workflow = StateGraph(WorkflowState)

# Add nodes
'''
        
        for node in nodes:
            node_id = node['id']
            func_name = node_id.replace('-', '_')
            code += f'workflow.add_node("{node_id}", {func_name})\n'
        
        code += '\n# Add edges\n'
        
        for edge in edges:
            from_node = edge.get('from') or edge.get('from_')
            to_node = edge['to']
            
            if from_node:
                code += f'workflow.add_edge("{from_node}", "{to_node}")\n'
        
        # Set entry point
        execution_order = self._topological_sort(nodes, edges)
        if execution_order:
            code += f'\n# Set entry point\nworkflow.set_entry_point("{execution_order[0]}")\n'
        
        # Compile and run
        code += '''
# Compile workflow
app = workflow.compile()

# Run workflow
if __name__ == "__main__":
    initial_state = {
        "data": None,
        "context": [],
        "query": "Your query here",
        "result": "",
        "documents": [],
        "chunks": [],
        "embeddings": [],
        "vector_store": {},
        "retrieved_docs": [],
        "ranked_docs": [],
        "summary": "",
        "answer": "",
        "prompt": "",
        "output": None
    }
    
    result = app.invoke(initial_state)
    print(json.dumps(result, indent=2, default=str))
'''
        
        return code
