"""
Configuration management for RAGFlow backend
"""

import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


class Config:
    """Application configuration"""
    
    # API Keys
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY', '')
    GROQ_API_KEY = os.getenv('GROQ_API_KEY', '')
    HUGGINGFACE_API_KEY = os.getenv('HUGGINGFACE_API_KEY', '')
    ANTHROPIC_API_KEY = os.getenv('ANTHROPIC_API_KEY', '')
    
    # Default Provider
    DEFAULT_LLM_PROVIDER = os.getenv('DEFAULT_LLM_PROVIDER', 'groq')
    
    # Model Names
    OPENAI_MODEL = os.getenv('OPENAI_MODEL', 'gpt-4-turbo')
    GROQ_MODEL = os.getenv('GROQ_MODEL', 'llama-3.1-70b-versatile')
    ANTHROPIC_MODEL = os.getenv('ANTHROPIC_MODEL', 'claude-3-sonnet-20240229')
    EMBEDDING_MODEL = os.getenv('EMBEDDING_MODEL', 'text-embedding-ada-002')
    
    # Vector Store
    VECTOR_STORE_TYPE = os.getenv('VECTOR_STORE_TYPE', 'faiss')
    VECTOR_STORE_PATH = os.getenv('VECTOR_STORE_PATH', './vector_stores')
    
    # Application
    DEBUG = os.getenv('DEBUG', 'True').lower() == 'true'
    LOG_LEVEL = os.getenv('LOG_LEVEL', 'INFO')
    
    @classmethod
    def validate(cls):
        """Validate configuration"""
        warnings = []
        errors = []
        
        # Check if at least one API key is provided
        if not any([cls.OPENAI_API_KEY, cls.GROQ_API_KEY, cls.ANTHROPIC_API_KEY]):
            warnings.append("No API keys configured. Using mock responses.")
        
        # Check default provider has key
        if cls.DEFAULT_LLM_PROVIDER == 'openai' and not cls.OPENAI_API_KEY:
            warnings.append("OpenAI selected but no API key provided")
        elif cls.DEFAULT_LLM_PROVIDER == 'groq' and not cls.GROQ_API_KEY:
            warnings.append("Groq selected but no API key provided")
        elif cls.DEFAULT_LLM_PROVIDER == 'anthropic' and not cls.ANTHROPIC_API_KEY:
            warnings.append("Anthropic selected but no API key provided")
        
        return {
            "valid": len(errors) == 0,
            "errors": errors,
            "warnings": warnings
        }
    
    @classmethod
    def get_status(cls):
        """Get configuration status"""
        return {
            "openai_configured": bool(cls.OPENAI_API_KEY),
            "groq_configured": bool(cls.GROQ_API_KEY),
            "anthropic_configured": bool(cls.ANTHROPIC_API_KEY),
            "huggingface_configured": bool(cls.HUGGINGFACE_API_KEY),
            "default_provider": cls.DEFAULT_LLM_PROVIDER,
            "debug_mode": cls.DEBUG
        }


# Initialize and validate on import
config = Config()
validation = config.validate()

if validation["warnings"]:
    print("⚠️  Configuration Warnings:")
    for warning in validation["warnings"]:
        print(f"   - {warning}")

if validation["errors"]:
    print("❌ Configuration Errors:")
    for error in validation["errors"]:
        print(f"   - {error}")
