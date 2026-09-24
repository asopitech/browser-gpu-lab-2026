import * as THREE from "three/webgpu";
import "./style.css";

const host = document.querySelector<HTMLDivElement>("#canvas-host");
const status = document.querySelector<HTMLParagraphElement>("#status");

if (!host || !status) {
  throw new Error("画面の要素を取得できませんでした。");
}

const canvasHost = host;
const statusMessage = status;

const renderer = new THREE.WebGPURenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(640, 420);
canvasHost.append(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color("#09111f");

const camera = new THREE.PerspectiveCamera(45, 640 / 420, 0.1, 100);
camera.position.set(2.8, 2.1, 4.4);
camera.lookAt(0, 0, 0);

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1.6, 1.6, 1.6),
  new THREE.MeshStandardMaterial({ color: "#77a8ff", roughness: 0.38, metalness: 0.2 })
);
scene.add(cube);

const keyLight = new THREE.DirectionalLight("#ffffff", 2.8);
keyLight.position.set(3, 4, 4);
scene.add(keyLight);
scene.add(new THREE.AmbientLight("#8ba6d9", 1.3));

function resize(): void {
  const width = Math.max(280, canvasHost.clientWidth);
  const height = Math.round(width * 0.65625);
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

function render(): void {
  cube.rotation.x += 0.008;
  cube.rotation.y += 0.012;
  renderer.render(scene, camera);
}

async function start(): Promise<void> {
  try {
    await renderer.init();
    const backend = renderer.backend;
    const isWebGPU = "isWebGPUBackend" in backend && backend.isWebGPUBackend === true;
    statusMessage.textContent = isWebGPU
      ? "WebGPU を利用して描画中です。"
      : "WebGPUは利用できないため、WebGL 2へ切り替えて描画中です。";
    resize();
    renderer.setAnimationLoop(render);
    window.addEventListener("resize", resize);
  } catch (error) {
    statusMessage.textContent = `描画を開始できませんでした: ${error instanceof Error ? error.message : "不明なエラー"}`;
    renderer.dispose();
  }
}

void start();
