const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.60plusindia.com/blogs/how-old-age-affects-seniors', { waitUntil: 'networkidle2' });
  
  // Get the HTML content
  const html = await page.content();
  fs.writeFileSync('rendered_page.html', html);
  
  await browser.close();
  console.log('Successfully saved rendered HTML');
})();
