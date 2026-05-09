# Mock Data

I dati mock per **Palestra** sono in `src/assets/mock/` come file JSON statici.

## Struttura tipica

```
src/assets/mock/
├── info.json           # Anagrafica attività (nome, indirizzo, orari, contatti)
├── servizi.json        # Listino servizi/prodotti
├── team.json           # Team o staff
└── faq.json            # Domande frequenti
```

## Caricamento client-side

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MockDataService {
  private readonly http = inject(HttpClient);

  getInfo(): Observable<unknown> {
    return this.http.get('/assets/mock/info.json');
  }

  getServizi(): Observable<unknown> {
    return this.http.get('/assets/mock/servizi.json');
  }
}
```

## Caricamento SSR (server)

In modalità SSR il `HttpClient` con `provideHttpClient(withFetch())` funziona automaticamente sia client che server, leggendo i file dal filesystem in fase di prerender.

## Personalizzare i dati

1. Edita i JSON in `src/assets/mock/`
2. Aggiorna i tipi TypeScript in `src/app/data/types.ts` (se presenti)
3. Esegui `npm run build` per verificare il prerender

## Fonti dati Italia 2026

I dati mock sono curati su fonti pubbliche aggiornate maggio 2026:
- ISTAT (prezzi consumo)
- FIPE (ristorazione)
- Listini medi categoria (es. Superprof per palestre, Serenis per psicologi)

Per i 50 demo verticali Federico vedi `_RESEARCH_COMPETITOR_MOCK.md` nel piano master.
