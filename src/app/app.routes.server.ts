import { RenderMode, ServerRoute } from '@angular/ssr';

// All routes use SSR (rendered at request time, not build time).
// Build-time prerendering would require a mock HTTP server to serve
// /assets/mock/*.json during the worker build step — not available in this setup.
export const serverRoutes: ServerRoute[] = [
  { path: '**', renderMode: RenderMode.Server }
];
