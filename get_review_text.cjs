const fs = require('fs');
const html = fs.readFileSync('hotel_page.html', 'utf8');

const target1 = 'ALV-UjXXaGDiUB-vs8hAiYwBbqr7nA_JaxYVEdI7YIlcYYB08Gsk1h-7Hg';
const target2 = 'ALV-UjXL_EVEeIjvjscuoHQvSZR-XjhtaWKH0tfvmldcYpsRmUtg9sv6';

[target1, target2].forEach((t, i) => {
  const idx = html.indexOf(t);
  console.log(`\n================ Target ${i+1} at index ${idx} ================`);
  if (idx !== -1) {
    const start = Math.max(0, idx - 400);
    const end = Math.min(html.length, idx + 800);
    console.log(html.substring(start, end));
  }
});
