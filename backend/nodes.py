"""
RAGFlow Node Implementations
Each node represents a step in the RAG pipeline
"""

from abc import ABC, abstractmethod
from typing import Any, Dict, List
import time


class BaseNode(ABC):
    """Base class for all workflow nodes"""
    
    def __init__(self, node_id: str, config: Dict[str, Any]):
        self.node_id = node_id
        self.config = config
        
    @abstractmethod
    async def execute(self, state: Dict[str, Any]) -> Dict[str, Any]:
        """Execute the node logic"""
        pass
    
    def get_execution_time(self) -> float:
        """Get execution time in seconds"""
        return getattr(self, '_execution_time', 0.0)


class DocumentLoaderNode(BaseNode):
    """Load documents from various sources"""
    
    async def execute(self, state: Dict[str, Any]) -> Dict[str, Any]:
        start_time = time.time()
        
        source = self.config.get('source', 'upload')
        path = self.config.get('path', '')
        
        # Simulate document loading
        documents = [
            {"content": "Sample document content 1", "metadata": {"source": path}},
            {"content": "Sample document content 2", "metadata": {"source": path}},
        ]
        
        state['documents'] = documents
        state['data'] = documents
        
        self._execution_time = time.time() - start_time
        return state


class TextInputNode(BaseNode):
    """Manual text input"""
    
    async def execute(self, state: Dict[str, Any]) -> Dict[str, Any]:
        start_time = time.time()
        
        text = self.config.get('text', '')
        state['data'] = text
        state['query'] = text
        
        self._execution_time = time.time() - start_time
        return state


class TextSplitterNode(BaseNode):
    """Split text into chunks"""
    
    async def execute(self, state: Dict[str, Any]) -> Dict[str, Any]:
        start_time = time.time()
        
        chunk_size = self.config.get('chunkSize', 1000)
        chunk_overlap = self.config.get('chunkOverlap', 200)
        
        documents = state.get('documents', [])
        chunks = []
        
        for doc in documents:
            content = doc.get('content', '')
            # Simple chunking simulation
            for i in range(0, len(content), chunk_size - chunk_overlap):
                chunk = content[i:i + chunk_size]
                if chunk:
                    chunks.append({
                        "content": chunk,
                        "metadata": doc.get('metadata', {})
                    })
        
        state['chunks'] = chunks
        state['data'] = chunks
        
        self._execution_time = time.time() - start_time
        return state


class EmbedderNode(BaseNode):
    """Generate embeddings for text"""
    
    async def execute(self, state: Dict[str, Any]) -> Dict[str, Any]:
        start_time = time.time()
        
        model = self.config.get('model', 'openai')
        model_name = self.config.get('modelName', 'text-embedding-ada-002')
        
        chunks = state.get('chunks', [])
        
        # Simulate embedding generation
        embeddings = []
        for chunk in chunks:
            # Mock embedding (in reality, call OpenAI/HuggingFace API)
            embedding = [0.1] * 1536  # Mock 1536-dim vector
            embeddings.append({
                "content": chunk['content'],
                "embedding": embedding,
                "metadata": chunk.get('metadata', {})
            })
        
        state['embeddings'] = embeddings
        state['data'] = embeddings
        
        self._execution_time = time.time() - start_time
        return state


class VectorStoreNode(BaseNode):
    """Store and index embeddings"""
    
    async def execute(self, state: Dict[str, Any]) -> Dict[str, Any]:
        start_time = time.time()
        
        store_type = self.config.get('type', 'faiss')
        index_name = self.config.get('indexName', 'default')
        
        embeddings = state.get('embeddings', [])
        
        # Simulate vector store indexing
        state['vector_store'] = {
            "type": store_type,
            "index": index_name,
            "count": len(embeddings),
            "embeddings": embeddings
        }
        
        self._execution_time = time.time() - start_time
        return state


class RetrieverNode(BaseNode):
    """Retrieve relevant documents"""
    
    async def execute(self, state: Dict[str, Any]) -> Dict[str, Any]:
        start_time = time.time()
        
        top_k = self.config.get('topK', 3)
        score_threshold = self.config.get('scoreThreshold', 0.7)
        
        query = state.get('query', '')
        vector_store = state.get('vector_store', {})
        embeddings = vector_store.get('embeddings', [])
        
        # Simulate retrieval (in reality, perform similarity search)
        retrieved = embeddings[:top_k] if embeddings else []
        
        state['retrieved_docs'] = retrieved
        state['context'] = [doc['content'] for doc in retrieved]
        state['data'] = retrieved
        
        self._execution_time = time.time() - start_time
        return state


class RankerNode(BaseNode):
    """Rank retrieved documents"""
    
    async def execute(self, state: Dict[str, Any]) -> Dict[str, Any]:
        start_time = time.time()
        
        method = self.config.get('method', 'cross-encoder')
        model = self.config.get('model', 'ms-marco-MiniLM-L-6-v2')
        
        retrieved_docs = state.get('retrieved_docs', [])
        
        # Simulate ranking (in reality, use cross-encoder)
        ranked_docs = sorted(
            retrieved_docs,
            key=lambda x: len(x.get('content', '')),
            reverse=True
        )
        
        state['ranked_docs'] = ranked_docs
        state['context'] = [doc['content'] for doc in ranked_docs]
        state['data'] = ranked_docs
        
        self._execution_time = time.time() - start_time
        return state


