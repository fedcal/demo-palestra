import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';

interface Stat {
  valore: string;
  etichetta: string;
  icona: string;
}

interface Feature {
  icona: string;
  titolo: string;
  testo: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="hero">
      <div class="demo-container">
        <p class="hero-eyebrow">Forge Fitness — Torino</p>
        <h1>Train hard.<br />Live strong.</h1>
        <p class="hero-tagline">CrossFit, Functional, Spinning, Yoga. La palestra che si adatta al tuo ritmo, 7 giorni su 7.</p>
        <div class="hero-actions">
          <a routerLink="/prenota" class="btn btn-primary">Prima sessione GRATIS</a>
          <a routerLink="/corsi" class="btn btn-secondary">Esplora i corsi</a>
        </div>
      </div>
    </section>

    <section class="stats-bar">
      <div class="demo-container">
        <ul class="stats-list">
          <li *ngFor="let stat of stats" class="stat-item">
            <span class="stat-icon" aria-hidden="true">{{ stat.icona }}</span>
            <span class="stat-valore">{{ stat.valore }}</span>
            <span class="stat-label">{{ stat.etichetta }}</span>
          </li>
        </ul>
      </div>
    </section>

    <section class="features demo-container">
      <h2>Perché scegliere Forge Fitness</h2>
      <ul class="feature-grid">
        <li *ngFor="let f of features">
          <span class="feature-icon" aria-hidden="true">{{ f.icona }}</span>
          <h3>{{ f.titolo }}</h3>
          <p>{{ f.testo }}</p>
        </li>
      </ul>
    </section>

    <section class="featured demo-container" *ngIf="featuredCorsi$ | async as corsi">
      <div class="section-header">
        <h2>I corsi del momento</h2>
        <a routerLink="/corsi" class="link-more">Tutti i corsi →</a>
      </div>
      <ul class="corso-grid">
        <li *ngFor="let corso of corsi" class="corso-card">
          <div class="corso-card__header">
            <h3>{{ corso.nome }}</h3>
            <span class="badge badge--livello" [attr.data-livello]="corso.livello">{{ corso.livello }}</span>
          </div>
          <p class="corso-card__desc">{{ corso.descrizione }}</p>
          <div class="corso-card__meta">
            <span class="corso-meta-item">
              <span aria-hidden="true">👤</span> {{ corso.istruttore }}
            </span>
            <span class="corso-meta-item">
              <span aria-hidden="true">⏱</span> {{ corso.durata }} min
            </span>
          </div>
          <ul class="corso-card__orari">
            <li *ngFor="let orario of corso.orari.slice(0, 3)">{{ orario }}</li>
          </ul>
        </li>
      </ul>
    </section>

