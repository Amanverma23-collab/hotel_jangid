const fs = require('fs');
const html = fs.readFileSync('hotel_page.html', 'utf8');

const rRegex = /class="CQYfx xfFECd">([^<]+)<\/span><span class="eoY5cb">&quot;([^<]+)&quot;<\/span>/g;
let m;
const reviews = [];
while ((m = rRegex.exec(html)) !== null) {
  reviews.push({ author: m[1], quote: m[2] });
}
console.log('Total extracted reviews:', reviews);

// Check if there are other review texts
const summary = html.match(/Guests mention this hotel offers[^.]+\./);
if (summary) console.log('Google Review Summary:', summary[0]);
