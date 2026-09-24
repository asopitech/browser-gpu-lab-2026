import fs from "node:fs/promises";
import loader from "@assemblyscript/loader";

const wasm = await fs.readFile(new URL("../build/math.wasm", import.meta.url));
const instance = await loader.instantiate(wasm, {});
const values = new Float64Array([1.5, 2.25, 4.75, 8.5]);
const pointer = instance.exports.__new(values.byteLength, 0);
new Float64Array(instance.exports.memory.buffer, pointer, values.length).set(values);
const total = instance.exports.sum(pointer, values.length);
console.log(`入力: [${values.join(", ")}]`);
console.log(`合計: ${total}`);
instance.exports.__pin(pointer);
instance.exports.__unpin(pointer);
