// On GitHub Pages the site is served under /portfolio. next/image with
// `unoptimized` does NOT prepend basePath to the src, so we add it ourselves.
// Locally (no basePath) this is a no-op.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBase(path: string): string {
  if (!path.startsWith("/")) return path;
  if (BASE_PATH && path.startsWith(BASE_PATH + "/")) return path; // already prefixed
  return `${BASE_PATH}${path}`;
}
