# Java WASM Runtime Lab

Chicoryを純JavaのWASMランタイムとして使い、AssemblyScriptが生成したCore WasmモジュールをJVM内で実行する最小例です。

## 実行

依存jarはMaven Centralから取得します（Gitには登録しません）。

```bash
curl -L -o /tmp/chicory-runtime.jar https://repo1.maven.org/maven2/com/dylibso/chicory/runtime/1.7.5/runtime-1.7.5.jar
curl -L -o /tmp/chicory-wasm.jar https://repo1.maven.org/maven2/com/dylibso/chicory/wasm/1.7.5/wasm-1.7.5.jar
corepack pnpm --filter @browser-gpu-lab/assemblyscript-math build
javac -cp /tmp/chicory-runtime.jar:/tmp/chicory-wasm.jar runtimes/java/ChicoryAdd.java
java -cp runtimes/java:/tmp/chicory-runtime.jar:/tmp/chicory-wasm.jar ChicoryAdd labs/assemblyscript-math/build/math-core.wasm
```

期待する出力は `42` です。2026-09-24にTemurin 21.0.12.1とChicory 1.7.5で実行確認しました。

GraalWasmはGraalVMのPolyglotランタイムが別途必要なため、同じ環境での検証対象には含めていません。
