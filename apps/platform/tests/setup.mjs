import { JSDOM } from "jsdom";

const dom = new JSDOM("<!doctype html><body><div id='test-root'></div><button id='outside'>Outside</button></body>", { url: "https://mangelek.test/" });
export const { window } = dom;
for (const key of ["window", "document", "HTMLElement", "Element", "Node", "Event", "KeyboardEvent", "MouseEvent", "FocusEvent", "location", "history"]) {
  Object.defineProperty(globalThis, key, { value: window[key], configurable: true, writable: true });
}
const media = new Map();
export function mediaQuery(query) {
  if (!media.has(query)) {
    const value = new window.EventTarget();
    value.matches = false;
    value.media = query;
    value.addListener = (fn) => value.addEventListener("change", fn);
    value.removeListener = (fn) => value.removeEventListener("change", fn);
    media.set(query, value);
  }
  return media.get(query);
}
window.matchMedia = globalThis.matchMedia = mediaQuery;
window.requestAnimationFrame = (fn) => setTimeout(() => fn(performance.now()), 16);
window.cancelAnimationFrame = clearTimeout;
class Observer { observe() {} unobserve() {} disconnect() {} }
window.IntersectionObserver = globalThis.IntersectionObserver = Observer;
window.ResizeObserver = globalThis.ResizeObserver = Observer;
globalThis.getComputedStyle = window.getComputedStyle;
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
export function setMedia(query, matches) {
  const value = mediaQuery(query);
  value.matches = matches;
  value.dispatchEvent(new window.Event("change"));
}
