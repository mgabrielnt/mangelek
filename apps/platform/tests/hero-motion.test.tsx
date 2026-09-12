import { setMedia } from "./setup.mjs";
import assert from "node:assert/strict";
import { test } from "node:test";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { useHeroInteraction } from "../src/components/home/hero/hooks/useHeroInteraction";

function Fixture() {
  const { scene, follow, reset } = useHeroInteraction();
  return <div ref={scene} id="scene"><button onFocus={() => follow(27.47)} onBlur={reset}>Education</button></div>;
}

test("Waiter follows keyboard focus, resets on blur, and honors reduced motion", async () => {
  const root = createRoot(document.getElementById("test-root")!);
  await act(() => root.render(<Fixture />));
  const scene = document.getElementById("scene")!;
  await act(() => scene.querySelector("button")!.focus());
  assert.equal(scene.dataset.engaged, "true");
  assert.ok(parseFloat(scene.style.getPropertyValue("--waiter-shift")) < 0);
  await act(() => document.getElementById("outside")!.focus());
  assert.equal(scene.style.getPropertyValue("--waiter-shift"), "");
  await act(() => setMedia("(prefers-reduced-motion: reduce)", true));
  await act(() => root.render(<Fixture />));
  await act(() => scene.querySelector("button")!.focus());
  assert.equal(scene.style.getPropertyValue("--waiter-shift"), "");
  await act(() => root.unmount());
});
