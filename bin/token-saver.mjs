#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const packageJson = JSON.parse(await readFile(join(packageRoot, 'package.json'), 'utf8'));
const PACKAGE = packageJson.name;
const VERSION = packageJson.version;
const DEFAULT_DEST = join(homedir(), 'token-saver');
const MARKER = '.token-saver-install.json';
const INIT = 'Read ~/token-saver/AGENT.md and initialize this project. Then continue to follow it for this session.';
const PAYLOAD = [
  'AGENT.md', 'README.md', 'CONTRIBUTING.md', 'CHANGELOG.md', 'INIT_PROMPT.txt',
  'OPTIONAL_PROJECT_STUB.md', 'THIRD_PARTY.md', 'LICENSE', 'package.json', 'skills'
];

function die(message, code = 1) {
  console.error(`Token Saver: ${message}`);
  process.exit(code);
}

function parseOptions(args) {
  const opts = { force: false, dest: DEFAULT_DEST };
  const rest = [];
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--force') opts.force = true;
    else if (arg === '--dir') {
      if (!args[i + 1]) die('--dir requires a path');
      opts.dest = resolve(args[++i].replace(/^~(?=$|\/)/, homedir()));
    } else if (arg.startsWith('--dir=')) {
      opts.dest = resolve(arg.slice(6).replace(/^~(?=$|\/)/, homedir()));
    } else rest.push(arg);
  }
  return { opts, rest };
}

async function hashFile(path) {
  const data = await readFile(path);
  return createHash('sha256').update(data).digest('hex');
}

async function collectFiles(root, entries = PAYLOAD) {
  const files = new Map();
  async function walk(abs, rel) {
    const s = await stat(abs);
    if (s.isDirectory()) {
      for (const name of await readdir(abs)) await walk(join(abs, name), join(rel, name));
    } else if (s.isFile()) files.set(rel.replaceAll('\\', '/'), await hashFile(abs));
  }
  for (const entry of entries) {
    const abs = join(root, entry);
    if (existsSync(abs)) await walk(abs, entry);
  }
  return files;
}

async function readMarker(dest) {
  try { return JSON.parse(await readFile(join(dest, MARKER), 'utf8')); }
  catch { return null; }
}

async function localChanges(dest, marker) {
  const changed = [];
  for (const [rel, expected] of Object.entries(marker?.files ?? {})) {
    const abs = join(dest, rel);
    if (!existsSync(abs)) { changed.push(`${rel} (missing)`); continue; }
    if ((await hashFile(abs)) !== expected) changed.push(rel);
  }
  return changed;
}

function detectSource() {
  const ua = process.env.npm_config_user_agent ?? '';
  if (ua.startsWith('bun/')) return 'bun';
  if (ua.startsWith('pnpm/')) return 'pnpm';
  if (ua.startsWith('yarn/')) return 'yarn';
  return 'npm';
}

async function copyPayload(dest, source) {
  await mkdir(dest, { recursive: true });
  for (const entry of PAYLOAD) {
    const from = join(packageRoot, entry);
    if (existsSync(from)) await cp(from, join(dest, entry), { recursive: true, force: true });
  }
  const files = Object.fromEntries(await collectFiles(dest));
  const marker = {
    schema: 1,
    name: 'token-saver',
    version: VERSION,
    source,
    installedAt: new Date().toISOString(),
    files
  };
  await writeFile(join(dest, MARKER), `${JSON.stringify(marker, null, 2)}\n`);
}

async function removeObsoleteManagedFiles(dest, oldMarker, newFiles) {
  for (const rel of Object.keys(oldMarker?.files ?? {})) {
    if (!newFiles.has(rel)) await rm(join(dest, rel), { force: true });
  }
}

async function applyInstall(mode, opts, source = detectSource()) {
  const dest = opts.dest;
  const exists = existsSync(dest);
  if (exists && existsSync(join(dest, '.git'))) {
    die(`${dest} is a Git checkout. Keep using its version-control workflow (for example, git pull); Token Saver will not overwrite it.`);
  }

  const marker = exists ? await readMarker(dest) : null;
  if (exists && !marker && !opts.force) {
    die(`${dest} already exists but is not a managed Token Saver installation. Nothing was overwritten. Use --force only after reviewing that directory.`);
  }
  if (mode === 'install' && marker && !opts.force) {
    console.log(`Token Saver ${marker.version ?? 'unknown'} is already installed at ${dest}.`);
    console.log(`Use: npx ${PACKAGE}@latest update`);
    return;
  }

  if (marker && !opts.force) {
    const changed = await localChanges(dest, marker);
    if (changed.length) {
      console.error('Token Saver found local changes and will not overwrite them:');
      for (const rel of changed.slice(0, 20)) console.error(`  - ${rel}`);
      if (changed.length > 20) console.error(`  ... and ${changed.length - 20} more`);
      die('Review the changes, or rerun with --force if you intentionally want the packaged files restored.');
    }
  }

  const sourceFiles = await collectFiles(packageRoot);
  if (marker) await removeObsoleteManagedFiles(dest, marker, sourceFiles);
  await copyPayload(dest, source);
  console.log(`${mode === 'update' ? 'Updated' : 'Installed'} Token Saver ${VERSION} → ${dest}`);
  console.log('\nStart an AI agent with:\n');
  console.log(INIT);
}

