import type { MeshPhongMaterial } from "three";
import type { GlobeArc } from "@/data/contact-globe";

export async function createGlobeScene(host: HTMLDivElement, arcs: GlobeArc[]) {
  const THREE = await import("three");
  const [{ default: ThreeGlobe }, { OrbitControls }] = await Promise.all([
    import("three-globe"),
    import("three/addons/controls/OrbitControls.js"),
  ]);

  const globe = new ThreeGlobe()
    .arcsData(arcs)
    .arcStartLat("startLat").arcStartLng("startLng")
    .arcEndLat("endLat").arcEndLng("endLng")
    .arcAltitude("arcAlt").arcColor("color")
    .arcStroke(.45).arcDashLength(.42).arcDashGap(.3)
    .arcDashAnimateTime(1900).showAtmosphere(true)
    .atmosphereColor("#8fa8c7").atmosphereAltitude(.14);

  const material = globe.globeMaterial() as MeshPhongMaterial;
  material.color.set("#0f1722");
  material.emissive.set("#07101a");
  material.emissiveIntensity = .48;
  material.shininess = 18;
  globe.rotation.set(.08, -1.84, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);
  host.replaceChildren(renderer.domElement);

  const scene = new THREE.Scene();
  scene.add(globe, new THREE.AmbientLight(0xc9d4e2, 2.2));
  const key = new THREE.DirectionalLight(0xc4d7ee, 3.4);
  const fill = new THREE.DirectionalLight(0xd6b37b, 1.6);
  key.position.set(-120, 90, 150); fill.position.set(110, -30, 90);
  scene.add(key, fill);

  const camera = new THREE.PerspectiveCamera(42, 1, .1, 1000);
  camera.position.z = 300;
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = false; controls.enableZoom = false;
  controls.enableDamping = true; controls.dampingFactor = .06;
  controls.autoRotate = true; controls.autoRotateSpeed = .55;

  const resize = () => {
    const width = Math.max(1, host.clientWidth);
    const height = Math.max(1, host.clientHeight);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(host); resize();

  let frame = 0;
  const render = () => { controls.update(); renderer.render(scene, camera); frame = requestAnimationFrame(render); };
  render();

  return () => { cancelAnimationFrame(frame); observer.disconnect(); controls.dispose(); renderer.dispose(); host.replaceChildren(); };
}
