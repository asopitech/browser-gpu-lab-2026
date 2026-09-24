#!/usr/bin/env sh
set -eu

repo_root=$(CDPATH= cd -- "$(dirname -- "$0")/../.." && pwd)

if ! command -v wasmtime >/dev/null 2>&1; then
  echo "wasmtime is required to run language-produced modules" >&2
  exit 127
fi

echo "== AssemblyScript / Wasmtime =="
corepack pnpm --dir "$repo_root" --filter @browser-gpu-lab/assemblyscript-math build
wasmtime run --invoke add "$repo_root/labs/assemblyscript-math/build/math-core.wasm" 20 22

echo "== MoonBit / Wasmtime =="
if ! command -v moon >/dev/null 2>&1; then
  echo "moon is required to rebuild the MoonBit module" >&2
  exit 127
fi
(cd "$repo_root/labs/moonbit-browser" && moon build --target wasm --release)
wasmtime run "$repo_root/labs/moonbit-browser/_build/wasm/release/build/cmd/main/main.wasm"

echo "== Go / Wasmtime =="
(cd "$repo_root/labs/go-wasm" && mkdir -p build && GOOS=wasip1 GOARCH=wasm go build -o build/go-wasi.wasm .)
wasmtime run "$repo_root/labs/go-wasm/build/go-wasi.wasm"