    <section class="cta-band">
      <div class="demo-container">
        <h2>La prima sessione è sempre gratuita</h2>
        <p>Vieni a scoprire Forge Fitness senza impegno. Un trainer ti accoglierà e ti mostrerà tutto.</p>
        <div class="hero-actions">
          <a routerLink="/prenota" class="btn btn-primary">Prenota ora</a>
          <a routerLink="/abbonamenti" class="btn btn-secondary-light">Vedi i prezzi</a>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .hero {
        padding: 5rem 1rem;
        text-align: center;
        background: linear-gradient(180deg, #fff1f1 0%, #ffffff 100%);
        border-bottom: 1px solid var(--color-border);
      }
      .hero-eyebrow {
        font-size: 0.85rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--color-accent);
        margin: 0 0 0.75rem;
      }
      .hero h1 {
        font-size: clamp(2.5rem, 6vw, 4rem);
        margin: 0 0 1rem;
        line-height: 1.1;
        font-weight: 800;
        color: var(--color-fg-default);
      }
      .hero-tagline {
        font-size: 1.15rem;
        color: var(--color-fg-muted);
        margin: 0 0 2.5rem;
        max-width: 560px;
        margin-left: auto;
        margin-right: auto;
      }
      .hero-actions {
        display: flex;
        gap: 0.75rem;
        justify-content: center;
        flex-wrap: wrap;
      }
      .btn {
        display: inline-block;
        padding: 0.75rem 1.75rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 700;
        font-size: 1rem;
        transition: all 0.15s ease;
        border: none;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #ffffff;
      }
      .btn-primary:hover {
        background: var(--color-accent-hover);
        text-decoration: none;
      }
      .btn-secondary {
        background: #ffffff;
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
      .btn-secondary:hover {
        background: var(--color-bg-subtle);
        text-decoration: none;
      }
      .btn-secondary-light {
        background: rgba(255,255,255,0.15);
        color: #ffffff;
        border: 1px solid rgba(255,255,255,0.35);
      }
      .btn-secondary-light:hover {
        background: rgba(255,255,255,0.25);
        text-decoration: none;
      }

      /* Stats bar */
      .stats-bar {
        background: var(--color-fg-default);
        color: #ffffff;
        padding: 0;
      }
      .stats-list {
        list-style: none;
        margin: 0;
        padding: 2rem 1rem;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: 1rem;
        text-align: center;
      }
      .stat-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.25rem;
      }
      .stat-icon {
        font-size: 1.75rem;
      }
      .stat-valore {
        font-size: 1.75rem;
        font-weight: 800;
        color: var(--color-accent);
        line-height: 1;
      }
      .stat-label {
        font-size: 0.8rem;
        color: rgba(255,255,255,0.7);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      /* Features */
      .features {
        padding: 5rem 1rem;
      }
      .features h2 {
        text-align: center;
        margin-bottom: 2.5rem;
        font-size: 1.75rem;
      }
      .feature-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
      }
      .feature-grid li {
        text-align: center;
        padding: 1.5rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-lg);
      }
      .feature-icon {
        font-size: 2.5rem;
        display: block;
        margin-bottom: 0.75rem;
      }
      .feature-grid h3 {
        margin: 0 0 0.5rem;
        font-size: 1.05rem;
      }
      .feature-grid p {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.9rem;
      }

      /* Featured corsi */
      .featured {
        padding: 5rem 1rem;
      }
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      .section-header h2 {
        margin: 0;
        font-size: 1.75rem;
      }
      .link-more {
        color: var(--color-accent);
        text-decoration: none;
        font-weight: 600;
        font-size: 0.95rem;
      }
      .link-more:hover {
        text-decoration: underline;
      }
      .corso-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.25rem;
      }
      .corso-card {
        background: var(--color-bg-subtle);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        padding: 1.5rem;
      }
      .corso-card__header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 0.75rem;
        gap: 0.5rem;
      }
      .corso-card__header h3 {
        margin: 0;
        font-size: 1.15rem;
      }
      .badge--livello {
        font-size: 0.7rem;
        padding: 0.2rem 0.6rem;
        border-radius: 9999px;
        font-weight: 700;
        white-space: nowrap;
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
      .corso-card__desc {
        color: var(--color-fg-muted);
        font-size: 0.9rem;
        margin: 0 0 1rem;
        line-height: 1.5;
      }
      .corso-card__meta {
        display: flex;
        gap: 1rem;
        margin-bottom: 0.75rem;
        font-size: 0.85rem;
        color: var(--color-fg-muted);
      }
      .corso-meta-item {
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }
      .corso-card__orari {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 0.4rem;
        flex-wrap: wrap;
      }
      .corso-card__orari li {
        font-size: 0.75rem;
        background: #ffffff;
        border: 1px solid var(--color-border);
        padding: 0.2rem 0.5rem;
        border-radius: var(--radius-sm);
        color: var(--color-fg-muted);
      }

      /* CTA band */
      .cta-band {
        padding: 5rem 1rem;
        background: var(--color-accent);
        text-align: center;
      }
      .cta-band h2 {
        margin: 0 0 0.75rem;
        color: #ffffff;
        font-size: 1.75rem;
      }
      .cta-band p {
        color: rgba(255,255,255,0.88);
        margin: 0 0 2rem;
        max-width: 480px;
        margin-left: auto;
        margin-right: auto;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private readonly mockData = inject(MockDataService);

  readonly featuredCorsi$ = this.mockData.corsi$.pipe(
    map((data) => data.corsi.filter((c) => c.featured))
  );

  readonly stats: Stat[] = [
    { valore: '1200+', etichetta: 'Soci attivi', icona: '🏋️' },
    { valore: '10', etichetta: 'Corsi diversi', icona: '📋' },
    { valore: '5', etichetta: 'Trainer certificati', icona: '🎓' },
    { valore: '7/7', etichetta: 'Giorni aperti', icona: '📅' }
  ];

  readonly features: Feature[] = [
    {
      icona: '🔥',
      titolo: 'Alta intensità',
      testo: 'CrossFit, HIIT e GRIT per chi vuole spingere al massimo con supervisione certificata.'
    },
    {
      icona: '🧘',
      titolo: 'Mente e corpo',
      testo: 'Yoga Vinyasa e Pilates Matwork per equilibrio, flessibilità e benessere mentale.'
    },
    {
      icona: '🚲',
      titolo: 'Cardio indoor',
      testo: 'Sala Spinning con 20 bici e Boxing Fit: cardio ad alto ritmo con energia collettiva.'
    },
    {
      icona: '🅿️',
      titolo: 'Comodo e accessibile',
      testo: 'Parcheggio gratuito 30 posti, docce, Kids Zone e accesso disabili. Zero scuse.'
    }
  ];
}
