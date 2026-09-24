# Rust wgpu Lab

Rust `wgpu 30.0.1` の共有コードで、利用可能なGPUバックエンドを列挙する最小ラボです。同じ `available_backends` 関数をネイティブ実行ファイルと `wasm32` 用ライブラリから利用します。

## 必要な環境

- Rust stable（`cargo`）
- ブラウザ向けビルドには `wasm32-unknown-unknown` ターゲットと `wasm-bindgen-cli`

## ネイティブ実行

```bash
cargo run --manifest-path labs/rust-wgpu/Cargo.toml
```

GPUドライバに応じて `Vulkan`、`Metal`、`Dx12`、`Gl` などのバックエンド名を表示します。

## wasm32ビルド

```bash
rustup target add wasm32-unknown-unknown
cargo build --manifest-path labs/rust-wgpu/Cargo.toml --target wasm32-unknown-unknown --release
wasm-bindgen target/wasm32-unknown-unknown/release/rust_wgpu_lab.wasm --target web --out-dir labs/rust-wgpu/pkg
```

生成WASMは `target/wasm32-unknown-unknown/release/rust_wgpu_lab.wasm` です。サイズ確認は `wc -c` で行います。`target/` と `pkg/` は生成物のためGitへ登録しません。

## 現在の検証範囲

共有Rustコードとネイティブビルドを優先して実装しています。WebGPUキャンバスへの描画パイプラインは次の拡張で追加します。
