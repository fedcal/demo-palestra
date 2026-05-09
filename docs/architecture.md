# Architettura

## Struttura cartelle

```
demo-palestra/
├── api/
│   └── index.js              # Vercel serverless function entry SSR
├── docs/                     # VitePress docs site (questo sito)
├── public/                   # Static assets pubblici
├── src/
│   ├── app/
│   │   ├── app.config.ts
│   │   ├── app.config.server.ts
│   │   ├── app.routes.ts
│   │   ├── app.routes.server.ts
│   │   ├── app.component.ts
│   │   ├── shared/
│   │   │   └── footer/       # Footer "Demo di Federico Calò"
│   │   └── pages/
│   │       └── home/
│   ├── assets/mock/          # Dati mock JSON
│   ├── index.html
│   ├── main.ts
│   ├── main.server.ts
│   ├── server.ts
│   └── styles.css
├── angular.json
├── package.json
├── tsconfig.json
└── vercel.json
```

## SSR config

Angular 21 con `@angular/build:application` builder. Modalità:

- **`outputMode: "server"`** — produce sia `dist/palestra/browser/` (statico) sia `dist/palestra/server/server.mjs` (Node)
- **`prerender: { discoverRoutes: true }`** — pre-renderizza tutte le route discoverable a build-time
- **Hydration**: `provideClientHydration(withEventReplay())` — riprende eventi accumulati prima dell'idratazione

## Render Mode per route

`src/app/app.routes.server.ts`:

```typescript
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '**', renderMode: RenderMode.Prerender }
];
```

Modalità disponibili:
- `RenderMode.Prerender` — HTML statico build-time (route note, traffico alto)
- `RenderMode.Server` — SSR runtime (route dinamiche, dati personalizzati)
- `RenderMode.Client` — solo CSR (no SSR, route protette/admin)

## Footer condiviso

`src/app/shared/footer/footer.component.ts` — standalone component riutilizzato in tutti i 50 demo Federico. Contiene:

- Riferimento brand "Demo di Federico Calò"
- Link `federicocalo.dev`
- Link documentazione (questo sito VitePress)
- Link source code GitHub
- Disclaimer legale: "Sito vetrina con dati mock, non operativo"

## Mock data

`src/assets/mock/*.json` — file statici importati via `HttpClient` o `fetch` lato client, oppure via direct `import` lato server (SSR). Vedi pagina [Mock Data](/mock-data) per la struttura specifica di Palestra.
