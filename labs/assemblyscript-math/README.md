# AssemblyScript Math Lab

AssemblyScript `0.28.9` の `sum(pointer, length)` 関数をWASMへコンパイルし、Node.jsから `@assemblyscript/loader` 経由で呼び出すラボです。JavaScriptが線形メモリへ `Float64Array` を書き込み、WASM関数が合計値を返します。

## 必要な環境

- Node.js 22以上
- pnpm 10以上（Corepack経由を推奨）

## ビルドと実行

```bash
corepack pnpm install
corepack pnpm --filter @browser-gpu-lab/assemblyscript-math build
corepack pnpm --filter @browser-gpu-lab/assemblyscript-math execute
```

期待する出力は `合計: 17` です。モジュールには、他のWASMランタイムから呼び出せる `add(20, 22)` エクスポートも含まれます。

## 生成物とサイズ

- WASM: `labs/assemblyscript-math/build/math.wasm`
- サイズ確認: `wc -c labs/assemblyscript-math/build/math.wasm` → **5,077 bytes（約4.96 KiB）**
- `build/` は生成物のためGitへ登録しません。

## スタンドアロンWASMランタイム

AssemblyScriptが生成したCore Wasm版 `build/math-core.wasm` をWasmtimeで実行できます。

```bash
corepack pnpm --filter @browser-gpu-lab/assemblyscript-math build
wasmtime run --invoke add labs/assemblyscript-math/build/math-core.wasm 20 22
```

期待する出力は `42` です。`math-core.wasm` はAssemblyScriptランタイムのimportを含まないCore Wasm版で、Node.jsのloader用 `math.wasm` とは別に、言語固有のランタイムを介さないWASMランタイムでも実行できることを確認します。
