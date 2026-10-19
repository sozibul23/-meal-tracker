// Generates minimal valid PNG icons for PWA
const fs = require('fs');
const zlib = require('zlib');

function createPNG(size, text) {
  // SVG alternative or simple colored buffer
  // We can write an SVG icon as well
}

// Write SVG icons
const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" rx="128" fill="#0f172a"/>
  <rect x="32" y="32" width="448" height="448" rx="96" fill="#1e293b"/>
  <path d="M160 180 h192 v120 a96 96 0 0 1 -192 0 Z" fill="#10b981"/>
  <rect x="236" y="320" width="40" height="60" fill="#10b981"/>
  <rect x="190" y="380" width="132" height="24" rx="12" fill="#10b981"/>
  <path d="M190 140 Q 200 110 190 80" stroke="#f59e0b" stroke-width="14" fill="none" stroke-linecap="round"/>
  <path d="M256 140 Q 266 110 256 80" stroke="#f59e0b" stroke-width="14" fill="none" stroke-linecap="round"/>
  <path d="M322 140 Q 332 110 322 80" stroke="#f59e0b" stroke-width="14" fill="none" stroke-linecap="round"/>
  <text x="256" y="460" font-family="sans-serif" font-size="44" font-weight="bold" fill="#ffffff" text-anchor="middle">MEAL TRACKER</text>
</svg>`;

fs.writeFileSync('icon.svg', svgIcon);

// Minimal 1x1 base64 transparent/colored PNG stretched
const base64Png = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkWPjfDwAEeQHzc1pZ0QAAAABJRU5ErkJggg==';
const buf = Buffer.from(base64Png, 'base64');
fs.writeFileSync('icon-192.png', buf);
fs.writeFileSync('icon-512.png', buf);
console.log('Icons generated successfully.');
