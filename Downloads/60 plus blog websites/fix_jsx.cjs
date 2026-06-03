const fs = require('fs');
const path = require('path');

const blogs = ['blog1', 'blog2', 'blog3', 'blog4'];

function walkAndRename(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkAndRename(fullPath);
    } else if (fullPath.endsWith('.js')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      // If it contains jsx syntax (like <something /> or </something>)
      if (content.includes('/>') || content.includes('</') || content.includes('React')) {
        const newPath = fullPath.replace(/\.js$/, '.jsx');
        fs.renameSync(fullPath, newPath);
        console.log(`Renamed ${file} to ${path.basename(newPath)}`);
      }
    }
  }
}

blogs.forEach(blog => {
  const blogDir = path.join(__dirname, blog);
  const srcDir = path.join(blogDir, 'src');
  console.log(`Fixing JSX in ${blog}...`);
  walkAndRename(srcDir);
  
  // Fix index.html script tag
  const rootHtml = path.join(blogDir, 'index.html');
  if (fs.existsSync(rootHtml)) {
    let htmlContent = fs.readFileSync(rootHtml, 'utf8');
    if (htmlContent.includes('/src/index.js')) {
      // Check if index.jsx actually exists now
      if (fs.existsSync(path.join(srcDir, 'index.jsx'))) {
        htmlContent = htmlContent.replace('/src/index.js', '/src/index.jsx');
        fs.writeFileSync(rootHtml, htmlContent, 'utf8');
        console.log(`Updated index.html to point to index.jsx in ${blog}`);
      }
    }
  }
});
