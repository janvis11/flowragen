# RAGFlow – Visual Builder for LangGraph RAG Pipelines

![RAGFlow Banner](https://img.shields.io/badge/RAGFlow-Visual%20Builder-orange?style=for-the-badge)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 🚀 Overview

**RAGFlow** is a revolutionary visual workflow builder that lets users create, visualize, and execute LangGraph pipelines without writing code. It's like having a mini LangSmith or LangFuse at your fingertips – perfect for building resume-differentiating AI projects.

This landing page showcases the power and elegance of RAGFlow with a modern, interactive design inspired by cutting-edge SaaS platforms.

## ✨ Features

### 🎨 Modern Design
- **Bold Typography**: Eye-catching headlines with strong visual hierarchy
- **Vibrant Color Palette**: Pink, orange, and neutral tones for a fresh, energetic feel
- **Brutalist Elements**: Sharp borders, bold shadows, and geometric shapes
- **Smooth Animations**: Scroll-triggered animations and interactive hover effects

### 🧩 Key Sections

#### 1. **Hero Section**
- Dynamic marquee showcasing key features
- Compelling call-to-action button
- Professional imagery
- Responsive grid layout

#### 2. **About Section**
- Interactive workflow visualization card
- Animated profile rings
- Task completion indicators
- Engaging storytelling

#### 3. **Services Grid**
- Modular card layout
- Mixed content types (text, images, arrows)
- Hover effects and transitions
- Color-coded service categories

#### 4. **Workflow Visualization**
- Task board interface
- Real-time chat panel
- Team collaboration elements
- Interactive task management

#### 5. **Features List**
- Numbered feature cards
- Progressive color scheme
- Testimonial-style descriptions
- Smooth scroll animations

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Structure** | HTML5 | Semantic markup |
| **Styling** | CSS3 | Modern responsive design |
| **Interactivity** | Vanilla JavaScript | Dynamic behaviors |
| **Design System** | Custom CSS Variables | Consistent theming |

## 📁 Project Structure

```
RAGflow/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling
├── script.js           # Interactive functionality
└── README.md          # Documentation
```

## 🎯 Design Principles

### Visual Language
- **Brutalism**: Bold borders, high contrast, geometric shapes
- **Playfulness**: Rounded corners, vibrant colors, emoji icons
- **Clarity**: Clear hierarchy, ample whitespace, readable typography

### Color System
```css
--pink: #ffc8dd          /* Primary accent */
--light-pink: #ffebf3    /* Soft backgrounds */
--orange: #ff8c42        /* CTAs and highlights */
--deep-orange: #ff6b35   /* Emphasis */
--beige: #f5e6d3         /* Neutral warm */
--peach: #ffd4c4         /* Soft accent */
```

### Typography
- **Headings**: Space Grotesk (900 weight for impact)
- **Body**: System fonts for optimal performance
- **Scale**: Responsive sizing from 0.8rem to 4rem

## ⚡ Quick Start

> **👋 New here?** Read **[READ_ME_FIRST.md](READ_ME_FIRST.md)** for a quick overview!

### Current Status
- ✅ **Project is FULLY WORKING**
- ✅ Frontend works without any setup
- ⚠️ Backend needs API key for real LLM calls (optional)
- 📁 `.env` file location: `backend/.env`

### Get Started in 30 Seconds

```bash
# Start the frontend
python -m http.server 3000

# Open in browser
http://localhost:3000/workflow.html
```

**That's it!** The workflow builder is fully functional.

### Want Real LLM Responses? (Optional)

1. Get FREE Groq API key: https://console.groq.com/
2. Add to `backend/.env`
3. Start backend: `cd backend && python main.py`

See **[API_KEY_GUIDE.md](API_KEY_GUIDE.md)** for details.

---

## 🚀 Getting Started

### Frontend Setup

1. **Navigate to project directory**
```bash
cd RAGflow
```

2. **Start the frontend**
```bash
# Simply open index.html in your browser
# Or use a local server:
python -m http.server 3000
# Then visit: http://localhost:3000
```

3. **Access the Workflow Builder**
```
http://localhost:3000/workflow.html
```

### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Create virtual environment**
```bash
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Set up environment variables**
Create a `.env` file:
```env
OPENAI_API_KEY=your_key_here
```

5. **Run the backend**
```bash
python main.py
```

Backend API: `http://localhost:8000`
API Docs: `http://localhost:8000/docs`

### Customization

#### Change Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --pink: #your-color;
    --orange: #your-color;
}
```

#### Modify Content
Update text in `index.html`:
```html
<h1 class="hero-title">Your Custom Title</h1>
```

#### Add Interactions
Extend `script.js`:
```javascript
// Add your custom JavaScript
document.querySelector('.your-element').addEventListener('click', () => {
    // Your code here
});
```

## 🎨 Design Inspiration

This landing page draws inspiration from:
- **Modern SaaS platforms**: Clean, professional aesthetics
- **Brutalist web design**: Bold, unapologetic visual elements
- **Task management tools**: Intuitive workflow representations
- **Collaborative platforms**: Team-centric design patterns

## 📱 Responsive Design

The site is fully responsive with breakpoints at:
- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px

## ⚡ Performance Features

- **Vanilla JavaScript**: No framework overhead
- **CSS Animations**: Hardware-accelerated transforms
- **Lazy Loading**: Intersection Observer for scroll animations
- **Optimized Images**: External CDN for fast loading

## 🧪 Interactive Elements

### Animations
- Scroll-triggered fade-ins
- Hover transformations
- Ripple button effects
- Marquee text scrolling
- Parallax hero image

### User Interactions
- Smooth scroll navigation
- Interactive task board
- Live chat input
- Tab switching
- Search filtering

## 🎓 Learning Outcomes

Building this landing page teaches:
- **Modern CSS**: Grid, Flexbox, Custom Properties
- **JavaScript DOM**: Event handling, animations
- **Design Systems**: Consistent theming and components
- **Responsive Design**: Mobile-first approach
- **User Experience**: Interactive feedback and micro-interactions

## 🔮 Future Enhancements

Potential additions:
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Advanced animations with GSAP
- [ ] Backend integration
- [ ] Form validation
- [ ] Analytics integration

## 📊 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## 🤝 Contributing

This is a showcase project, but feel free to:
1. Fork the repository
2. Create your feature branch
3. Make your improvements
4. Share your version!

## 📄 License

This project is open source and available for educational purposes.

## 🌟 About RAGFlow

RAGFlow represents the future of AI workflow orchestration:

### Core Concept
A drag-and-drop interface for building LangGraph pipelines:
- 📄 Document Loader
- 🧠 Retriever
- ✍️ Summarizer
- 🧩 Ranker
- 💬 LLM Answerer
- 📊 Output Visualizer

### Architecture
```
Frontend (React) → FastAPI Backend → LangGraph Core
```

### Why It Matters
- **Resume Differentiator**: Shows advanced AI engineering skills
- **Practical Application**: Real-world RAG implementation
- **Visual Innovation**: No-code AI orchestration
- **Industry Relevant**: Mirrors tools like LangSmith/LangFuse

## 📞 Contact

For questions or feedback about this landing page design:
- Create an issue in the repository
- Share your customizations
- Contribute improvements

---

**Built with ❤️ for the AI Engineering Community**

*Showcasing the power of modern web design for cutting-edge AI tools*
