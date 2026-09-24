#!/bin/sh
set -eu
wasmedge_home=${WASMEDGE_HOME:-}
if [ -z "$wasmedge_home" ]; then
  echo "Set WASMEDGE_HOME to the WasmEdge SDK root (headers and libwasmedge.dylib)." >&2
  exit 127
fi
host=$(mktemp "${TMPDIR:-/tmp}/wasmedge-add.XXXXXX")
trap 'rm -f "$host"' EXIT
cc=${CC:-clang}
"$cc" -I"$wasmedge_home" -L"$wasmedge_home" -Wl,-rpath,"$wasmedge_home" \
  "$(dirname "$0")/main.c" -lwasmedge -o "$host"
exec "$host" "$(dirname "$0")/../common/add.wasm"
