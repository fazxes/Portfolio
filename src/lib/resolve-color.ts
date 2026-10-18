/**
 * Resolve any CSS color, including `var(--token)` and `oklch()`, to RGB for
 * canvas drawing. Browser only.
 */
export function resolveRgb(color: string): [number, number, number] {
  const probe = document.createElement("div");
  probe.style.color = color;
  probe.style.display = "none";
  document.body.appendChild(probe);
  const computed = getComputedStyle(probe).color;
  probe.remove();

  // `computed` may be oklch() or similar; a 1px canvas normalizes it to RGB.
  const ctx = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
  if (!ctx) {return [0, 0, 0];}
  ctx.fillStyle = computed;
  ctx.fillRect(0, 0, 1, 1);
  const [r = 0, g = 0, b = 0] = ctx.getImageData(0, 0, 1, 1).data;
  return [r, g, b];
}
