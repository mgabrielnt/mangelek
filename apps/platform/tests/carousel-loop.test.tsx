import assert from "node:assert/strict";
import { test } from "node:test";
import { carouselFixture } from "./carousel-fixture.mjs";

for (const width of [320, 768, 1440, 3840]) {
  test(`Carousel wraps both edges repeatedly at ${width}px simulated geometry`, () => {
    const { api, destroy } = carouselFixture(width);
    try {
      assert.equal(api.internalEngine().options.loop, true);
      assert.equal(api.slideNodes().length, 6);
      api.scrollTo(5, true);
      api.scrollNext(true);
      assert.equal(api.selectedScrollSnap(), 0);
      api.scrollPrev(true);
      assert.equal(api.selectedScrollSnap(), 5);
      for (let index = 0; index < 24; index++) api.scrollNext(true);
      assert.equal(api.selectedScrollSnap(), 5);
      for (let index = 0; index < 24; index++) api.scrollPrev(true);
      assert.equal(api.selectedScrollSnap(), 5);
    } finally { destroy(); }
  });
}
