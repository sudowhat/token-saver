#!/usr/bin/env sh
set -eu

DEST="${TOKEN_SAVER_HOME:-$HOME/token-saver}"
BASE="https://github.com/sudowhat/token-saver/releases/latest/download"
TMP="$(mktemp -d 2>/dev/null || mktemp -d -t token-saver)"
trap 'rm -rf "$TMP"' EXIT INT TERM

say() { printf '%s\n' "$*"; }
fail() { say "Token Saver: $*" >&2; exit 1; }

command -v curl >/dev/null 2>&1 || fail "curl is required"
command -v tar >/dev/null 2>&1 || fail "tar is required"

say "Downloading latest Token Saver release..."
curl -fsSL "$BASE/token-saver.tgz" -o "$TMP/token-saver.tgz" || fail "no published release found yet"
curl -fsSL "$BASE/token-saver.tgz.sha256" -o "$TMP/token-saver.tgz.sha256" || fail "release checksum is unavailable"

EXPECTED="$(awk '{print $1}' "$TMP/token-saver.tgz.sha256")"
if command -v sha256sum >/dev/null 2>&1; then
  ACTUAL="$(sha256sum "$TMP/token-saver.tgz" | awk '{print $1}')"
elif command -v shasum >/dev/null 2>&1; then
  ACTUAL="$(shasum -a 256 "$TMP/token-saver.tgz" | awk '{print $1}')"
else
  fail "sha256sum or shasum is required to verify the release"
fi
[ "$EXPECTED" = "$ACTUAL" ] || fail "release checksum verification failed"

tar -xzf "$TMP/token-saver.tgz" -C "$TMP"
SRC="$TMP/package"
[ -f "$SRC/AGENT.md" ] || fail "release archive is invalid"

if [ -d "$DEST/.git" ]; then
  fail "$DEST is a Git checkout. Update it with its version-control workflow instead."
fi

if [ -e "$DEST" ] && [ ! -f "$DEST/.token-saver-curl" ]; then
  fail "$DEST already exists and is not a curl-managed Token Saver install; nothing was overwritten"
fi

if [ -f "$DEST/.token-saver-files.sha256" ]; then
  while read -r expected rel; do
    [ -z "${rel:-}" ] && continue
    file="$DEST/$rel"
    [ -f "$file" ] || fail "local managed file is missing: $rel"
    if command -v sha256sum >/dev/null 2>&1; then actual="$(sha256sum "$file" | awk '{print $1}')"; else actual="$(shasum -a 256 "$file" | awk '{print $1}')"; fi
    [ "$expected" = "$actual" ] || fail "local changes detected in $rel; refusing to overwrite"
  done < "$DEST/.token-saver-files.sha256"
fi

mkdir -p "$DEST"
for entry in AGENT.md README.md CONTRIBUTING.md CHANGELOG.md INIT_PROMPT.txt OPTIONAL_PROJECT_STUB.md THIRD_PARTY.md LICENSE package.json skills; do
  rm -rf "$DEST/$entry"
  cp -R "$SRC/$entry" "$DEST/$entry"
done

: > "$DEST/.token-saver-files.sha256"
find "$DEST" -type f ! -name '.token-saver-files.sha256' ! -name '.token-saver-curl' | sort | while read -r file; do
  rel="${file#$DEST/}"
  if command -v sha256sum >/dev/null 2>&1; then hash="$(sha256sum "$file" | awk '{print $1}')"; else hash="$(shasum -a 256 "$file" | awk '{print $1}')"; fi
  printf '%s %s\n' "$hash" "$rel" >> "$DEST/.token-saver-files.sha256"
done
printf 'managed\n' > "$DEST/.token-saver-curl"

VERSION="$(sed -n 's/.*"version"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' "$DEST/package.json" | head -1)"
say "Installed Token Saver ${VERSION:-unknown} → $DEST"
say ""
say "Start an AI agent with:"
say ""
say "Read ~/token-saver/AGENT.md and initialize this project. Then continue to follow it for this session."
