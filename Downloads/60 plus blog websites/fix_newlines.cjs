const fs = require('fs');
const path = require('path');

const blogs = ['blog1', 'blog2', 'blog3', 'blog4', 'blog5'];

function fixLiteralNewlines(blogName) {
  const jsxPath = path.join(__dirname, blogName, 'src', 'components', 'BlogPage.jsx');
  if (fs.existsSync(jsxPath)) {
    let jsx = fs.readFileSync(jsxPath, 'utf8');
    
    // Replace literal '\n' string with actual newline
    jsx = jsx.replace(/\\n/g, '\n');
    
    fs.writeFileSync(jsxPath, jsx, 'utf8');
    console.log(`Fixed literal newlines in ${blogName}`);
  }
}

blogs.forEach(fixLiteralNewlines);
