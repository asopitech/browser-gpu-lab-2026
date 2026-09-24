#!/bin/sh
set -eu
exec wasmtime run --invoke add "$(dirname "$0")/../common/add.wasm" 20 22
