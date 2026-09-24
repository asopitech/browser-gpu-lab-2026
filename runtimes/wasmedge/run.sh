#!/bin/sh
set -eu
command -v wasmedge >/dev/null 2>&1 || { echo "wasmedge is not installed; see runtimes/README.md" >&2; exit 127; }
exec wasmedge --reactor add "$(dirname "$0")/../common/add.wasm" 20 22
