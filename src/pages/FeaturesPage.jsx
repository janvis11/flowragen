import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, Code, Workflow, Database, Brain, Download, Play, Settings } from 'lucide-react';
import './FeaturesPage.css';

const FeaturesPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Workflow size={32} />,
      title: "Visual Workflow Builder",
      description: "Drag and drop nodes to create complex RAG pipelines. Connect document loaders, text splitters, embedders, vector stores, retrievers, and LLMs with intuitive visual connections.",
      color: "pink"
    },
    {
      icon: <Brain size={32} />,
      title: "Groq-Powered LLMs",
      description: "Lightning-fast inference with Groq's optimized hardware. Choose from Llama 3.1, Mixtral, and Gemma models. Sub-second response times for production workloads.",
      color: "orange"
    },
    {
      icon: <Code size={32} />,
      title: "Export Production Code",
      description: "Generate ready-to-deploy Python code with real implementations. Export your workflows as LangGraph pipelines with all configurations intact. No manual coding required.",
      color: "beige"
    },
    {
      icon: <Play size={32} />,
      title: "Real-Time Execution",
      description: "Execute workflows instantly and see results in a beautiful output panel. View execution traces, timing metrics, and LLM responses. Debug with step-by-step breakdowns.",
      color: "pink"
    },
    {
      icon: <Database size={32} />,
      title: "12 Pre-Built Nodes",
      description: "Document loaders, text splitters, embedders, vector stores (FAISS/Chroma), retrievers, rankers, summarizers, LLM nodes, prompt templates, and output visualizers.",
      color: "orange"
    },
    {
      icon: <Settings size={32} />,
      title: "Full Configuration Control",
      description: "Edit every parameter through an intuitive properties panel. Configure chunk sizes, embedding models, retrieval parameters, LLM settings, and more without touching code.",
      color: "beige"
    },
    {
      icon: <Zap size={32} />,
      title: "Save & Load Workflows",
      description: "Save your workflows locally and load them anytime. Access pre-built example workflows to get started quickly. Share workflows with your team as JSON files.",
      color: "pink"
    },
    {
      icon: <Download size={32} />,
      title: "One-Click Deployment",
      description: "Export workflows as standalone Python scripts. Includes all dependencies, configurations, and Groq API integration. Deploy to any Python environment instantly.",
      color: "orange"
    }
  ];

  return (
    <div className="features-page">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo" onClick={() => navigate('/')}>
              <img src="/flowragen-logo.svg" alt="Flowragen" style={{width: '32px', height: '32px'}} />
              <span>FLOWRAGEN</span>
            </div>
            <nav className="nav">
              <a href="/" className="nav-link">Home</a>
              <a href="/features" className="nav-link active">Features</a>
              <a href="/about" className="nav-link">About</a>
              <button className="nav-link nav-btn" onClick={() => navigate('/workflow')}>
                🚀 Launch Builder
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="features-hero">
        <div className="container">
          <div className="features-hero-content">
            <h1 className="features-hero-title">Powerful Features for Modern AI Development</h1>
            <p className="features-hero-description">
              Everything you need to build, test, and deploy production-ready RAG pipelines. 
              From visual workflow design to real-time execution and code export.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-grid-section">
        <div className="container">
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className={`feature-card ${feature.color}`}>
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3 className="feature-card-title">{feature.title}</h3>
                <p className="feature-card-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="features-cta">
        <div className="container">
          <div className="cta-box">
            <h2 className="cta-title">Ready to Build Your First RAG Pipeline?</h2>
            <p className="cta-description">
              Start creating AI workflows in minutes. No credit card required.
            </p>
            <button className="btn btn-primary btn-large" onClick={() => navigate('/workflow')}>
              Launch Workflow Builder
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <img src="/flowragen-logo.svg" alt="Flowragen" style={{width: '28px', height: '28px'}} />
                <span>FLOWRAGEN</span>
              </div>
              <p className="footer-tagline">Where AI Workflows Bloom</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Product</h4>
                <a href="/features">Features</a>
                <a href="/workflow">Workflow Builder</a>
                <a href="/about">About</a>
              </div>
              <div className="footer-column">
                <h4>Resources</h4>
                <a href="https://docs.groq.com" target="_blank" rel="noopener noreferrer">Groq Docs</a>
                <a href="https://python.langchain.com/docs/langgraph" target="_blank" rel="noopener noreferrer">LangGraph</a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
              </div>
              <div className="footer-column">
                <h4>Connect</h4>
                <a href="mailto:hello@flowragen.ai">Contact</a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                <a href="https://discord.com" target="_blank" rel="noopener noreferrer">Discord</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Flowragen. Built with 🌸 for AI developers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FeaturesPage;
