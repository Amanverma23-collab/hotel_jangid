const fs = require('fs');
const html = fs.readFileSync('hotel_page.html', 'utf8');

// In Google Travel, review strings are often in UTF-8 escaped format or data arrays
// Let's search for any strings matching reviews
const lines = html.match(/\[\"[^\"]+\",\"[^\"]+\",\[[0-9]/g) || [];
console.log('Array matches:', lines.length);

// Look for mentions of "Gogamedi" or guest names
const names = [];
const nameRegex = /\[\"([A-Z\u0900-\u097F][a-zA-Z\u0900-\u097F\s]{2,30})\",null,\[\"https:\/\/lh3\.googleusercontent\.com/g;
let m;
while ((m = nameRegex.exec(html)) !== null) {
  names.push(m[1]);
}
console.log('Author names with Google avatars:', names);

// Search for any googleusercontent reviewer avatar photos
const avatarRegex = /https:\/\/lh3\.googleusercontent\.com\/a[^\"]+/g;
const avatars = html.match(avatarRegex) || [];
console.log('Avatars found:', avatars.length);
if (avatars.length) console.log(avatars.slice(0, 5));
