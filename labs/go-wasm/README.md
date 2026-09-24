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

TinyGo 0.42.0とBinaryen 133の公式arm64バイナリを一時導入して検証しました。

```bash
WASMOPT=/path/to/wasm-opt tinygo build -target wasi -o build/tinygo-wasi.wasm .
wasmtime run build/tinygo-wasi.wasm
```

出力は `42`、サイズは **446,399 bytes（約435.94 KiB）** でした。
