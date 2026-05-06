// Simple build script to inject Vercel Analytics into index.html
const fs = require('fs');
const path = require('path');

// Read the original index.html
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// Vercel Analytics script injection
const analyticsScript = `
  <!-- Vercel Web Analytics -->
  <script>
    window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
  </script>
  <script defer src="/_vercel/insights/script.js"></script>
`;

// Inject before closing </body> tag
if (!html.includes('/_vercel/insights/script.js')) {
  html = html.replace('</body>', `${analyticsScript}\n</body>`);
  fs.writeFileSync(indexPath, html, 'utf-8');
  console.log('✅ Vercel Analytics injected successfully into index.html');
} else {
  console.log('ℹ️  Vercel Analytics already present in index.html');
}
