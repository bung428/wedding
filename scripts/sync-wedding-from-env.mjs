import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const envPath = path.join(root, '.env');
const outPath = path.join(root, 'public', 'wedding.json');

if (!fs.existsSync(envPath)) {
  console.error('.env 파일이 없습니다.');
  process.exit(1);
}

const env = fs.readFileSync(envPath, 'utf8');
const match = env.match(/^VITE_WEDDING_INFO=(.+)$/m);
if (!match) {
  console.error('.env 에 VITE_WEDDING_INFO 가 없습니다.');
  process.exit(1);
}

const parsed = JSON.parse(match[1].trim());
fs.writeFileSync(outPath, `${JSON.stringify(parsed, null, 2)}\n`, 'utf8');
console.log(`wrote ${outPath}`);
