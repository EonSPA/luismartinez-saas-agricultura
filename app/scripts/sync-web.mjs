/* Copia el dashboard web (../dashboard) a ./www antes de cap sync.
   Mantiene una sola fuente de verdad: el dashboard. */
import { cp, rm, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const src = resolve(here, "../../dashboard");
const dst = resolve(here, "../www");

await rm(dst, { recursive: true, force: true });
await mkdir(dst, { recursive: true });
await cp(src, dst, { recursive: true });
console.log(`Web copiada: ${src} -> ${dst}`);
