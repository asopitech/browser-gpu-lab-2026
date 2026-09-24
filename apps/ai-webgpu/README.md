# ONNX Runtime Web AI Lab

ONNX Runtime Web `1.30.0` で、3×4行列と4×3行列を掛ける最小ONNXモデルをブラウザから実行します。WebGPUを優先し、WebGPUが利用できないときはWASM（CPU）へフォールバックします。画面にはライブラリ名、モデル名、選択した実行バックエンド、モデル取得サイズ、出力テンソルを表示します。

## 必要な環境

- Node.js 22以上
- pnpm 10以上（Corepack経由を推奨）
- WebGPU対応ブラウザ（WebGPU実行を確認する場合）

## 起動

```bash
corepack pnpm install
corepack pnpm --filter @browser-gpu-lab/ai-webgpu dev
```

ブラウザで表示されたURLを開き、**モデルを取得して推論**を押します。成功時は `[700, 800, 900, 1580, 1840, 2100, 2460, 2880, 3300]` が表示されます。

## モデルとライセンス

- モデル: `backend-test:MatMul`（ONNX Runtime公式のJavaScript quick-startサンプル）
- 取得元: `https://raw.githubusercontent.com/microsoft/onnxruntime-inference-examples/main/js/quick-start_onnxruntime-web-script-tag/model.onnx`
- ダウンロードサイズ: 120 bytes（2026-09-24にHTTPレスポンスの `Content-Length` を確認）
- ライセンス: モデルを含むサンプルリポジトリのMIT License

モデル本体はGitへ登録しません。ブラウザ起動時に上記URLから取得します。

## バックエンドの扱い

WebGPUが使えるときは `executionProviders: ["webgpu", "wasm"]` としてWebGPUを優先します。WebGPU初期化やモデル実行に失敗した場合はWASMへ切り替えて再試行します。WebGPUもWASMも利用できない場合は停止条件としてエラーを表示します。

参考: [ONNX Runtime Web execution providers](https://github.com/microsoft/onnxruntime-inference-examples/blob/main/js/api-usage_session-options/README.md)
