import "./setup.mjs";
import { createRequire } from "node:module";

const localRequire = createRequire(import.meta.url);
const carouselRequire = createRequire(localRequire.resolve("embla-carousel-react"));
const EmblaCarousel = carouselRequire("embla-carousel");
export function carouselFixture(screenWidth) {
  const viewport = document.createElement("div");
  const track = document.createElement("div");
  const width = Math.min(screenWidth, 1600);
  const card = screenWidth <= 700 ? Math.min(screenWidth * .78, 360) : Math.min(Math.max(280, screenWidth * .29), 390);
  const gap = screenWidth <= 700 ? 12 : 20;
  const size = (node, left, w) => Object.defineProperties(node, {
    offsetLeft: { value: left }, offsetTop: { value: 0 },
    offsetWidth: { value: w }, offsetHeight: { value: 400 },
  });
  size(viewport, 0, width); size(track, 0, width);
  viewport.append(track); document.body.append(viewport);
  for (let index = 0; index < 6; index++) {
    const slide = document.createElement("article");
    slide.style.marginRight = `${gap}px`;
    size(slide, index * (card + gap), card); track.append(slide);
  }
  const api = EmblaCarousel(viewport, { loop: true, align: "center", startIndex: 2,
    watchDrag: false, watchResize: false, watchSlides: false, watchFocus: false });
  return { api, destroy: () => { api.destroy(); viewport.remove(); } };
}
