const fs = require('fs');
const path = require('path');

const blogs = ['blog1', 'blog2', 'blog3', 'blog4'];

blogs.forEach(blog => {
  console.log(`Migrating ${blog}...`);
  const blogDir = path.join(__dirname, blog);
  
  if (!fs.existsSync(blogDir)) {
    console.log(`- ${blog} not found, skipping.`);
    return;
  }

  // 1. Move and update index.html
  const publicHtml = path.join(blogDir, 'public', 'index.html');
  const rootHtml = path.join(blogDir, 'index.html');
  
  if (fs.existsSync(publicHtml)) {
    let htmlContent = fs.readFileSync(publicHtml, 'utf8');
    htmlContent = htmlContent.replace(/%PUBLIC_URL%\//g, '');
    htmlContent = htmlContent.replace(/%PUBLIC_URL%/g, '');
    
    if (!htmlContent.includes('<script type="module" src="/src/index.js"></script>')) {
      htmlContent = htmlContent.replace(
        '</body>',
        '  <script type="module" src="/src/index.js"></script>\n  </body>'
      );
    }
    
    fs.writeFileSync(rootHtml, htmlContent, 'utf8');
    fs.unlinkSync(publicHtml);
    console.log(`- Moved and updated index.html`);
  } else if (fs.existsSync(rootHtml)) {
    console.log(`- root index.html already exists.`);
  }

  // 2. Update package.json
  const pkgPath = path.join(blogDir, 'package.json');
  if (fs.existsSync(pkgPath)) {
    let pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    
    // Remove react-scripts
    if (pkg.dependencies && pkg.dependencies['react-scripts']) {
      delete pkg.dependencies['react-scripts'];
    }
    if (pkg.devDependencies && pkg.devDependencies['react-scripts']) {
      delete pkg.devDependencies['react-scripts'];
    }
    
    // Add vite and plugin
    pkg.devDependencies = pkg.devDependencies || {};
    pkg.devDependencies['vite'] = '^5.0.0';
    pkg.devDependencies['@vitejs/plugin-react'] = '^4.2.0';
    
    // Update scripts
    pkg.scripts = pkg.scripts || {};
    pkg.scripts.start = 'vite';
    pkg.scripts.dev = 'vite';
    pkg.scripts.build = 'vite build';
    pkg.scripts.serve = 'vite preview';
    // Remove eject
    if (pkg.scripts.eject) delete pkg.scripts.eject;
    
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf8');
    console.log(`- Updated package.json`);
  }

  // 3. Create vite.config.js
  const viteConfigPath = path.join(blogDir, 'vite.config.js');
  if (!fs.existsSync(viteConfigPath)) {
    const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
`;
    fs.writeFileSync(viteConfigPath, viteConfig, 'utf8');
    console.log(`- Created vite.config.js`);
  }
  
  console.log(`Finished ${blog}.\n`);
});
