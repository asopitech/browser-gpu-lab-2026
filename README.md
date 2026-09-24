# Browser GPU Lab 2026

『ブラウザ×GPU の軌跡と現在地 2026』で扱うコード、実装、フレームワークを実際に動かすためのリポジトリです。

WebページのJavaScriptがGPU上で動くWGSL関数、GPUバッファ、実行命令をブラウザへ渡す流れを、最小のWebGPUサンプルから確認します。その上で、3Dレンダリング、地理空間データの描画、AI推論、WASM向け言語、ブラウザ外のWASMランタイムを個別のラボとして追加します。

## 収録するラボ

| 区分 | ディレクトリ | 内容 | 本の対応章 |
| --- | --- | --- | --- |
| WebGPUの基本 | `apps/webgpu-basics` | WGSL、`GPUBuffer`、bind group、compute pipeline、結果の読み取り | 第2章 |
| 3D | `apps/threejs-webgpu` | Three.jsのWebGPUレンダラーによる3D描画 | 第4章 |
| AI推論 | `apps/ai-webgpu` | ONNX Runtime WebまたはTransformers.jsによるWebGPU推論 | 第4章 |
| MoonBit | `labs/moonbit-browser` | MoonBitで生成したWASMをブラウザから呼び出す | 第5章 |
| AssemblyScript | `labs/assemblyscript-math` | 数値計算をWASMモジュールへ分ける | 第5章 |
| Rust | `labs/rust-wgpu` | `wgpu`によるブラウザ・ネイティブ共有コード | 第4・5章 |
| WASMランタイム | `runtimes` | Wasmtime、Wasmer、WasmEdgeなどでWASMを実行する | 第3章 |

各ラボは単独でビルド・実行できる構成にします。未実装のラボには目的と導入手順を記したREADMEを置き、動作する実装を順に追加します。

## 最初に動かすWebGPUサンプル

```bash
corepack enable
pnpm install
pnpm dev:webgpu
```

表示されたURLをWebGPU対応ブラウザで開きます。サンプルは入力配列`[1, 2, 3, 4]`をGPUで二乗し、`[1, 4, 9, 16]`を画面と開発者ツールのコンソールに表示します。

## 必要な環境

- Node.js 22以上
- pnpm 10以上（Corepack経由を推奨）
- WebGPU対応のChrome、Edge、Firefox、Safariのいずれか
- MoonBit、Rust、AssemblyScript、各WASMランタイムは該当ラボを実行するときに導入します

## ディレクトリ構成

```text
apps/       ブラウザで動かすWebGPU・フレームワークのサンプル
labs/       MoonBit、AssemblyScript、Rustなど言語別のサンプル
runtimes/   ブラウザ外のWASMランタイム別サンプル
packages/   複数ラボで共有するコードとデータ
docs/       実装メモ、対応表、追加予定
```

## 開発方針

- 一つのラボは一つの仕組みを扱います。
- 動作確認に必要なコードはリポジトリ内に置きます。
- 大きなモデルやデータセットはダウンロード手順を記載し、Gitへ直接含めません。
- ブラウザ実装、GPU、OS、ドライバの違いは検証結果とともに記録します。

## 関連

- [ブラウザ×GPU の軌跡と現在地 2026](https://zenn.dev/asopitech/books/wasm-webgpu-frontier-book)
- [WebGPU specification](https://www.w3.org/TR/webgpu/)
- [WebAssembly](https://webassembly.org/)

## License

[MIT](LICENSE)
