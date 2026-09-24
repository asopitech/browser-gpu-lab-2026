import * as ort from "onnxruntime-web";
import jsepWasmUrl from "onnxruntime-web/ort-wasm-simd-threaded.jsep.wasm?url";
import jsepMjsUrl from "onnxruntime-web/ort-wasm-simd-threaded.jsep.mjs?url";
import "./style.css";

const MODEL_URL = "https://raw.githubusercontent.com/microsoft/onnxruntime-inference-examples/main/js/quick-start_onnxruntime-web-script-tag/model.onnx";
const runButton = document.querySelector<HTMLButtonElement>("#run");
const status = document.querySelector<HTMLOutputElement>("#status");
const result = document.querySelector<HTMLElement>("#result");

if (!runButton || !status || !result) {
  throw new Error("画面の要素を取得できませんでした。");
}

const run = runButton;
const message = status;
const resultBlock = result;

ort.env.wasm.numThreads = 1;
ort.env.wasm.wasmPaths = { wasm: jsepWasmUrl, mjs: jsepMjsUrl };

function format(values: Float32Array | number[]): string {
  return `[${Array.from(values, (value) => Number(value.toFixed(4))).join(", ")}]`;
}

async function createSession(model: ArrayBuffer, providers: ort.InferenceSession.SessionOptions["executionProviders"]): Promise<ort.InferenceSession> {
  return ort.InferenceSession.create(model, { executionProviders: providers });
}

async function runInference(): Promise<void> {
  const useWebGPU = "gpu" in navigator;
  message.value = `モデルを取得しています…（${MODEL_URL}）`;
  resultBlock.textContent = "";

  const response = await fetch(MODEL_URL);
  if (!response.ok) {
    throw new Error(`モデル取得に失敗しました（HTTP ${response.status}）。`);
  }
  const model = await response.arrayBuffer();
  const preferredProviders: ort.InferenceSession.SessionOptions["executionProviders"] = useWebGPU ? ["webgpu", "wasm"] : ["wasm"];
  const preferredLabel = useWebGPU ? "WebGPU（失敗時はWASM）" : "WASM（CPU）";

  let session: ort.InferenceSession;
  let backendLabel = preferredLabel;
  try {
    message.value = `${preferredLabel}でセッションを作成しています…`;
    session = await createSession(model, preferredProviders);
  } catch (error) {
    if (!useWebGPU) throw error;
    message.value = "WebGPUを初期化できないため、WASM（CPU）へ切り替えています…";
    session = await createSession(model, ["wasm"]);
    backendLabel = "WASM（CPUフォールバック）";
  }

  const tensorA = new ort.Tensor("float32", Float32Array.from({ length: 12 }, (_, index) => index + 1), [3, 4]);
  const tensorB = new ort.Tensor("float32", Float32Array.from({ length: 12 }, (_, index) => (index + 1) * 10), [4, 3]);
  const startedAt = performance.now();
  const outputs = await session.run({ a: tensorA, b: tensorB });
  const elapsedMs = performance.now() - startedAt;
  const output = outputs.c;
  message.value = `推論成功（バックエンド: ${backendLabel}）`;
  resultBlock.textContent = `ライブラリ: ONNX Runtime Web 1.30.0\nモデルサイズ: ${model.byteLength} bytes\n出力 shape: [${output.dims.join(", ")}]\n出力: ${format(output.data as Float32Array)}\n実行時間: ${elapsedMs.toFixed(2)} ms`;
}

run.addEventListener("click", async () => {
  run.disabled = true;
  try {
    await runInference();
  } catch (error) {
    message.value = `推論を停止しました: ${error instanceof Error ? error.message : "不明なエラー"}`;
  } finally {
    run.disabled = false;
  }
});
