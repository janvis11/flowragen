// Node Configuration Definitions
export const nodeConfigs = {
  'document-loader': {
    fields: [
      { name: 'source', label: 'Source', type: 'select', options: ['upload', 'url', 'local'], default: 'upload' },
      { name: 'path', label: 'File Path', type: 'text', default: 'docs/' },
      { name: 'fileTypes', label: 'File Types (comma-separated)', type: 'text', default: 'pdf,txt,docx' }
    ]
  },
  'text-input': {
    fields: [
      { name: 'text', label: 'Input Text', type: 'textarea', default: 'Enter your text here...' },
      { name: 'variable', label: 'Variable Name', type: 'text', default: 'query' }
    ]
  },
  'text-splitter': {
    fields: [
      { name: 'chunkSize', label: 'Chunk Size', type: 'number', default: 1000 },
      { name: 'chunkOverlap', label: 'Chunk Overlap', type: 'number', default: 200 },
      { name: 'separator', label: 'Separator', type: 'text', default: '\\n\\n' }
    ]
  },
  'embedder': {
    fields: [
      { name: 'model', label: 'Model Provider', type: 'select', options: ['openai', 'huggingface', 'cohere'], default: 'openai' },
      { name: 'modelName', label: 'Model Name', type: 'text', default: 'text-embedding-ada-002' },
      { name: 'dimensions', label: 'Dimensions', type: 'number', default: 1536 }
    ]
  },
  'summarizer': {
    fields: [
      { name: 'model', label: 'Groq Model', type: 'select', options: ['llama-3.1-8b-instant', 'llama-3.1-70b-versatile', 'mixtral-8x7b-32768'], default: 'llama-3.1-8b-instant' },
      { name: 'maxLength', label: 'Max Length', type: 'number', default: 500 },
      { name: 'style', label: 'Summary Style', type: 'select', options: ['concise', 'detailed', 'bullet-points'], default: 'concise' }
    ]
  },
  'vector-store': {
    fields: [
      { name: 'type', label: 'Store Type', type: 'select', options: ['faiss', 'chroma', 'pinecone'], default: 'faiss' },
      { name: 'indexName', label: 'Index Name', type: 'text', default: 'default' },
      { name: 'persist', label: 'Persist to Disk', type: 'checkbox', default: true }
    ]
  },
  'retriever': {
    fields: [
      { name: 'topK', label: 'Top K Results', type: 'number', default: 3 },
      { name: 'scoreThreshold', label: 'Score Threshold', type: 'number', default: 0.7, step: 0.1 },
      { name: 'searchType', label: 'Search Type', type: 'select', options: ['similarity', 'mmr', 'similarity_score_threshold'], default: 'similarity' }
    ]
  },
  'ranker': {
    fields: [
      { name: 'model', label: 'Ranker Model', type: 'select', options: ['cross-encoder', 'colbert', 'bge-reranker'], default: 'cross-encoder' },
      { name: 'topN', label: 'Top N Results', type: 'number', default: 3 },
      { name: 'threshold', label: 'Score Threshold', type: 'number', default: 0.5, step: 0.1 }
    ]
  },
  'prompt-template': {
    fields: [
      { name: 'template', label: 'Prompt Template', type: 'textarea', default: 'Context: {context}\\n\\nQuestion: {question}\\n\\nAnswer:' },
      { name: 'variables', label: 'Variables (comma-separated)', type: 'text', default: 'context,question' }
    ]
  },
  'llm-answer': {
    fields: [
      { name: 'model', label: 'Groq Model', type: 'select', options: ['llama-3.1-8b-instant', 'llama-3.1-70b-versatile', 'mixtral-8x7b-32768', 'gemma2-9b-it'], default: 'llama-3.1-8b-instant' },
      { name: 'temperature', label: 'Temperature', type: 'number', default: 0.7, step: 0.1 },
      { name: 'maxTokens', label: 'Max Tokens', type: 'number', default: 1000 },
      { name: 'systemPrompt', label: 'System Prompt', type: 'textarea', default: 'You are a helpful AI assistant.' }
    ]
  },
  'output-visualizer': {
    fields: [
      { name: 'format', label: 'Output Format', type: 'select', options: ['formatted', 'markdown', 'html'], default: 'formatted' },
      { name: 'showMetadata', label: 'Show Metadata', type: 'checkbox', default: true }
    ]
  },
  'json-output': {
    fields: [
      { name: 'pretty', label: 'Pretty Print', type: 'checkbox', default: true },
      { name: 'indent', label: 'Indent Spaces', type: 'number', default: 2 }
    ]
  }
};
