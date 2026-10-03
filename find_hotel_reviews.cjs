const fs = require('fs');
const html = fs.readFileSync('hotel_page.html', 'utf8');

// Find ratings
const ratingMatch = html.match(/([0-9]\.[0-9])\s*(?:stars?|\([0-9,]+\))/gi);
console.log('Rating matches:', ratingMatch);

// Look for data chunks containing review text
// Google Hotel pages store reviews in JS data arrays
const chunks = html.split(/\[\"/);
const potentialReviews = [];

for (const chunk of chunks) {
  const text = chunk.split('\"')[0];
  if (
    text.length > 30 &&
    text.length < 500 &&
    !text.includes('http') &&
    !text.includes('window') &&
    !text.includes('function') &&
    !text.includes('google') &&
    !text.includes('/') &&
    !text.includes('\\')
  ) {
    if (
      /room|stay|service|ac|parking|hotel|temple|mandir|clean|good|best|badiya|bahut|gogamedi|staff|family|peaceful/i.test(text)
    ) {
      potentialReviews.push(text);
    }
  }
}

console.log('Potential reviews count:', potentialReviews.length);
potentialReviews.slice(0, 25).forEach((p, i) => {
  console.log(`${i + 1}: ${p}`);
});
