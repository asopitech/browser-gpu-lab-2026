# Go WASI Lab

Go 1.27 の標準ツールチェーンで `wasip1/wasm` を生成し、Node.jsではなくWasmtimeで実行する最小ラボです。標準Goランタイムを含むため、TinyGoよりバイナリが大きくなる比較対象にもなります。

## ビルドと実行

```bash
cd labs/go-wasm
GOOS=wasip1 GOARCH=wasm go build -o build/go-wasi.wasm .
wasmtime run build/go-wasi.wasm
```

期待する出力は `42` です。2026-09-24にGo 1.27 / macOS arm64 / Wasmtime 47.0.3で実行し、生成物は2,480,138 bytes（約2.37 MiB）でした。`build/`は生成物のためGitへ登録しません。

## TinyGo

TinyGoはこの環境にCLIがないため未検証です。導入後は、`tinygo build -target wasi -o build/tinygo-wasi.wasm .` を実行し、同じ `wasmtime run` で標準Goとの差を比較します。
