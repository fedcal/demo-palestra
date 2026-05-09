import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';

interface RigaConfronto {
  feature: string;
  mensile: boolean;
  trimestrale: boolean;
  semestrale: boolean;
  annuale: boolean;
}

@Component({
  selector: 'app-abbonamenti',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Abbonamenti</h1>
        <p>Scegli il piano più adatto al tuo ritmo di allenamento.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="abbonamenti$ | async as abbonamenti">
      <ul class="pricing-grid">
        <li *ngFor="let ab of abbonamenti" class="pricing-card" [class.pricing-card--highlight]="ab.highlight">
          <div *ngIf="ab.badge" class="pricing-badge">{{ ab.badge }}</div>

          <h2 class="pricing-nome">{{ ab.nome }}</h2>
          <p class="pricing-durata">{{ ab.durata }}</p>

          <div class="pricing-prezzo">
            <span class="prezzo-main">{{ ab.prezzo | currency: 'EUR':'symbol':'1.0-0' }}</span>
            <span *ngIf="ab.prezzoOriginale" class="prezzo-barrato">
              {{ ab.prezzoOriginale | currency: 'EUR':'symbol':'1.0-0' }}
            </span>
          </div>

          <p *ngIf="ab.sconto" class="sconto-info">Risparmi il {{ ab.sconto }}%</p>
          <p class="accessi-info">Accessi: <strong>{{ ab.accessi }}</strong></p>

          <ul class="pricing-features">
            <li *ngFor="let f of ab.features">
              <span class="check-icon" aria-hidden="true">✓</span>
              {{ f }}
            </li>
          </ul>

          <a routerLink="/prenota" class="btn" [class.btn-primary]="ab.highlight" [class.btn-secondary]="!ab.highlight">
            {{ ab.highlight ? 'Scegli il migliore' : 'Scegli questo piano' }}
          </a>
        </li>
      </ul>

      <section class="comparison">
        <h2>Confronto piani</h2>
        <div class="table-wrapper">
          <table class="comparison-table">
            <thead>
              <tr>
                <th scope="col">Funzionalità</th>
                <th scope="col">Mensile</th>
                <th scope="col">Trimestrale</th>
                <th scope="col">Semestrale</th>
                <th scope="col" class="col-highlight">Annuale</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let riga of confronto">
                <td>{{ riga.feature }}</td>
                <td [attr.aria-label]="riga.mensile ? 'Incluso' : 'Non incluso'">
                  <span [class.check]="riga.mensile" [class.cross]="!riga.mensile" aria-hidden="true">
                    {{ riga.mensile ? '✓' : '–' }}
                  </span>
                </td>
                <td [attr.aria-label]="riga.trimestrale ? 'Incluso' : 'Non incluso'">
                  <span [class.check]="riga.trimestrale" [class.cross]="!riga.trimestrale" aria-hidden="true">
                    {{ riga.trimestrale ? '✓' : '–' }}
                  </span>
                </td>
                <td [attr.aria-label]="riga.semestrale ? 'Incluso' : 'Non incluso'">
                  <span [class.check]="riga.semestrale" [class.cross]="!riga.semestrale" aria-hidden="true">
                    {{ riga.semestrale ? '✓' : '–' }}
                  </span>
                </td>
                <td class="col-highlight" [attr.aria-label]="riga.annuale ? 'Incluso' : 'Non incluso'">
                  <span [class.check]="riga.annuale" [class.cross]="!riga.annuale" aria-hidden="true">
                    {{ riga.annuale ? '✓' : '–' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <p class="disclaimer">
        Tutti i prezzi sono IVA inclusa. L'abbonamento si attiva al primo accesso. Per cancellazioni e sospensioni
        contattare la reception o scrivere a <a href="mailto:info@forgefitness.it">info&#64;forgefitness.it</a>.
      </p>
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
      .content {
        padding: 3rem 1rem 4rem;
      }
      .pricing-grid {
        list-style: none;
        padding: 0;
        margin: 0 0 4rem;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 1.25rem;
        align-items: start;
      }
      .pricing-card {
        position: relative;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        padding: 1.75rem 1.5rem;
        background: #ffffff;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }
      .pricing-card--highlight {
        border-color: var(--color-accent);
        border-width: 2px;
        box-shadow: 0 4px 20px rgba(220, 38, 38, 0.12);
      }
      .pricing-badge {
        position: absolute;
        top: -0.75rem;
        left: 50%;
        transform: translateX(-50%);
        background: var(--color-accent);
        color: #ffffff;
        font-size: 0.7rem;
        font-weight: 700;
        padding: 0.2rem 0.75rem;
        border-radius: 9999px;
        white-space: nowrap;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .pricing-nome {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 700;
      }
      .pricing-durata {
        margin: 0;
        font-size: 0.82rem;
        color: var(--color-fg-muted);
      }
      .pricing-prezzo {
        display: flex;
        align-items: baseline;
        gap: 0.5rem;
      }
      .prezzo-main {
        font-size: 2.25rem;
        font-weight: 800;
        color: var(--color-accent);
        line-height: 1;
      }
      .prezzo-barrato {
        font-size: 1rem;
        color: var(--color-fg-muted);
        text-decoration: line-through;
      }
      .sconto-info {
        margin: 0;
        font-size: 0.82rem;
        font-weight: 600;
        color: var(--color-success);
        background: #dcfce7;
        padding: 0.2rem 0.6rem;
        border-radius: var(--radius-sm);
        display: inline-block;
      }
      .accessi-info {
        margin: 0;
        font-size: 0.85rem;
        color: var(--color-fg-muted);
      }
      .pricing-features {
        list-style: none;
        padding: 0;
        margin: 0;
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
      }
      .pricing-features li {
        font-size: 0.875rem;
        display: flex;
        gap: 0.5rem;
        align-items: flex-start;
      }
      .check-icon {
        color: var(--color-success);
        font-weight: 700;
        flex-shrink: 0;
        margin-top: 0.05rem;
      }
      .btn {
        display: block;
        text-align: center;
        padding: 0.75rem 1rem;
        border-radius: var(--radius-md);
        font-weight: 700;
        font-size: 0.95rem;
        text-decoration: none;
        margin-top: 0.5rem;
        border: none;
        cursor: pointer;
        transition: all 0.15s ease;
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
        background: var(--color-bg-subtle);
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
      .btn-secondary:hover {
        background: var(--color-border);
        text-decoration: none;
      }

      /* Comparison table */
      .comparison {
        margin-bottom: 3rem;
      }
      .comparison h2 {
        font-size: 1.5rem;
        margin: 0 0 1.5rem;
      }
      .table-wrapper {
        overflow-x: auto;
      }
      .comparison-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.9rem;
      }
      .comparison-table th,
      .comparison-table td {
        padding: 0.75rem 1rem;
        border-bottom: 1px solid var(--color-border);
        text-align: center;
      }
      .comparison-table th:first-child,
      .comparison-table td:first-child {
        text-align: left;
        font-weight: 500;
      }
      .comparison-table thead th {
        font-size: 0.85rem;
        font-weight: 700;
        color: var(--color-fg-muted);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        background: var(--color-bg-subtle);
      }
      .col-highlight {
        background: #fff1f1;
      }
      .comparison-table tbody tr:hover {
        background: var(--color-bg-subtle);
      }
      .check {
        color: var(--color-success);
        font-weight: 700;
        font-size: 1.1rem;
      }
      .cross {
        color: var(--color-fg-muted);
      }

      .disclaimer {
        font-size: 0.82rem;
        color: var(--color-fg-muted);
        font-style: italic;
        text-align: center;
        margin: 0;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AbbonamentiComponent {
  private readonly mockData = inject(MockDataService);

  readonly abbonamenti$ = this.mockData.abbonamenti$.pipe(
    map((d) => d.abbonamenti)
  );

  readonly confronto: RigaConfronto[] = [
    { feature: 'Accesso illimitato corsi', mensile: true, trimestrale: true, semestrale: true, annuale: true },
    { feature: 'Sala pesi', mensile: true, trimestrale: true, semestrale: true, annuale: true },
    { feature: 'Docce e spogliatoi', mensile: true, trimestrale: true, semestrale: true, annuale: true },
    { feature: 'Parcheggio gratuito', mensile: true, trimestrale: true, semestrale: true, annuale: true },
    { feature: 'Sessioni Personal Trainer', mensile: false, trimestrale: true, semestrale: true, annuale: true },
    { feature: 'Analisi composizione corporea', mensile: false, trimestrale: false, semestrale: true, annuale: true },
    { feature: 'Sospensione inclusa (30gg)', mensile: false, trimestrale: false, semestrale: false, annuale: true },
    { feature: 'Kids Zone inclusa', mensile: false, trimestrale: false, semestrale: false, annuale: true }
  ];
}
