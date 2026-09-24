# 動作確認記録

ブラウザ実装やGPUによる差異を追跡するため、手元で再現できた結果を記録します。実行時間はデータ転送、GPU実行、読み戻しを含む参考値であり、性能比較には使用しません。

| 確認日 | ブラウザ | OS | GPU | ラボ | 結果 |
| --- | --- | --- | --- | --- | --- |
| 2026-09-24 | Google Chrome（WebGPU有効） | macOS | Apple M3（10コアGPU） | `apps/webgpu-basics` | ボタン実行で入力 `[1, 2, 3, 4]` に対し `[1, 4, 9, 16]` を表示（43.40 ms） |
| 2026-09-24 | Google Chrome（WebGPU有効） | macOS | Apple M3（10コアGPU） | `apps/threejs-webgpu` | 回転する立方体を表示し、WebGPUバックエンドを使用中と画面に表示 |
| 2026-09-24 | Google Chrome（WebGPU有効） | macOS | Apple M3（10コアGPU） | `apps/ai-webgpu` | 120 bytesのMatMulモデルを取得し、WebGPUで3×3出力を表示（102.20 ms） |
| 2026-09-24 | AssemblyScript CLI / Node.js | macOS | CPU | `labs/assemblyscript-math` | WASM 5,077 bytesを生成し、入力の合計 `17` を確認 |
| 2026-09-24 | MoonBit CLI / Node.js WASI | macOS | CPU | `labs/moonbit-browser` | WASM 5,079 bytesを生成し、`double(21)` の出力 `42` を確認 |
| 2026-09-24 | Rust 1.97 / wgpu 30.0.1 | macOS | Apple M3（Metal） | `labs/rust-wgpu` | ネイティブ実行で利用可能バックエンド `Metal` を確認 |

## 再現手順

```bash
corepack pnpm install
corepack pnpm dev:webgpu
```

表示されたURLをWebGPU対応ブラウザで開き、**GPUで実行**を選びます。
