#!/bin/sh
set -eu
command -v wasmer >/dev/null 2>&1 || { echo "wasmer is not installed; see runtimes/README.md" >&2; exit 127; }
exec wasmer run --invoke add "$(dirname "$0")/../common/add.wasm" 20 22
