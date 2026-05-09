# Deployment

Questo template ha una **strategia dual-track**:
- **Vercel** ospita il sito demo eseguibile (SSR runtime)
- **GitHub Pages** ospita questa documentazione (VitePress statico)

## Vercel — Live demo

URL: `https://palestra.demo.federicocalo.dev`

### Setup iniziale (una volta sola)

1. Connetti il repo a Vercel:
   ```bash
   npm install -g vercel
   vercel login
   vercel link
   ```

2. Aggiungi custom domain in Vercel Dashboard:
   - Settings > Domains > Add `palestra.demo.federicocalo.dev`
   - Vercel verifica SSL via Let's Encrypt (NS delegation `demo.federicocalo.dev` → Vercel nameservers)

3. Aggiungi GitHub Secrets per CI:
   - `VERCEL_TOKEN` (Vercel Dashboard > Settings > Tokens)
   - `VERCEL_ORG_ID` e `VERCEL_PROJECT_ID` (da `.vercel/project.json`)

### Deploy automatico

Push su `main` → workflow `.github/workflows/vercel-prod.yml` deploya automaticamente.

In alternativa, basta connettere il repo alla **Vercel GitHub App** (Vercel Dashboard) per deploy auto senza workflow esplicito.

### Configurazione Vercel

`vercel.json` configura:
- Build command: `npm run build`
- Output directory: `dist/palestra/browser`
- Region: `fra1` (Frankfurt EU)
- Serverless function: `api/index.js` con runtime Node 20
- Cache headers: 1 anno per asset hashati
- Security headers: X-Content-Type-Options, X-Frame-Options, Referrer-Policy

## GitHub Pages — Documentation

URL: `https://fedcal.github.io/demo-palestra/`

### Setup iniziale

1. Repo Settings > Pages > Source: **GitHub Actions**
2. Push qualsiasi modifica in `docs/**` → workflow `.github/workflows/docs.yml` builda VitePress e deploya

### Configurazione VitePress

`docs/.vitepress/config.ts`:
- `base: /demo-palestra/` (subdirectory GH Pages)
- `cleanUrls: true`
- Search locale integrato
- Sidebar + nav configurati

### Custom domain (opzionale)

Per usare `palestra-docs.federicocalo.dev` invece del subdirectory:

1. Cloudflare DNS aggiungi CNAME:
   ```
   palestra-docs    CNAME    fedcal.github.io    (proxy OFF)
   ```
2. Repo Settings > Pages > Custom domain: `palestra-docs.federicocalo.dev`
3. Modifica `docs/.vitepress/config.ts` `base: '/'`
4. Crea file `docs/CNAME` con il dominio

## Local SSR test

Verifica build SSR locale:
```bash
npm run build
npm run serve:ssr:palestra
# → http://localhost:4000
```

## Troubleshooting

### Vercel: build fail "function exceeds 250MB"
Limita prerender in `angular.json`:
```json
"prerender": { "discoverRoutes": false, "routes": ["/", "/contatti"] }
```

### GH Pages: 404 su deep link
Verifica `404.html` copy nel workflow `docs.yml`. Per Angular SPA routing senza prerender, copia `index.html` come `404.html`.

### Vercel: SSL handshake error custom domain
Verifica che Cloudflare proxy sia **OFF** (cloud grigio) per il record CNAME/NS verso Vercel. Cloudflare proxy + Vercel SSL non sono compatibili.
