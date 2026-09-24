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
sh runtimes/wasmedge/run.sh
cd runtimes/wazero && go run .
```

いずれも `42` を出力します。Wasmtimeは `--invoke add`、Wasmerは `--invoke add`、WasmEdgeは `--reactor add`、wazeroはGo APIの `ExportedFunction("add").Call` を使います。

## 検証状況（2026-09-24）

| Runtime | バージョン・環境 | 状態 |
| --- | --- | --- |
| Wasmtime | 47.0.3 / macOS arm64 | 検証済み（`42`） |
| Wasmer | 未導入 | 未検証。CLIが見つからないため、`run.sh` は理由を表示して終了します |
| WasmEdge | 未導入 | 未検証。CLIが見つからないため、`run.sh` は理由を表示して終了します |
| wazero | v1.11.0 / Go 1.27 | 検証済み（`42`） |

対象OSはmacOS arm64です。WASIは使っていません。WASIを使う場合は、ランタイムごとに標準入力・出力の設定を追加してください。
