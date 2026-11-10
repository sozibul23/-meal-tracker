const https = require('https');

function fetchCsv(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function parseCSVLine(line) {
  const result = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      result.push(cur.trim());
      cur = '';
    } else {
      cur += c;
    }
  }
  result.push(cur.trim());
  return result;
}

async function run() {
  const url = 'https://docs.google.com/spreadsheets/d/1rlkL3wpu6SiLj9OCN5p-dG_uvZh1LlQiuPJYYatGlf8/gviz/tq?tqx=out:csv&gid=1375124951';
  const csvText = await fetchCsv(url);
  const lines = csvText.split('\n').filter(l => l.trim().length > 0);
  console.log(`Fetched ${lines.length} lines from October sheet`);
  
  const parsedRows = lines.map(parseCSVLine);
  parsedRows.forEach((r, i) => {
    console.log(`Row ${i}: [0]=${r[0]} | [1]=${r[1]} | [2]=${r[2]} | [4]=${r[4]} | [5]=${r[5]} | [6]=${r[6]} | [7]=${r[7]} | [8]=${r[8]} | [10]=${r[10]} | [12]=${r[12]}`);
  });
}
run();
