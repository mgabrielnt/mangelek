import { rmSync } from "node:fs";
import { resolve } from "node:path";

const generated = [".next/dev/types", ".next/types"];

for (const path of generated) {
  rmSync(resolve(process.cwd(), path), { recursive: true, force: true });
}
