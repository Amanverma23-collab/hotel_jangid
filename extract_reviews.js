import fs from 'fs';

const html = fs.readFileSync('hotel_page.html', 'utf8');

// Search for any blocks containing reviews or author names
const matches = [];
const lines = html.split('\n');
console.log('Total lines:', lines.length);

// Look for Hindi or English review fragments in the HTML
const regex = /([A-Z][a-zA-Z\s]{2,25})[",\s]+([1-5]\s*star|\b5\/5\b|[1-5]\.0)?.*?(hotel|room|stay|clean|parking|ac|temple|service|gogamedi|staff|comfortable|best|experience)[^"<>]{20,250}/gi;

let m;
while ((m = regex.exec(html)) !== null) {
  matches.push(m[0]);
}

console.log('Regex matches:', matches.length);
matches.slice(0, 15).forEach((t, i) => console.log(`${i+1}: ${t.trim()}`));

// Also search for all occurrences of "star" or "review"
const starMatches = html.match(/.{0,50}(?:review|rating|stars?).{0,100}/gi) || [];
console.log('Star occurrences:', starMatches.length);
starMatches.slice(0, 10).forEach(s => console.log(' ->', s.trim()));
