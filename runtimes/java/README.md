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

GraalWasmはGraalVMのPolyglotランタイムが必要です。

## GraalWasm

GraalVM Community 25.4.4.1.1とMaven CentralのPolyglot/Truffle/Wasm jarを使い、同じモジュールを実行します。

```bash
GRAAL_CP=/tmp/graal-jars/'*'
/tmp/graalvm/Contents/Home/bin/javac -cp "$GRAAL_CP" runtimes/java/GraalWasmAdd.java
/tmp/graalvm/Contents/Home/bin/java -cp "runtimes/java:$GRAAL_CP" GraalWasmAdd labs/assemblyscript-math/build/math-core.wasm
```

期待する出力は `42` です。GraalVM Community 25.4.4.1.1、Polyglot/Truffle 25.3.4.1の組み合わせで検証しました（Polyglot APIとWasm言語の公開Maven版のリリース番号が一致しないため、Truffle側に合わせています）。
