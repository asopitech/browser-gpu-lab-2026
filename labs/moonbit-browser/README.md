# MoonBit Browser Lab

MoonBitの小さな整数変換関数をWASMへコンパイルし、JavaScriptのWASIホストから `_start` を呼び出すラボです。`double(21)` をMoonBit側で計算し、`42` を出力します。

## 必要な環境

- Node.js 22以上（WASIホスト）
- MoonBit CLI（公式インストール手順は[Download](https://www.moonbitlang.com/download)）

## ビルドと実行

```bash
moon check
moon test
moon build --target wasm --release
node scripts/run.mjs
```

期待する出力は `42` です。`scripts/run.mjs` は生成されたWASMの `wasi_snapshot_preview1.fd_write` をNode.js `WASI`でホストします。ブラウザ直接実行用のWASIアダプターは未実装で、現状はNode.jsホストでの検証範囲です。

## 生成物とサイズ

- WASM: `labs/moonbit-browser/_build/wasm/release/build/cmd/main/main.wasm`
- サイズ確認: `wc -c _build/wasm/release/build/cmd/main/main.wasm` → **5,079 bytes（約4.96 KiB）**
- `_build/` は生成物のためGitへ登録しません。
