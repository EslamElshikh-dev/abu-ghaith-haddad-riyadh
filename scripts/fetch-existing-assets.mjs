import { mkdir, access, writeFile, readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const root = process.cwd();
const outDir = join(root, 'public', 'images');
const b64Dir = join(root, 'assets-b64');
await mkdir(outDir, { recursive: true });

const embeddedAssets = [
  'abu-ghaith-hilux-service-vehicle-03.webp',
  'abu-ghaith-service-vehicle-sign-02.webp',
  'abu-ghaith-truck-equipment-01.webp'
];

for (const name of embeddedAssets) {
  const target = join(outDir, name);
  try { await access(target); continue; } catch {}
  const stem = name.replace(/\.webp$/i, '');
  const entries = (await readdir(b64Dir))
    .filter((entry) => entry.startsWith(`${stem}.part`) && entry.endsWith('.b64'))
    .sort((a, b) => Number(a.match(/\.part(\d+)/)?.[1] || 0) - Number(b.match(/\.part(\d+)/)?.[1] || 0));
  if (!entries.length) throw new Error(`Missing embedded image chunks for ${name}`);
  const parts = await Promise.all(entries.map((entry) => readFile(join(b64Dir, entry), 'utf8')));
  const bytes = Buffer.from(parts.join(''), 'base64');
  if (bytes.length < 1000) throw new Error(`Invalid embedded image: ${name}`);
  await writeFile(target, bytes);
  console.log(`decoded ${name}: ${bytes.length} bytes`);
}

const base = 'https://abu-ghaith-haddad-riyadh.vercel.app/images';
const remoteAssets = [
  'car-shade-riyadh.webp','metal-screens-riyadh.webp','sandwich-panel-riyadh.webp','double-car-shade-riyadh.webp',
  'iron-gate-riyadh.webp','garden-pergola-riyadh.webp','steel-fabrication-riyadh.webp','warehouse-hangar-riyadh.webp'
];

for (const name of remoteAssets) {
  const target = join(outDir, name);
  try { await access(target); continue; } catch {}
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(`${base}/${name}`, { headers: { 'user-agent': 'AbuGhaith-Vercel-Build/1.0' }, redirect: 'follow' });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      const bytes = Buffer.from(await response.arrayBuffer());
      if (bytes.length < 1000) throw new Error(`unexpectedly small file: ${bytes.length}`);
      await writeFile(target, bytes);
      lastError = undefined;
      console.log(`fetched ${name}: ${bytes.length} bytes`);
      break;
    } catch (error) {
      lastError = error;
      if (attempt < 3) await new Promise((resolve) => setTimeout(resolve, 1200 * attempt));
    }
  }
  if (lastError) throw lastError;
}
