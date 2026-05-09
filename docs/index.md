---
layout: home

hero:
  name: "Demo Palestra"
  text: "Template Angular 21 SSR"
  tagline: "Sito vetrina pre-configurato con dati mock realistici per PMI italiane"
  actions:
    - theme: brand
      text: Demo live
      link: https://palestra.demo.federicocalo.dev
    - theme: alt
      text: Source code
      link: https://github.com/fedcal/demo-palestra

features:
  - icon: 🅰️
    title: Angular 21 SSR
    details: "Server-Side Rendering nativo con `outputMode: server` e prerender route statiche per SEO ottimale."
  - icon: 📊
    title: Mock data realistici
    details: "Dati Italia 2026 (menu, listini, orari, prezzi medi) curati per il verticale Palestra."
  - icon: 🚀
    title: Deploy automatico
    details: "Vercel per il sito demo (SSR runtime) + GitHub Pages per la documentazione (VitePress)."
  - icon: 🔍
    title: SEO ready
    details: "JSON-LD schema.org, meta tag dinamici, Open Graph, sitemap auto-generata."
  - icon: ⚡
    title: Performance
    details: "Lighthouse target ≥90 SEO + ≥85 Performance + ≥95 Best Practices."
  - icon: 🎨
    title: Customizable
    details: "Design tokens CSS Custom Properties, light theme stile GitHub Primer."
---

## Introduzione

Questo repository contiene il template **Angular 21 SSR** per un sito web professionale per **Palestra** in Italia.

Sviluppato come parte dell'ecosistema demo `federicocalo.dev/demo/`, il progetto è open-source (MIT) e può essere usato come base per:

- Showcase tecnico per vendita servizi web Federico Calò
- Punto di partenza per developer/agency che customizzano per cliente PMI italiana
- Riferimento didattico per pattern Angular 21 SSR + SEO + i18n

## Perché questo template

Il mercato italiano delle PMI per **Palestra** ha caratteristiche specifiche:

- **Pain comuni**: prenotazioni telefoniche, sito obsoleto/assente, no SEO locale, lock-in SaaS verticali costosi
- **Differenziatori**: sito proprio (no commission OTA), AI on-prem (Ollama), performance Lighthouse 90+
- **Pricing tier Federico**: Base €500-800 (statico), Intermedio €1.500-2.200 (CMS+SEO), Avanzato €4.000-6.000 (AI+booking+area riservata)

## Stack

| Layer | Scelta |
|---|---|
| Framework | Angular 21.2.x SSR standalone |
| Build | `outputMode: server` + prerender |
| Node | 22 LTS |
| Style | CSS scoped + design tokens |
| State | Signals + services |
| Mock data | JSON statici `src/assets/mock/` |
| Routing | Standalone routes |
| Forms | Reactive Forms |
| Hosting demo | Vercel (`fra1` EU) |
| Hosting docs | GitHub Pages (VitePress) |

## Quick start

```bash
git clone https://github.com/fedcal/demo-palestra.git
cd demo-palestra
npm install
npm start
# → http://localhost:4200
```

Per build SSR locale:
```bash
npm run build
npm run serve:ssr:palestra
# → http://localhost:4000
```

## Riferimenti

- [federicocalo.dev](https://federicocalo.dev) — Portfolio principale
- [federicocalo.dev/demo](https://federicocalo.dev/demo) — Hub demos completo
- [GitHub repo](https://github.com/fedcal/demo-palestra)
