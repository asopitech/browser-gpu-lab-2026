import fs from "node:fs/promises";
import { WASI } from "node:wasi";

const wasm = await fs.readFile(new URL("../_build/wasm/release/build/cmd/main/main.wasm", import.meta.url));
const wasi = new WASI({ version: "preview1" });
const { instance } = await WebAssembly.instantiate(wasm, wasi.getImportObject());
wasi.start(instance);
