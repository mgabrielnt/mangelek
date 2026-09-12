import type { GlobeArc } from "@/data/contact-globe";
import { createGlobe } from "./create-globe";

export async function createGlobeScene(host: HTMLDivElement, arcs: GlobeArc[]) {
  const THREE = await import("three");
  const [{ OrbitControls }, globe] = await Promise.all([
    import("three/addons/controls/OrbitControls.js"),
    createGlobe(arcs),
  ]);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);
  host.replaceChildren(renderer.domElement);

  const scene = new THREE.Scene();
  const key = new THREE.DirectionalLight(0xc9dbef, 3.5);
  const fill = new THREE.DirectionalLight(0xd7b779, 1.45);
  key.position.set(-120, 90, 150);
  fill.position.set(120, -35, 85);
  scene.add(globe, new THREE.AmbientLight(0xcad6e5, 2.15), key, fill);

  const camera = new THREE.PerspectiveCamera(40, 1, .1, 1000);
  camera.position.z = 275;
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = false;
  controls.enableZoom = false;
  controls.enableDamping = true;
  controls.dampingFactor = .06;
  controls.autoRotate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  controls.autoRotateSpeed = .42;

  const resize = () => {
    const width = Math.max(1, host.clientWidth);
    const height = Math.max(1, host.clientHeight);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  resize();

  let frame = 0;
  const render = () => {
    controls.update();
    renderer.render(scene, camera);
    frame = requestAnimationFrame(render);
  };
  render();

  return () => {
    cancelAnimationFrame(frame);
    observer.disconnect();
    controls.dispose();
    renderer.dispose();
    host.replaceChildren();
  };
}