class SummarizerNode(BaseNode):
    """Summarize text"""
    
    async def execute(self, state: Dict[str, Any]) -> Dict[str, Any]:
        start_time = time.time()
        
        model = self.config.get('model', 'gpt-3.5-turbo')
        max_length = self.config.get('maxLength', 500)
        
        data = state.get('data', [])
        
        # Simulate summarization
        if isinstance(data, list):
            content = " ".join([str(item.get('content', item)) for item in data])
        else:
            content = str(data)
        
        summary = f"Summary: {content[:max_length]}..."
        
        state['summary'] = summary
        state['data'] = summary
        
        self._execution_time = time.time() - start_time
        return state


class LLMAnswerNode(BaseNode):
    """Generate answer using LLM with Groq"""
    
    async def execute(self, state: Dict[str, Any]) -> Dict[str, Any]:
        start_time = time.time()
        
        model = self.config.get('model', 'llama-3.1-8b-instant')
        temperature = self.config.get('temperature', 0.7)
        max_tokens = self.config.get('maxTokens', 1000)
        system_prompt = self.config.get('systemPrompt', 'You are a helpful AI assistant.')
        
        query = state.get('query', '')
        context = state.get('context', [])
        
        # Try to use real Groq API
        try:
            import os
            from groq import Groq
            
            groq_api_key = os.getenv('GROQ_API_KEY')
            
            if groq_api_key and groq_api_key != 'your_groq_api_key_here':
                # Real Groq API call
                client = Groq(api_key=groq_api_key)
                
                context_str = "\n\n".join(context) if context else "No context available"
                
                user_message = f"""Context:
{context_str}

Question: {query}

Please provide a detailed answer based on the context above."""
                
                chat_completion = client.chat.completions.create(
                    messages=[
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": user_message}
                    ],
                    model=model,
                    temperature=temperature,
                    max_tokens=max_tokens,
                )
                
                answer = chat_completion.choices[0].message.content
                
            else:
                # Fallback to mock response
                context_str = "\n\n".join(context) if context else "No context available"
                answer = f"""[DEMO MODE - Add Groq API key for real responses]

Query: {query}

Context: {context_str[:200]}...

Answer: This is a simulated response. Configure your Groq API key in backend/.env to get real LLM responses.

Model: {model}
Temperature: {temperature}
"""
        
        except Exception as e:
            # Fallback on error
            answer = f"Error calling Groq API: {str(e)}\n\nPlease check your API key in backend/.env"
        
        state['answer'] = answer
        state['result'] = answer
        state['data'] = answer
        
        self._execution_time = time.time() - start_time
        return state


class PromptTemplateNode(BaseNode):
    """Format prompt for LLM"""
    
    async def execute(self, state: Dict[str, Any]) -> Dict[str, Any]:
        start_time = time.time()
        
        template = self.config.get('template', '')
        
        # Replace placeholders
        formatted = template
        for key, value in state.items():
            placeholder = f"{{{key}}}"
            if placeholder in formatted:
                if isinstance(value, list):
                    value = "\n".join([str(v) for v in value])
                formatted = formatted.replace(placeholder, str(value))
        
        state['prompt'] = formatted
        state['data'] = formatted
        
        self._execution_time = time.time() - start_time
        return state


class OutputVisualizerNode(BaseNode):
    """Display results"""
    
    async def execute(self, state: Dict[str, Any]) -> Dict[str, Any]:
        start_time = time.time()
        
        format_type = self.config.get('format', 'formatted')
        
        result = state.get('result', state.get('data', 'No output'))
        
        if format_type == 'formatted':
            output = {
                "type": "formatted",
                "content": result,
                "metadata": {
                    "timestamp": time.time(),
                    "format": format_type
                }
            }
        else:
            output = result
        
        state['output'] = output
        
        self._execution_time = time.time() - start_time
        return state


class JSONOutputNode(BaseNode):
    """Output as JSON"""
    
    async def execute(self, state: Dict[str, Any]) -> Dict[str, Any]:
        start_time = time.time()
        
        pretty = self.config.get('pretty', True)
        
        import json
        
        output = json.dumps(
            state.get('data', {}),
            indent=2 if pretty else None
        )
        
        state['output'] = output
        
        self._execution_time = time.time() - start_time
        return state


class NodeRegistry:
    """Registry of all available node types"""
    
    def __init__(self):
        self.nodes = {
            'document-loader': DocumentLoaderNode,
            'text-input': TextInputNode,
            'text-splitter': TextSplitterNode,
            'embedder': EmbedderNode,
            'vector-store': VectorStoreNode,
            'retriever': RetrieverNode,
            'ranker': RankerNode,
            'summarizer': SummarizerNode,
            'llm-answer': LLMAnswerNode,
            'prompt-template': PromptTemplateNode,
            'output-visualizer': OutputVisualizerNode,
            'json-output': JSONOutputNode,
        }
    
    def get_node_class(self, node_type: str):
        """Get node class by type"""
        return self.nodes.get(node_type)
    
    def create_node(self, node_id: str, node_type: str, config: Dict[str, Any]) -> BaseNode:
        """Create a node instance"""
        node_class = self.get_node_class(node_type)
        if not node_class:
            raise ValueError(f"Unknown node type: {node_type}")
        return node_class(node_id, config)
    
    def get_all_node_types(self) -> List[Dict[str, str]]:
        """Get list of all available node types"""
        return [
            {"type": node_type, "class": node_class.__name__}
            for node_type, node_class in self.nodes.items()
        ]
