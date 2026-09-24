# 動作確認記録

ブラウザ実装やGPUによる差異を追跡するため、手元で再現できた結果を記録します。実行時間はデータ転送、GPU実行、読み戻しを含む参考値であり、性能比較には使用しません。

| 確認日 | ブラウザ | OS | GPU | ラボ | 結果 |
| --- | --- | --- | --- | --- | --- |
| 2026-09-24 | Google Chrome（WebGPU有効） | macOS | Apple M3（10コアGPU） | `apps/webgpu-basics` | ボタン実行で入力 `[1, 2, 3, 4]` に対し `[1, 4, 9, 16]` を表示（43.40 ms） |
| 2026-09-24 | Google Chrome（WebGPU有効） | macOS | Apple M3（10コアGPU） | `apps/threejs-webgpu` | 回転する立方体を表示し、WebGPUバックエンドを使用中と画面に表示 |
| 2026-09-24 | Google Chrome（WebGPU有効） | macOS | Apple M3（10コアGPU） | `apps/ai-webgpu` | 120 bytesのMatMulモデルを取得し、WebGPUで3×3出力を表示（102.20 ms） |
| 2026-09-24 | AssemblyScript CLI / Node.js | macOS | CPU | `labs/assemblyscript-math` | WASM 5,077 bytesを生成し、入力の合計 `17` を確認 |
| 2026-09-24 | Wasmtime 47.0.3 | macOS arm64 | CPU | `labs/assemblyscript-math` | AssemblyScript生成のCore Wasmを `add(20, 22)` で実行し `42` を確認 |
| 2026-09-24 | MoonBit CLI / Node.js WASI | macOS | CPU | `labs/moonbit-browser` | WASM 5,079 bytesを生成し、`double(21)` の出力 `42` を確認 |
| 2026-09-24 | Wasmtime 47.0.3 | macOS arm64 | CPU | `labs/moonbit-browser` | MoonBit生成のWASI Preview 1モジュールを実行し `42` を確認 |
| 2026-09-24 | Go 1.27 / Wasmtime 47.0.3 | macOS arm64 | CPU | `labs/go-wasm` | 標準GoのWASI Preview 1モジュールを実行し `42` を確認（2,480,138 bytes） |
| 2026-09-24 | TinyGo 0.42.0 / Wasmtime 47.0.3 | macOS arm64 | CPU | `labs/go-wasm` | TinyGoのWASI Preview 1モジュールを実行し `42` を確認（446,399 bytes） |
| 2026-09-24 | Temurin 21.0.12.1 / Chicory 1.7.5 | macOS arm64 | CPU | `runtimes/java` | AssemblyScript生成Core WasmをJVM内で実行し `42` を確認 |
| 2026-09-24 | GraalVM CE 25.4.4.1.1 / GraalWasm | macOS arm64 | CPU | `runtimes/java` | AssemblyScript生成Core WasmをPolyglot APIで実行し `42` を確認 |
| 2026-09-25 | Wasmer 7.4.2 / WasmEdge 0.17.1 | macOS arm64 | CPU | `runtimes/common` / `runtimes/wasmedge` | 共通Core WasmをWasmer CLIとWasmEdge C APIで実行し、いずれも `42` を確認 |
| 2026-09-24 | Rust 1.97 / wgpu 30.0.1 | macOS | Apple M3（Metal） | `labs/rust-wgpu` | ネイティブ実行で利用可能バックエンド `Metal` を確認 |

## 再現手順

```bash
corepack pnpm install
corepack pnpm dev:webgpu
```

表示されたURLをWebGPU対応ブラウザで開き、**GPUで実行**を選びます。
