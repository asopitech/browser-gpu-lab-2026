# Three.js WebGPU Lab

Three.js `0.186.0` の `WebGPURenderer` で、立方体・透視投影カメラ・平行光源を描画するVite + TypeScriptラボです。WebGPUを優先し、利用できない場合はThree.jsがWebGL 2へ自動フォールバックします。画面上のステータスで、実際に選ばれたバックエンドを確認できます。

## 必要な環境

- Node.js 22以上
- pnpm 10以上（Corepack経由を推奨）
- WebGPUまたはWebGL 2対応ブラウザ

## 起動

リポジトリ直下で依存関係を導入してから、次を実行します。

```bash
corepack pnpm install
corepack pnpm --filter @browser-gpu-lab/threejs-webgpu dev
```

ブラウザで表示されたURLを開くと、回転する青い立方体が表示されます。ステータスが **WebGPU を利用して描画中です。** ならWebGPU、**WebGL 2へ切り替えて描画中です。** ならフォールバックで動作しています。

## 確認結果

Google Chrome（macOS / Apple M3）でWebGPUバックエンドを利用した立方体の描画を確認しました。環境と日付を含む結果は [`docs/verification.md`](../../docs/verification.md) に記録しています。

## 実装上の確認

Three.js公式のWebGPURendererガイドに従い、Viteでは `three/webgpu` からインポートしています。公式ドキュメントによると、`WebGPURenderer` はWebGPUを優先し、非対応環境ではWebGL 2をフォールバックとして使います。

- [WebGPURenderer guide](https://threejs.org/manual/pages/webgpurenderer.html)
- [WebGPURenderer API](https://threejs.org/docs/pages/WebGPURenderer.html)
