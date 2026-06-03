const fs = require('fs');
const path = require('path');

const sourceBlog = 'blog4';
const targetBlogs = ['blog1', 'blog2', 'blog3'];

const sourceFooterJsx = path.join(__dirname, sourceBlog, 'src', 'components', 'Footer.jsx');
const sourceFooterCss = path.join(__dirname, sourceBlog, 'src', 'components', 'Footer.css');

const footerJsxContent = fs.readFileSync(sourceFooterJsx, 'utf8');
const footerCssContent = fs.readFileSync(sourceFooterCss, 'utf8');

targetBlogs.forEach(blog => {
  const targetFooterJsx = path.join(__dirname, blog, 'src', 'components', 'Footer.jsx');
  const targetFooterCss = path.join(__dirname, blog, 'src', 'components', 'Footer.css');
  
  if (fs.existsSync(targetFooterJsx)) {
    fs.writeFileSync(targetFooterJsx, footerJsxContent, 'utf8');
    console.log(`Copied Footer.jsx to ${blog}`);
  }
  
  if (fs.existsSync(targetFooterCss)) {
    fs.writeFileSync(targetFooterCss, footerCssContent, 'utf8');
    console.log(`Copied Footer.css to ${blog}`);
  }
});

console.log('Sync complete.');
