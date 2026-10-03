const fs = require('fs');

try {
  const content = fs.readFileSync('C:/Users/DELL/.gemini/antigravity-ide/brain/da0f3090-ea2c-45e2-b0b3-828f5f620a2a/.system_generated/steps/243/content.md', 'utf8');

  // Let's search for Jangid or reviews or quotes
  const jangidIndex = content.indexOf('Jangid');
  console.log('Jangid index:', jangidIndex);
  
  // Look for text fragments that look like reviews
  const reviewRegex = /"([^"\\]*(?:\\.[^"\\]*)*)"/g;
  let match;
  const quotes = [];
  while ((match = reviewRegex.exec(content)) !== null) {
    if (match[1].length > 40 && match[1].length < 350 && !match[1].includes('/') && !match[1].includes('http') && !match[1].includes('function')) {
      quotes.push(match[1]);
    }
  }
  console.log('Quotes found:', quotes.length);
  console.log(quotes.slice(0, 10));
} catch (e) {
  console.error(e.message);
}
