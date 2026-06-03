const fs = require('fs');
const path = require('path');
const https = require('https');

const blogs = ['blog1', 'blog2', 'blog3', 'blog4'];
const logos = [
  { name: '60_plus_india.png', url: 'https://www.60plusindia.com/logo/60_plus_india.png' },
  { name: 'ITEL_LOGO.png', url: 'https://www.60plusindia.com/logo/ITEL_LOGO.png' }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  for (const blog of blogs) {
    const pubDir = path.join(__dirname, blog, 'public');
    const logoDir = path.join(pubDir, 'logo');
    
    // Create public and logo directories if they don't exist
    if (!fs.existsSync(pubDir)) {
      fs.mkdirSync(pubDir, { recursive: true });
    }
    if (!fs.existsSync(logoDir)) {
      fs.mkdirSync(logoDir, { recursive: true });
    }
    
    // Download images
    for (const logo of logos) {
      const destPath = path.join(logoDir, logo.name);
      console.log(`Downloading ${logo.name} to ${blog}...`);
      try {
        await downloadFile(logo.url, destPath);
        console.log(`Successfully downloaded ${logo.name} to ${blog}`);
      } catch (e) {
        console.error(`Failed to download ${logo.name}`, e);
      }
    }
  }
}

main();
