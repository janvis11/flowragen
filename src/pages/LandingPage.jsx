import { useNavigate } from 'react-router-dom';
import { ArrowRight, Circle } from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <img src="/flowragen-logo.svg" alt="Flowragen" style={{width: '32px', height: '32px'}} />
              <span>FLOWRAGEN</span>
            </div>
            <nav className="nav">
              <a href="#home" className="nav-link active">Home</a>
              <a href="features" className="nav-link">Features</a>
              <a href="about" className="nav-link">About</a>
              <button className="nav-link nav-btn" onClick={() => navigate('/workflow')}>
                🚀 Launch Builder
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-title-box">
            <h1 className="hero-title">FLOWRAGEN.</h1>
            <p className="hero-subtitle">Ultimate RAG workflow builder.</p>
          </div>
          
          <div className="hero-content">
            <div className="marquee-container">
              <div className="marquee">
                <div className="marquee-content">
                  <span className="marquee-text">Visual RAG Pipeline Builder</span>
                  <span className="marquee-arrow">◆</span>
                  <span className="marquee-text">Drag, Drop, Deploy • No Code Required</span>
                  <span className="marquee-arrow">◆</span>
                  <span className="marquee-text">From Concept to Production in Minutes</span>
                  <span className="marquee-arrow">◆</span>
                </div>
              </div>
            </div>
            
            <button className="btn btn-primary btn-large" onClick={() => navigate('/workflow')}>
              Start Building
              <ArrowRight size={20} />
            </button>
          </div>

          <div className="hero-image">
            <div className="hero-image-placeholder">
              <div className="placeholder-text">Team Collaboration</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section section">
        <div className="container">
          <div className="section-header">
            <h3 className="section-subtitle">Learn More About Our Journey and Team</h3>
          </div>
          
          <div className="about-content">
            <div className="about-visual">
              <div className="workflow-diagram">
                <div className="diagram-badge">Done!</div>
                <div className="diagram-center">
                  <div className="diagram-avatar main-avatar">
                    <div className="avatar-placeholder"></div>
                  </div>
                  <div className="diagram-timer">2 hr</div>
                  <div className="diagram-icon top-left">↗</div>
                  <div className="diagram-icon bottom-left">✓</div>
                  <div className="diagram-icon bottom-right">+</div>
                </div>
                <div className="diagram-checklist">
                  <div className="checklist-item">○</div>
                  <div className="checklist-item">○</div>
                  <div className="checklist-item">○</div>
                </div>
                <div className="diagram-avatar small-avatar">
                  <div className="avatar-placeholder small"></div>
                </div>
                <div className="diagram-avatar bottom-avatar">
                  <div className="avatar-placeholder small"></div>
                </div>
                <div className="diagram-footer">
                  <span className="footer-badge">Done!</span>
                  <span className="footer-item">New Item</span>
                  <span className="footer-arrow">→</span>
                  <span className="footer-timer">2 hr</span>
                  <span className="footer-badge urgent">Urgent</span>
                </div>
              </div>
            </div>
            
            <div className="about-text-box">
              <h2 className="about-title">Where AI Workflows Bloom</h2>
              <p className="about-description">
                Flowragen is the visual workflow builder that makes RAG pipeline development as natural as arranging flowers. 
                Connect document loaders, embedders, retrievers, and LLMs with intuitive drag-and-drop. Watch your AI workflows 
                come to life with real-time execution powered by Groq's lightning-fast inference. Export production-ready Python code 
                or deploy directly. Perfect for AI engineers, researchers, and teams who want to move from prototype to production 
                without the complexity.
              </p>
              <button className="btn btn-primary" onClick={() => navigate('/workflow')}>
                Try It Now
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="workflow-section section">
        <div className="container">
          <h2 className="section-title">Streamline Your Workflow Effortlessly</h2>
          
          <div className="workflow-content">
            <div className="workflow-left">
              <div className="workflow-image-box">
                <div className="workflow-img-placeholder">Team Meeting</div>
              </div>
              
              <div className="workflow-description-box">
                <p className="workflow-description">
                  A comprehensive overview of your tasks, deadlines, and priorities, 
                  all in one place.
                </p>
              </div>
              
              <button className="btn btn-secondary btn-icon">
                <Circle size={16} fill="black" />
                <ArrowRight size={20} />
              </button>
            </div>
            
            <div className="workflow-center">
              <div className="workflow-app-preview">
                <div className="app-preview-placeholder">
                  <div className="preview-header">
                    <div className="preview-tabs">
                      <span>List</span>
                      <span>Icons</span>
                      <span>Timeline</span>
                    </div>
                  </div>
                  <div className="preview-content">
                    <div className="preview-task">Accomplished</div>
                    <div className="preview-task">Site Wireframe Design</div>
                    <div className="preview-task">Marketing Road Map</div>
                    <div className="preview-task">Marketing Campaign</div>
                    <div className="preview-task">Work in Progress</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="workflow-right">
              <div className="chat-preview">
                <div className="chat-message">
                  <div className="chat-avatar"></div>
                  <div className="chat-text">
                    <strong>John Klein</strong>
                    <p>I'm excited to see...</p>
                  </div>
                </div>
                <div className="chat-message">
                  <div className="chat-avatar"></div>
                  <div className="chat-text">
                    <strong>Sia Afflous</strong>
                    <p>Just finished going through...</p>
                  </div>
                </div>
                <div className="chat-message">
                  <div className="chat-avatar"></div>
                  <div className="chat-text">
                    <strong>John Doe</strong>
                    <p>New Tasks</p>
                  </div>
                </div>
                <div className="chat-input">
                  <input type="text" placeholder="Add Comment" />
                  <button className="send-btn">Send</button>
                </div>
              </div>
              
              <div className="workflow-image-box small">
                <div className="workflow-img-placeholder small">Discussion</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section section">
        <div className="container">
          <h2 className="section-title">Key Features</h2>
          
          <div className="services-grid">
            <div className="service-card pink">
              <div className="service-badge">▶ Feature 01</div>
              <h3 className="service-title">12 Pre-Built RAG Nodes</h3>
              <p className="service-description">
                Document loaders, text splitters, embedders, vector stores, retrievers, rankers, 
                LLM nodes, and output visualizers. Everything you need to build production-ready 
                RAG pipelines with drag-and-drop simplicity.
              </p>
            </div>
            
            <div className="service-arrow">
              <div className="arrow-box">
                <div className="arrow-icon">↓</div>
              </div>
            </div>
            
            <div className="service-card white">
              <h3 className="service-title">Real-Time Execution & Export</h3>
              <p className="service-description">
                Execute your RAG workflows instantly with our FastAPI backend. 
                See results in real-time, debug with execution traces, and export 
                your workflows as production-ready Python code powered by LangGraph.
              </p>
              <div className="service-badge bottom">▶ Feature 02</div>
            </div>
            
            <div className="service-image">
              <div className="service-img-placeholder">Team Collaboration</div>
            </div>
            
            <div className="service-arrow small">
              <div className="arrow-box small">
                <div className="arrow-icon">◆</div>
              </div>
            </div>
            
            <div className="service-card orange">
              <h3 className="service-title">Visual Node Configuration</h3>
              <p className="service-description">
                Configure every aspect of your RAG pipeline through an intuitive properties panel. 
                Set chunk sizes, embedding models, retrieval parameters, LLM settings, and more - 
                all without touching code.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section section">
        <div className="container">
          <div className="features-list">
            <div className="feature-item beige">
              <div className="feature-badge">
                <Circle size={12} fill="white" />
                <span>01</span>
              </div>
              <div className="feature-content">
                <h3 className="feature-title">Drag & Drop Interface</h3>
                <p className="feature-description">
                  Build complex RAG pipelines by simply dragging nodes onto the canvas. Connect document loaders 
                  to text splitters, embedders to vector stores, and retrievers to LLMs - all with visual connections 
                  that make your data flow crystal clear.
                </p>
              </div>
            </div>
            
            <div className="feature-item peach">
              <div className="feature-badge">
                <Circle size={12} fill="white" />
                <span>02</span>
              </div>
              <div className="feature-content">
                <h3 className="feature-title">LangGraph Integration</h3>
                <p className="feature-description">
                  Powered by LangGraph, the industry-standard framework for building stateful AI applications. 
                  Your workflows are automatically converted to production-ready Python code that you can deploy anywhere.
                </p>
              </div>
            </div>
            
            <div className="feature-item orange-light">
              <div className="feature-badge">
                <Circle size={12} fill="white" />
                <span>03</span>
              </div>
              <div className="feature-content">
                <h3 className="feature-title">Multiple LLM Providers</h3>
                <p className="feature-description">
                  Support for OpenAI, Anthropic, Groq, and Hugging Face models. Switch between providers with a single click. 
                  Configure temperature, max tokens, and system prompts through the intuitive properties panel.
                </p>
              </div>
            </div>
            
            <div className="feature-item orange-dark">
              <div className="feature-badge">
                <Circle size={12} fill="white" />
                <span>04</span>
              </div>
              <div className="feature-content">
                <h3 className="feature-title">Save, Load & Export</h3>
                <p className="feature-description">
                  Save your workflows locally, load pre-built examples, and export as executable Python code. 
                  Perfect for rapid prototyping, team collaboration, and moving from development to production seamlessly.
                </p>
              </div>
            </div>
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

export default LandingPage;
