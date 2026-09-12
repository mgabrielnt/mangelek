import { window } from "./setup.mjs";
import assert from "node:assert/strict";
import { test } from "node:test";
import { act } from "react";
import { createRoot } from "react-dom/client";
import type { UseEmblaCarouselType } from "embla-carousel-react";
import { useTemplateAnchor } from "../src/components/home/templates/hooks/useTemplateAnchor";

test("Category anchors select a card, reset native overflow, and handle repeated links", async () => {
  const viewport = document.createElement("div");
  viewport.scrollLeft = 80;
  let selected = -1;
  let scrolls = 0;
  const api = { rootNode: () => viewport, scrollTo: (index: number) => { selected = index; } } as UseEmblaCarouselType[1];
  function Fixture() {
    useTemplateAnchor(api);
    return <><section id="templates" ref={(node) => {
      if (node) node.scrollIntoView = () => { scrolls++; };
    }} /><a href="#template-company" id="category-link">Company</a></>;
  }
  history.replaceState(null, "", "#template-company");
  const root = createRoot(document.getElementById("test-root")!);
  await act(() => root.render(<Fixture />));
  assert.equal(selected, 2);
  assert.equal(viewport.scrollLeft, 0);
  selected = 5;
  await act(() => document.getElementById("category-link")!.click());
  assert.equal(selected, 2);
  assert.equal(scrolls, 2);
  history.replaceState(null, "", "#template-service");
  await act(() => window.dispatchEvent(new window.HashChangeEvent("hashchange")));
  assert.equal(selected, 0);
  await act(() => root.unmount());
});
