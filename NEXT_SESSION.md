# 次のセッションへの指示

`asopitech/browser-gpu-lab-2026`を続けて実装してください。このリポジトリは『ブラウザ×GPU の軌跡と現在地 2026』で紹介するWebGPU、WASM、ライブラリ、フレームワークを実際に動かすラボです。

## 現在の状態

- 既定ブランチは`main`です。
- 初期コミットは`468104f`です。
- `apps/webgpu-basics`には、入力配列`[1, 2, 3, 4]`をWGSLのcompute shaderで二乗するサンプルがあります。
- `corepack pnpm check`と`corepack pnpm build`は成功済みです。
- Node.js 22以上、pnpm 10を使います。依存関係は`pnpm-lock.yaml`へ固定します。

## 最初に行う確認

```bash
git status --short --branch
corepack pnpm install
corepack pnpm check
corepack pnpm dev:webgpu
```

WebGPU対応ブラウザで開き、ボタンを押して`[1, 4, 9, 16]`が表示されることを確認してください。ブラウザ、OS、GPU、確認日を`docs/verification.md`へ記録します。

## 実装する順序

### 1. WebGPUの基本ラボを完成させる

`apps/webgpu-basics`へ、次の表示を追加してください。

- `GPUAdapter`、`GPUDevice`、`GPUQueue`の役割
- WGSLの関数、入力・出力バッファ、bind group、command bufferの対応
- 実行時間と、WebGPUが使えない場合のメッセージ

第2章のコードと同じ実行手順を保ちます。画面用の説明は、API名の列挙だけで終えず、各オブジェクトが何を担うかを書いてください。

### 2. Three.jsのWebGPUラボを追加する

`apps/threejs-webgpu`をViteとTypeScriptの独立したワークスペースにします。

- `WebGPURenderer`で立方体、カメラ、ライトを描画する
- WebGPUの利用可否と、利用した描画バックエンドを画面に表示する
- WebGL 2へ切り替わった場合は、その事実を画面に表示する
- 起動方法と確認結果をREADMEに記載する

Three.jsの導入時は、使用するバージョンの公式ドキュメントで`WebGPURenderer`のimport方法と対応状況を確認してください。

### 3. AI推論ラボを追加する

`apps/ai-webgpu`で、ONNX Runtime WebまたはTransformers.jsのどちらか一方から始めます。最初のラボは、入出力が小さく、モデル取得とWebGPU実行の成否を画面で確認できるものにしてください。

- 実行するライブラリ名、モデル名、実行バックエンドを表示する
- WebGPUを使えない場合の代替バックエンドまたは停止条件を記載する
- モデル本体はGitへ登録しない。取得元、ライセンス、ダウンロードサイズをREADMEに記載する

### 4. WASM向け言語のラボを追加する

`labs/assemblyscript-math`、`labs/moonbit-browser`、`labs/rust-wgpu`を順に実装します。

- AssemblyScript: 数値配列の合計または変換関数をWASMへコンパイルし、JavaScriptから呼ぶ
- MoonBit: 小さなパーサーまたはデータ変換関数をWASMへコンパイルし、JavaScriptから呼ぶ
- Rust: `wgpu`を使うブラウザ・ネイティブ共有コードの最小例を作る

各ラボのREADMEには、ビルドコマンド、生成したWebAssemblyバイナリのパス、最適化後のファイルサイズを記録してください。サイズはgzip圧縮前の`.wasm`をKiBまたはMiBで記録します。

### 5. ブラウザ外のWASMランタイムを比較する

`runtimes`に共通のWASMモジュールと、Wasmtime、Wasmer、WasmEdge、wazeroの実行例を追加します。

- 同じ関数を呼ぶための各ランタイムの最小ホストコードを作る
- 実行コマンド、対象OS、WASIまたはホスト関数の有無をREADMEに書く
- 導入できないランタイムは理由と未検証であることを記録する

## 共通の完了条件

- 各ラボを単独のコマンドで起動または実行できる。
- 各READMEに対象技術、必要な環境、起動手順、期待する出力を記載する。
- `corepack pnpm check`と`corepack pnpm build`を、ブラウザアプリを追加するたびに実行する。
- ランタイム・言語のビルド結果は、コマンドとサイズを再現可能な形で記録する。
- 変更単位ごとにコミットし、`main`へプッシュする。

## 作業上の制約

- 大きなAIモデル、生成物、`node_modules`、`dist`、`.wasm`の成果物はGitへ登録しない。
- 依存ライブラリのバージョンは、導入時点の公式ドキュメントで確認する。
- 実装できた範囲と未実装の範囲をREADMEで区別する。
- 書籍本文の説明を補うための実験リポジトリとして扱い、書籍本文自体は変更しない。
