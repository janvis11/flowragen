import { useNavigate } from 'react-router-dom';
import { ArrowRight, Target, Users, Zap, Heart } from 'lucide-react';
import './AboutPage.css';

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="about-page">
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
              <a href="/features" className="nav-link">Features</a>
              <a href="/about" className="nav-link active">About</a>
              <button className="nav-link nav-btn" onClick={() => navigate('/workflow')}>
                🚀 Launch Builder
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <h1 className="about-hero-title">Where AI Workflows Bloom 🌸</h1>
            <p className="about-hero-lead">
              Flowragen makes building RAG pipelines as natural and beautiful as arranging flowers. 
              We believe AI development should be visual, intuitive, and accessible to everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-mission">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-card">
              <div className="mission-icon">
                <Target size={40} />
              </div>
              <h3>Our Mission</h3>
              <p>
                To democratize RAG pipeline development by providing a visual, no-code platform that 
                empowers developers, researchers, and teams to build production-ready AI workflows without 
                the complexity of traditional coding.
              </p>
            </div>
            
            <div className="mission-card">
              <div className="mission-icon">
                <Zap size={40} />
              </div>
              <h3>Our Vision</h3>
              <p>
                A world where anyone can create sophisticated AI applications through intuitive visual 
                interfaces. Where the barrier between idea and implementation is measured in minutes, 
                not months.
              </p>
            </div>
            
            <div className="mission-card">
              <div className="mission-icon">
                <Heart size={40} />
              </div>
              <h3>Our Values</h3>
              <p>
                Simplicity without sacrificing power. Beauty in functionality. Open collaboration. 
                Fast iteration. Production-ready from day one. We build tools we'd want to use ourselves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-story">
        <div className="container">
          <div className="story-content">
            <h2 className="story-title">The Story Behind Flowragen</h2>
            <div className="story-text">
              <p>
                RAG (Retrieval-Augmented Generation) pipelines are powerful, but building them traditionally 
                requires juggling multiple libraries, writing boilerplate code, and spending hours debugging 
                connections between components.
              </p>
              <p>
                We asked ourselves: <strong>What if building a RAG pipeline could be as simple as connecting 
                blocks on a canvas?</strong>
              </p>
              <p>
                Flowragen was born from this question. We combined the visual simplicity of tools like 
                Node-RED with the power of LangGraph and the speed of Groq's inference engine. The result 
                is a platform where you can:
              </p>
              <ul>
                <li>🎨 <strong>Design</strong> workflows visually with drag-and-drop</li>
                <li>⚡ <strong>Execute</strong> pipelines in real-time with Groq</li>
                <li>📦 <strong>Export</strong> production-ready Python code</li>
                <li>🚀 <strong>Deploy</strong> anywhere Python runs</li>
              </ul>
              <p>
                From prototype to production in minutes, not weeks. That's the Flowragen promise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="about-tech">
        <div className="container">
          <h2 className="tech-title">Built with Modern Technology</h2>
          <div className="tech-grid">
            <div className="tech-item">
              <h4>Frontend</h4>
              <p>React 18, Vite, Lucide Icons</p>
            </div>
            <div className="tech-item">
              <h4>Backend</h4>
              <p>FastAPI, Python, Pydantic V2</p>
            </div>
            <div className="tech-item">
              <h4>AI Framework</h4>
              <p>LangGraph, LangChain</p>
            </div>
            <div className="tech-item">
              <h4>LLM Provider</h4>
              <p>Groq (Llama 3.1, Mixtral, Gemma)</p>
            </div>
            <div className="tech-item">
              <h4>Vector Stores</h4>
              <p>FAISS, Chroma, Pinecone</p>
            </div>
            <div className="tech-item">
              <h4>Deployment</h4>
              <p>Docker, Python, Any Cloud</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-team">
        <div className="container">
          <div className="team-content">
            <h2 className="team-title">Built by Developers, for Developers</h2>
            <p className="team-description">
              Flowragen is crafted by a team passionate about making AI development accessible. 
              We're developers, researchers, and designers who believe that powerful tools should 
              also be beautiful and easy to use.
            </p>
            <div className="team-cta">
              <p>Want to contribute or collaborate?</p>
              <a href="mailto:hello@flowragen.ai" className="btn btn-primary">
                Get in Touch
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <div className="cta-box">
            <h2 className="cta-title">Ready to Start Building?</h2>
            <p className="cta-description">
              Join developers who are building the future of AI with Flowragen.
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
            <p>&copy; 2025 Flowragen. Built with 🌸 for AI developers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
