# WASM Runtime Labs

同じ `add(i32, i32) -> i32` WebAssemblyモジュールをWasmtime、Wasmer、WasmEdge、wazeroで実行する比較ラボです。共通モジュールは `runtimes/common/add.wat` から生成し、WASIを使わないホスト関数なしの最小例にしています。

## 共通モジュールの生成

`wasm-tools`（1.255.0で検証済み）を使います。

```bash
wasm-tools parse runtimes/common/add.wat -o runtimes/common/add.wasm
wc -c runtimes/common/add.wasm
```

生成されたWASMはGitへ登録しません。

## 実行方法

```bash
sh runtimes/wasmtime/run.sh
sh runtimes/wasmer/run.sh
WASMEDGE_HOME=/path/to/wasmedge-sdk sh runtimes/wasmedge/run.sh
cd runtimes/wazero && go run .
# 言語生成Core Wasmも実行可能
cd runtimes/wazero && go run . ../../labs/assemblyscript-math/build/math-core.wasm
```

いずれも `42` を出力します。Wasmtimeは `--invoke add`、Wasmerは `--invoke add`、WasmEdgeはC APIホスト、wazeroはGo APIの `ExportedFunction("add").Call` を使います。WASIモジュールはWasmer CLI、WasmEdge WASI C API、wazeroのWASI Preview 1ホストで実行します。

## 検証状況（2026-09-25）

| Runtime | バージョン・環境 | 状態 |
| --- | --- | --- |
| Wasmtime | 47.0.3 / macOS arm64 | 検証済み（`42`） |
| Wasmer | 7.4.2 / macOS arm64 | 検証済み（`42`）。公式CLIで共通モジュールを実行 |
| WasmEdge | 0.17.1 / macOS arm64 | C APIで検証済み（`42`）。公式macOS SDKにはCLI実行ファイルが含まれないため、`runtimes/wasmedge/main.c` をコンパイルして実行 |
| wazero | v1.11.0 / Go 1.27 | 検証済み（`42`） |

対象OSはmacOS arm64です。WASIは使っていません。WASIを使う場合は、ランタイムごとに標準入力・出力の設定を追加してください。

WasmEdge C APIの実行例:

```bash
  clang -I/path/to/wasmedge -L/path/to/wasmedge -Wl,-rpath,/path/to/wasmedge \
  runtimes/wasmedge/main.c -lwasmedge -o /tmp/wasmedge_add
/tmp/wasmedge_add labs/assemblyscript-math/build/math-core.wasm
```
