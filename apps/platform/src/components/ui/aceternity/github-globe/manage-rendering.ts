import type { Camera, Scene, WebGLRenderer } from "three";
import type { OrbitControls } from "three/addons/controls/OrbitControls.js";
import type ThreeGlobe from "three-globe";

type View = { host: HTMLDivElement; renderer: WebGLRenderer; scene: Scene;
  camera: Camera; controls: OrbitControls; globe: ThreeGlobe };

export function manageRendering({ host, renderer, scene, camera, controls, globe }: View) {
  const preference = matchMedia("(prefers-reduced-motion: reduce)");
  let visible = false;
  let frame = 0;
  const draw = () => {
    controls.update();
    renderer.render(scene, camera);
    host.dataset.globe = "ready";
    frame = preference.matches ? 0 : requestAnimationFrame(draw);
  };
  const sync = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    const running = visible && !document.hidden;
    controls.autoRotate = !preference.matches;
    controls.enableDamping = !preference.matches;
    globe.arcDashAnimateTime(preference.matches ? 0 : 1900);
    if (running && !preference.matches) globe.resumeAnimation();
    else globe.pauseAnimation();
    host.dataset.globeMotion = running && !preference.matches ? "running" : "paused";
    if (running) frame = requestAnimationFrame(draw);
  };
  const change = () => { if (preference.matches && visible) renderer.render(scene, camera); };
  const observer = new IntersectionObserver(([entry]) => {
    visible = !!entry?.isIntersecting;
    sync();
  });
  observer.observe(host);
  controls.addEventListener("change", change);
  preference.addEventListener("change", sync);
  document.addEventListener("visibilitychange", sync);
  return () => {
    cancelAnimationFrame(frame);
    globe.pauseAnimation();
    observer.disconnect();
    controls.removeEventListener("change", change);
    preference.removeEventListener("change", sync);
    document.removeEventListener("visibilitychange", sync);
  };
}
