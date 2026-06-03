const fs = require('fs');
const path = require('path');

const blogs = ['blog1', 'blog2', 'blog3', 'blog4', 'blog5'];

const hookContent = `import { useEffect } from 'react';

const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optional: Unobserve after revealing to only animate once
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    });

    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);
};

export default useScrollReveal;
`;

const cssContent = `

/* Smooth Scroll Reveal Animations */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
`;

function processBlog(blogName) {
  console.log(`Processing ${blogName}...`);
  
  const srcDir = path.join(__dirname, blogName, 'src');
  const hooksDir = path.join(srcDir, 'hooks');
  const compDir = path.join(srcDir, 'components');
  
  if (!fs.existsSync(srcDir)) return;
  
  // 1. Create hooks folder and useScrollReveal.js
  if (!fs.existsSync(hooksDir)) fs.mkdirSync(hooksDir, { recursive: true });
  fs.writeFileSync(path.join(hooksDir, 'useScrollReveal.js'), hookContent, 'utf8');
  
  // 2. Modify BlogPage.css
  const cssPath = path.join(compDir, 'BlogPage.css');
  if (fs.existsSync(cssPath)) {
    let css = fs.readFileSync(cssPath, 'utf8');
    if (!css.includes('.reveal.visible')) {
      fs.appendFileSync(cssPath, cssContent, 'utf8');
    }
  }

  // 3. Modify BlogPage.jsx
  const jsxPath = path.join(compDir, 'BlogPage.jsx');
  if (fs.existsSync(jsxPath)) {
    let jsx = fs.readFileSync(jsxPath, 'utf8');
    
    // Replace inline styles with class
    jsx = jsx.replace(/<div style={{ opacity: 1, transform: 'none' }}>/g, '<div className="reveal">');
    
    // Inject import
    if (!jsx.includes('useScrollReveal')) {
      jsx = jsx.replace(/import '\.\/BlogPage\.css';/, "import './BlogPage.css';\\nimport useScrollReveal from '../hooks/useScrollReveal';");
      
      // Inject hook call
      // Look for: const BlogPage = () => {  OR  export default function BlogPage
      jsx = jsx.replace(/const BlogPage = \(\) => \{\n/, "const BlogPage = () => {\\n  useScrollReveal();\\n");
    }
    
    fs.writeFileSync(jsxPath, jsx, 'utf8');
  }
}

blogs.forEach(processBlog);
console.log('Finished applying animations to all blogs!');
