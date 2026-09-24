# Language-produced WASM runtime checks

各言語ラボが生成した `.wasm` を、言語付属のホストだけでなくスタンドアロンWASMランタイムでも実行するための確認手順です。

まとめて実行する場合は、リポジトリルートから `sh runtimes/languages/run.sh` を実行します。

## AssemblyScript

```bash
corepack pnpm --filter @browser-gpu-lab/assemblyscript-math build
wasmtime run --invoke add labs/assemblyscript-math/build/math-core.wasm 20 22
```

結果: `42`（Wasmtime 47.0.3 / macOS arm64）。AssemblyScript側には `add(i32, i32)` のスカラーエクスポートを用意し、ランタイム依存を除いたCore Wasm版を生成しています。

同じ `math-core.wasm` をWasmer、WasmEdge C API、wazeroでも実行し、すべて `42` を確認しました。

## MoonBit

```bash
cd labs/moonbit-browser
moon build --target wasm --release
wasmtime run _build/wasm/release/build/cmd/main/main.wasm
```

結果: `42`（Wasmtime 47.0.3 / macOS arm64）。MoonBitのWASI Preview 1出力をNode.js WASI、Wasmtime、Wasmer、WasmEdge C API、wazeroで実行しました。

## Rust

Rustラボは現在ネイティブ `wgpu` を検証済みで、`wasm32-unknown-unknown` 標準ライブラリがこの環境にないため、WASMランタイムでの実行は未検証です。ターゲット導入後に、ブラウザ向け `wasm-bindgen` 出力を追加して同じ表へ登録します。

## Go

`labs/go-wasm` で標準Goの `wasip1/wasm` を生成し、Wasmtime、Wasmer、WasmEdge C API、wazeroで `42` を確認しました。TinyGo 0.42.0も同じ4ランタイムで実行済みです。

## Java

Chicory（純Java）とGraalWasmは `runtimes/java/README.md` の手順で検証済みです。

## 検証結果（2026-09-25）

| 言語 | 生成形式 | 実行ランタイム | 状態 |
| --- | --- | --- | --- |
| AssemblyScript | Core Wasm (`add`) | Node.js loader / Wasmtime / Wasmer / WasmEdge C API / Chicory / GraalWasm | 検証済み |
| MoonBit | WASI Preview 1 | Node.js WASI / Wasmtime / Wasmer / WasmEdge C API / wazero | 検証済み |
| Go 1.27 | WASI Preview 1 | Wasmtime / Wasmer / WasmEdge C API / wazero | 検証済み（2,480,138 bytes） |
| TinyGo 0.42.0 | WASI Preview 1 | Wasmtime / Wasmer / WasmEdge C API / wazero | 検証済み（446,399 bytes） |
| Rust | wasm32-unknown-unknown | Wasmtime / wazero | 未検証（ターゲット未導入） |
| Java | Core Wasm | Chicory 1.7.5 | 検証済み |
| Java | Core Wasm | GraalWasm 25.4.4.1.1 / Truffle 25.3.4.1 | 検証済み |