async function latestPublishedVersion() {
  const response = await fetch(`https://registry.npmjs.org/${encodeURIComponent(PACKAGE)}/latest`, {
    headers: { accept: 'application/json' }
  });
  if (!response.ok) throw new Error(`npm registry returned HTTP ${response.status}`);
  return (await response.json()).version;
}

function runLatestUpdate(opts) {
  const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  const args = ['--yes', `${PACKAGE}@latest`, '_apply-update', '--dir', opts.dest];
  if (opts.force) args.push('--force');
  const result = spawnSync(npx, args, { stdio: 'inherit' });
  if (result.error) die(`could not launch npx (${result.error.message}). Run: npx ${PACKAGE}@latest update`);
  process.exit(result.status ?? 1);
}

async function update(opts, skipLatestCheck = false) {
  if (!skipLatestCheck) {
    try {
      const latest = await latestPublishedVersion();
      if (latest !== VERSION) return runLatestUpdate(opts);
    } catch (error) {
      die(`could not check the latest published version: ${error.message}`);
    }
  }
  await applyInstall('update', opts);
}

async function doctor(opts) {
  const dest = opts.dest;
  console.log(`CLI package: ${PACKAGE} ${VERSION}`);
  console.log(`Install path: ${dest}`);
  if (!existsSync(dest)) return console.log('Status: not installed');
  if (existsSync(join(dest, '.git'))) return console.log('Status: Git checkout (update using its version-control workflow)');
  const marker = await readMarker(dest);
  if (!marker) return console.log('Status: existing directory, not managed by Token Saver');
  const changed = await localChanges(dest, marker);
  console.log(`Installed version: ${marker.version ?? 'unknown'}`);
  console.log(`Installed via: ${marker.source ?? 'unknown'}`);
  console.log(`Status: ${changed.length ? `${changed.length} locally changed/missing managed file(s)` : 'healthy'}`);
  for (const rel of changed.slice(0, 10)) console.log(`  - ${rel}`);
}

async function uninstall(opts) {
  const dest = opts.dest;
  if (!existsSync(dest)) return console.log('Token Saver is not installed.');
  if (existsSync(join(dest, '.git'))) die(`${dest} is a Git checkout; uninstall it with its version-control/filesystem workflow.`);
  const marker = await readMarker(dest);
  if (!marker) die(`${dest} is not a managed Token Saver installation. Nothing was removed.`);
  const changed = await localChanges(dest, marker);
  if (changed.length && !opts.force) die('managed files have local changes; rerun with --force only if you want those managed files removed.');
  for (const rel of Object.keys(marker.files ?? {})) await rm(join(dest, rel), { force: true });
  await rm(join(dest, MARKER), { force: true });
  async function removeEmpty(path) {
    if (!existsSync(path)) return;
    for (const name of await readdir(path)) {
      const child = join(path, name);
      if ((await stat(child)).isDirectory()) await removeEmpty(child);
    }
    if ((await readdir(path)).length === 0) await rm(path, { recursive: true, force: true });
  }
  await removeEmpty(dest);
  console.log(`Removed managed Token Saver files from ${dest}.`);
}

async function selfTest() {
  const required = ['AGENT.md', 'skills/token-discipline/SKILL.md', 'skills/semantic-memory/SKILL.md',
    'skills/code-intelligence/SKILL.md', 'skills/cli-output-optimization/SKILL.md', 'skills/context-assurance/SKILL.md'];
  const missing = required.filter((rel) => !existsSync(join(packageRoot, rel)));
  if (missing.length) die(`package is incomplete: ${missing.join(', ')}`);
  if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(VERSION)) die(`invalid SemVer version: ${VERSION}`);
  console.log(`Token Saver ${VERSION} self-test passed.`);
}

function help() {
  console.log(`Token Saver ${VERSION}\n\nUsage:\n  token-saver install [--dir PATH] [--force]\n  token-saver update [--dir PATH] [--force]\n  token-saver doctor [--dir PATH]\n  token-saver version\n  token-saver print-init\n  token-saver uninstall [--dir PATH] [--force]\n\nDefault install path: ~/token-saver`);
}

const [command = 'help', ...args] = process.argv.slice(2);
const { opts } = parseOptions(args);

switch (command) {
  case 'install': await applyInstall('install', opts); break;
  case 'update': await update(opts); break;
  case '_apply-update': await update(opts, true); break;
  case 'doctor': await doctor(opts); break;
  case 'version': console.log(`Token Saver ${VERSION}`); break;
  case 'print-init': console.log(INIT); break;
  case 'uninstall': await uninstall(opts); break;
  case 'self-test': await selfTest(); break;
  case 'help': case '--help': case '-h': help(); break;
  default: help(); process.exitCode = 1;
}
