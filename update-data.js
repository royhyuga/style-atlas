import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function extractMetadata(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/<!--([\s\S]*?)-->/);
  if (!match) return null;

  const raw = match[1];
  const metadata = {};
  raw.split('\n').forEach(line => {
    const [key, ...rest] = line.trim().split(':');
    if (key && rest.length) {
      metadata[key.trim()] = rest.join(':').trim();
    }
  });

  return metadata;
}

function processFolder(folderPath, type) {
  const entries = [];
  const dir = path.join(__dirname, folderPath);
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

  for (const file of files) {
    const metadata = extractMetadata(path.join(dir, file));
    if (metadata && metadata.title && metadata.summary && metadata.link) {
      entries.push({
        title: metadata.title,
        summary: metadata.summary,
        img: metadata.img || '/images/default.jpg',
        link: metadata.link,
        date: metadata.date || new Date().toISOString().split('T')[0]
      });
    }
  }

  const outputFile = type === 'articles' ? 'articles.json' : 'news.json';
  fs.writeFileSync(path.join(__dirname, outputFile), JSON.stringify(entries, null, 2));
  return entries;
}

function generateSitemap(entries) {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    entries.map(entry => (
      `<url><loc>https://styleatlas.net/${entry.link}</loc><lastmod>${entry.date}</lastmod></url>`
    )).join('\n') +
    `\n</urlset>`;

  fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemap);
}

const articles = processFolder('articles', 'articles');
const news = processFolder('news', 'news');
generateSitemap([...articles, ...news]);

console.log("✅ articles.json, news.json, and sitemap.xml updated.");
