import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';
import type { LivelloCorso, CategoriaCorso, Corso } from '../../data/types';

const LIVELLI: ReadonlyArray<LivelloCorso | 'tutti'> = [
  'tutti', 'Principiante', 'Intermedio', 'Avanzato', 'Tutti'
];

const GIORNI = ['tutti', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'] as const;
type GiornoFiltro = (typeof GIORNI)[number];

@Component({
  selector: 'app-corsi',
  standalone: true,
  imports: [NgFor, NgIf],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>I nostri corsi</h1>
        <p>10 discipline, 5 trainer certificati, orari flessibili mattina e sera.</p>
      </div>
    </section>

    <section class="filters demo-container">
      <div class="filter-group">
        <span class="filter-label">Livello</span>
        <div class="filter-pills" role="group" aria-label="Filtra per livello">
          <button
            *ngFor="let l of livelliVisibili"
            class="pill"
            [class.pill--active]="livelloAttivo() === l"
            (click)="setLivello(l)"
            [attr.aria-pressed]="livelloAttivo() === l"
          >
            {{ l === 'tutti' ? 'Tutti i livelli' : l }}
          </button>
        </div>
      </div>
      <div class="filter-group">
        <span class="filter-label">Giorno</span>
        <div class="filter-pills" role="group" aria-label="Filtra per giorno">
          <button
            *ngFor="let g of giorni"
            class="pill"
            [class.pill--active]="giornoAttivo() === g"
            (click)="setGiorno(g)"
            [attr.aria-pressed]="giornoAttivo() === g"
          >
            {{ g === 'tutti' ? 'Tutti i giorni' : g }}
          </button>
        </div>
      </div>
    </section>

    <article class="demo-container content">
      <p class="risultati-count" *ngIf="corsiFiltrati() as cf">
        {{ cf.length }} {{ cf.length === 1 ? 'corso trovato' : 'corsi trovati' }}
      </p>

      <ul class="corsi-grid">
        <li *ngFor="let corso of corsiFiltrati()" class="corso-card">
          <div class="corso-card__head">
            <div>
              <h2>{{ corso.nome }}</h2>
              <span class="categoria-tag">{{ categoriaLabel(corso.categoria) }}</span>
            </div>
            <span class="badge--livello" [attr.data-livello]="corso.livello">{{ corso.livello }}</span>
          </div>

          <p class="corso-card__desc">{{ corso.descrizione }}</p>

          <div class="corso-card__info">
            <span class="info-chip"><span aria-hidden="true">👤</span> {{ corso.istruttore }}</span>
            <span class="info-chip"><span aria-hidden="true">⏱</span> {{ corso.durata }} min</span>
            <span class="info-chip"><span aria-hidden="true">👥</span> Max {{ corso.postiMax }} posti</span>
          </div>

          <div class="corso-card__orari">
            <p class="orari-label">Orari settimanali:</p>
            <ul class="orari-list">
              <li *ngFor="let orario of corso.orari">{{ orario }}</li>
            </ul>
          </div>
        </li>
      </ul>

      <div *ngIf="corsiFiltrati().length === 0" class="empty-state">
        <p>Nessun corso corrisponde ai filtri selezionati.</p>
        <button class="btn btn-secondary" (click)="resetFiltri()">Rimuovi filtri</button>
      </div>
    </article>
  `,
  styles: [
    `
      .page-header {
        padding: 4rem 1rem 3rem;
        background: linear-gradient(180deg, #fff1f1 0%, var(--color-bg-subtle) 100%);
        text-align: center;
        border-bottom: 1px solid var(--color-border);
      }
      .page-header h1 {
        margin: 0 0 0.5rem;
        font-size: 2rem;
      }
      .page-header p {
        color: var(--color-fg-muted);
        margin: 0;
      }
      .filters {
        padding: 2rem 1rem;
        border-bottom: 1px solid var(--color-border);
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .filter-group {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex-wrap: wrap;
      }
      .filter-label {
        font-size: 0.8rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--color-fg-muted);
        min-width: 60px;
      }
      .filter-pills {
        display: flex;
        gap: 0.4rem;
        flex-wrap: wrap;
      }
      .pill {
        padding: 0.3rem 0.85rem;
        border: 1px solid var(--color-border);
        border-radius: 9999px;
        background: #ffffff;
        font-size: 0.85rem;
        cursor: pointer;
        color: var(--color-fg-muted);
        transition: all 0.12s ease;
      }
      .pill:hover {
        border-color: var(--color-accent);
        color: var(--color-accent);
      }
      .pill--active {
        background: var(--color-accent);
        border-color: var(--color-accent);
        color: #ffffff;
        font-weight: 600;
      }
      .content {
        padding: 2rem 1rem 4rem;
      }
      .risultati-count {
        font-size: 0.85rem;
        color: var(--color-fg-muted);
        margin: 0 0 1.5rem;
      }
      .corsi-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 1.5rem;
      }
      .corso-card {
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        padding: 1.5rem;
        background: #ffffff;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .corso-card__head {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 0.5rem;
      }
      .corso-card__head h2 {
        margin: 0 0 0.25rem;
        font-size: 1.2rem;
      }
      .categoria-tag {
        font-size: 0.75rem;
        color: var(--color-fg-muted);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .badge--livello {
        font-size: 0.7rem;
        padding: 0.25rem 0.65rem;
        border-radius: 9999px;
        font-weight: 700;
        white-space: nowrap;
        flex-shrink: 0;
        background: #fee2e2;
        color: var(--color-accent);
      }
      .badge--livello[data-livello="Tutti"] {
        background: #dcfce7;
        color: var(--color-success);
      }
      .badge--livello[data-livello="Principiante"] {
        background: #dbeafe;
        color: #1d4ed8;
      }
      .badge--livello[data-livello="Avanzato"] {
        background: #fee2e2;
        color: var(--color-accent);
      }
      .badge--livello[data-livello="Intermedio"] {
        background: #fef9c3;
        color: #854d0e;
      }
      .corso-card__desc {
        color: var(--color-fg-muted);
        font-size: 0.9rem;
        margin: 0;
        line-height: 1.6;
      }
      .corso-card__info {
        display: flex;
        gap: 0.75rem;
        flex-wrap: wrap;
      }
      .info-chip {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        font-size: 0.82rem;
        color: var(--color-fg-muted);
        background: var(--color-bg-subtle);
        padding: 0.2rem 0.6rem;
        border-radius: var(--radius-sm);
      }
      .corso-card__orari {
        border-top: 1px dashed var(--color-border);
        padding-top: 0.75rem;
      }
      .orari-label {
        margin: 0 0 0.5rem;
        font-size: 0.78rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--color-fg-muted);
      }
      .orari-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 0.4rem;
        flex-wrap: wrap;
      }
      .orari-list li {
        font-size: 0.78rem;
        background: var(--color-bg-subtle);
        border: 1px solid var(--color-border);
        padding: 0.2rem 0.5rem;
        border-radius: var(--radius-sm);
        color: var(--color-fg-default);
      }
      .empty-state {
        text-align: center;
        padding: 3rem;
        color: var(--color-fg-muted);
      }
      .btn {
        display: inline-block;
        padding: 0.6rem 1.25rem;
        border-radius: var(--radius-md);
        font-weight: 600;
        font-size: 0.95rem;
        cursor: pointer;
      }
      .btn-secondary {
        background: #ffffff;
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CorsiComponent {
  private readonly mockData = inject(MockDataService);

  private readonly tuttiCorsi = toSignal(
    this.mockData.corsi$.pipe(map((d) => d.corsi)),
    { initialValue: [] as Corso[] }
  );

  readonly livelloAttivo = signal<LivelloCorso | 'tutti'>('tutti');
  readonly giornoAttivo = signal<GiornoFiltro>('tutti');

  readonly livelliVisibili = LIVELLI;
  readonly giorni = GIORNI;

  readonly corsiFiltrati = computed(() => {
    const corsi = this.tuttiCorsi();
    const livello = this.livelloAttivo();
    const giorno = this.giornoAttivo();

    return corsi.filter((c) => {
      const passaLivello = livello === 'tutti' || c.livello === livello;
      const passaGiorno =
        giorno === 'tutti' || c.orari.some((o) => o.startsWith(giorno));
      return passaLivello && passaGiorno;
    });
  });

  setLivello(livello: LivelloCorso | 'tutti'): void {
    this.livelloAttivo.set(livello);
  }

  setGiorno(giorno: GiornoFiltro): void {
    this.giornoAttivo.set(giorno);
  }

  resetFiltri(): void {
    this.livelloAttivo.set('tutti');
    this.giornoAttivo.set('tutti');
  }

  categoriaLabel(cat: CategoriaCorso): string {
    const labels: Record<CategoriaCorso, string> = {
      cardio: 'Cardio',
      functional: 'Functional',
      'mente-corpo': 'Mente & Corpo',
      tonificazione: 'Tonificazione',
      recupero: 'Recupero'
    };
    return labels[cat] ?? cat;
  }
}
