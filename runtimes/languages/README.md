# Language-produced WASM runtime checks

各言語ラボが生成した `.wasm` を、言語付属のホストだけでなくスタンドアロンWASMランタイムでも実行するための確認手順です。

まとめて実行する場合は、リポジトリルートから `sh runtimes/languages/run.sh` を実行します。

## AssemblyScript

```bash
corepack pnpm --filter @browser-gpu-lab/assemblyscript-math build
wasmtime run --invoke add labs/assemblyscript-math/build/math-core.wasm 20 22
```

結果: `42`（Wasmtime 47.0.3 / macOS arm64）。AssemblyScript側には `add(i32, i32)` のスカラーエクスポートを用意し、ランタイム依存を除いたCore Wasm版を生成しています。

## MoonBit

```bash
cd labs/moonbit-browser
moon build --target wasm --release
wasmtime run _build/wasm/release/build/cmd/main/main.wasm
```

結果: `42`（Wasmtime 47.0.3 / macOS arm64）。MoonBitのWASI Preview 1出力をNode.js WASIとWasmtimeの両方で実行します。

## Rust

Rustラボは現在ネイティブ `wgpu` を検証済みで、`wasm32-unknown-unknown` 標準ライブラリがこの環境にないため、WASMランタイムでの実行は未検証です。ターゲット導入後に、ブラウザ向け `wasm-bindgen` 出力を追加して同じ表へ登録します。

## Go

`labs/go-wasm` で標準Goの `wasip1/wasm` を生成し、Wasmtimeで実行します。TinyGoはCLI未導入のため未検証です。

## Java

記事で扱うChicory / GraalWasmは、JavaランタイムまたはGraalVMと依存関係の取得が必要です。この検証環境にはJava Runtime、Maven、Gradleがなく、まだ実行していません。Java環境を用意した後、同じ `add(20,22)` モジュールをChicory（純Java）とGraalWasm（Polyglot API）で実行するのが次の作業です。

## 検証結果（2026-09-24）

| 言語 | 生成形式 | 実行ランタイム | 状態 |
| --- | --- | --- | --- |
| AssemblyScript | Core Wasm (`add`) | Node.js loader / Wasmtime | 検証済み |
| MoonBit | WASI Preview 1 | Node.js WASI / Wasmtime | 検証済み |
| Go 1.27 | WASI Preview 1 | Wasmtime | 検証済み（2,480,138 bytes） |
| Rust | wasm32-unknown-unknown | Wasmtime / wazero | 未検証（ターゲット未導入） |
| Java | Core Wasm | Chicory / GraalWasm | 未検証（Java実行環境未導入） |
