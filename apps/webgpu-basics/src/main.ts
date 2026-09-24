import "./style.css";

const runButton = document.querySelector<HTMLButtonElement>("#run");
const result = document.querySelector<HTMLOutputElement>("#result");

if (!runButton || !result) {
  throw new Error("画面の要素を取得できませんでした。");
}

const output = result;

const shaderCode = /* wgsl */ `
  @group(0) @binding(0) var<storage, read> input: array<f32>;
  @group(0) @binding(1) var<storage, read_write> output: array<f32>;

  @compute @workgroup_size(64)
  fn square(@builtin(global_invocation_id) id: vec3<u32>) {
    if (id.x >= arrayLength(&input)) {
      return;
    }
    output[id.x] = input[id.x] * input[id.x];
  }
`;

async function runSquare(): Promise<{ input: Float32Array; values: Float32Array; elapsedMs: number }> {
  if (!navigator.gpu) {
    throw new Error("このブラウザではWebGPUを利用できません。");
  }

  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) {
    throw new Error("利用可能なGPUを取得できませんでした。");
  }

  const device = await adapter.requestDevice();
  const input = new Float32Array([1, 2, 3, 4]);
  const byteLength = input.byteLength;
  const inputBuffer = device.createBuffer({
    size: byteLength,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
  });
  const outputBuffer = device.createBuffer({
    size: byteLength,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC
  });
  const readbackBuffer = device.createBuffer({
    size: byteLength,
    usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ
  });

  try {
    const startedAt = performance.now();
    device.queue.writeBuffer(inputBuffer, 0, input);

    const module = device.createShaderModule({ code: shaderCode });
    const pipeline = device.createComputePipeline({
      layout: "auto",
      compute: { module, entryPoint: "square" }
    });
    const bindGroup = device.createBindGroup({
      layout: pipeline.getBindGroupLayout(0),
      entries: [
        { binding: 0, resource: { buffer: inputBuffer } },
        { binding: 1, resource: { buffer: outputBuffer } }
      ]
    });

    const encoder = device.createCommandEncoder();
    const pass = encoder.beginComputePass();
    pass.setPipeline(pipeline);
    pass.setBindGroup(0, bindGroup);
    pass.dispatchWorkgroups(Math.ceil(input.length / 64));
    pass.end();
    encoder.copyBufferToBuffer(outputBuffer, 0, readbackBuffer, 0, byteLength);
    device.queue.submit([encoder.finish()]);

    await readbackBuffer.mapAsync(GPUMapMode.READ);
    const values = new Float32Array(readbackBuffer.getMappedRange().slice(0));
    readbackBuffer.unmap();
    return { input, values, elapsedMs: performance.now() - startedAt };
  } finally {
    inputBuffer.destroy();
    outputBuffer.destroy();
    readbackBuffer.destroy();
  }
}

runButton.addEventListener("click", async () => {
  runButton.disabled = true;
  output.value = "GPUで計算しています…";

  try {
    const { input, values, elapsedMs } = await runSquare();
    output.value = `入力: [${input.join(", ")}]\n結果: [${values.join(", ")}]\n実行時間: ${elapsedMs.toFixed(2)} ms（データ転送、GPU実行、結果読み戻しを含む）`;
    console.log(values);
  } catch (error) {
    output.value = error instanceof Error ? error.message : "GPU処理に失敗しました。";
  } finally {
    runButton.disabled = false;
  }
});
