# Customization

## Cambiare i dati mock

Edita i file in `src/assets/mock/`. Vedi [Mock Data](/mock-data).

## Cambiare i colori

I design tokens sono in `src/styles.css`:

```css
:root {
  --color-accent: #0969da;        /* Cambia qui per il colore primario */
  --color-bg-default: #ffffff;
  --color-fg-default: #1f2328;
  /* ... */
}
```

## Cambiare il logo

Sostituisci `public/favicon.ico` e aggiungi il logo SVG in `public/logo.svg`.

## Aggiungere route

1. Crea il componente in `src/app/pages/{nome}/`
2. Aggiungi la route in `src/app/app.routes.ts`:

```typescript
{
  path: 'servizi',
  loadComponent: () => import('./pages/servizi/servizi.component').then((m) => m.ServiziComponent),
  title: 'Servizi — Palestra'
}
```

## Cambiare i metadati SEO

Edita `src/index.html` per:
- `<title>` globale
- `<meta name="description">`
- Open Graph

Per metadati per-route usa `Title` e `Meta` di `@angular/platform-browser`.

## Disabilitare il prerender

In `angular.json`:

```json
"prerender": false
```

In questo caso il sito gira solo in modalità SSR runtime (più lento al cold start, più dinamico).

## Possibili sviluppi customizzabili

Oltre ai Tier standard, il template Palestra supporta queste integrazioni su richiesta:

1. **AI Workout Recommender**: LLM locale (Ollama llama3.1:8b) suggerisce esercizi in base a goal, età, infortuni
2. **Gamification**: Badge milestone (primo mese, 10 lezioni, nuovo PR), leaderboard settimanale, sistema punti
3. **Wearable sync**: Apple Health, Garmin, Fitbit API per sincronizzazione automatica HR, steps, distanza
4. **App mobile**: React Native per iOS/Android con offline support, timer esercizi, progress tracking
5. **Schede allenamento PDF**: Generazione dinamica in base a profilo cliente (principiante/intermedio/avanzato)
6. **Video esercizi**: Integrazione libreria cloud con streaming illimitato su abbonamento
7. **Analytics dashboard**: Revenue per corso, retention rate, client lifetime value, heatmap presenze
8. **Multi-sede**: Riepilogo consolidato fatturato, gestione abbonamenti per filiale, dashboard franchisee

Contatta Federico per valutazione effort e pricing addon su misura.

---

## White-label per cliente

1. Fork del repo o copia in nuova cartella
2. Sostituisci `palestra` con nome cliente (`acme-fitness`)
3. Sostituisci footer rimuovendo riferimento a Federico (modifica `footer.component.ts`)
4. Personalizza `vercel.json` con domain custom cliente
5. Deploy su Vercel cliente con loro account
