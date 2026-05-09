import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-trainer',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>I nostri trainer</h1>
        <p>5 professionisti certificati, oltre 36 anni di esperienza combinata.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="istruttori$ | async as istruttori">
      <ul class="trainer-grid">
        <li *ngFor="let trainer of istruttori" class="trainer-card">
          <div class="trainer-card__avatar" [attr.aria-label]="'Foto di ' + trainer.nome">
            {{ trainer.iniziale }}
          </div>

          <div class="trainer-card__body">
            <div class="trainer-card__header">
              <div>
                <h2>{{ trainer.nome }}</h2>
                <p class="trainer-specializzazione">{{ trainer.specializzazione }}</p>
              </div>
              <span class="esperienza-badge">{{ trainer.anniEsperienza }} anni</span>
            </div>

            <p class="trainer-bio">{{ trainer.bio }}</p>

            <div class="trainer-certifications">
              <p class="cert-label">Certificazioni</p>
              <ul class="cert-list">
                <li *ngFor="let cert of trainer.certificazioni">{{ cert }}</li>
              </ul>
            </div>
          </div>
        </li>
      </ul>

      <section class="cta-block">
        <h2>Vuoi allenarti con un trainer dedicato?</h2>
        <p>Prenota una sessione di Personal Training per obiettivi personalizzati e progressi misurabili.</p>
        <a href="/prenota" class="btn btn-primary">Prenota sessione PT</a>
      </section>
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
      .trainer-grid {
        list-style: none;
        padding: 0;
        margin: 0 0 4rem;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }
      .trainer-card {
        display: flex;
        gap: 1.5rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        padding: 1.75rem;
        background: #ffffff;
        align-items: flex-start;
      }
      .trainer-card__avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: var(--color-accent);
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        font-weight: 800;
        flex-shrink: 0;
      }
      .trainer-card__body {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }
      .trainer-card__header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      .trainer-card__header h2 {
        margin: 0 0 0.2rem;
        font-size: 1.2rem;
      }
      .trainer-specializzazione {
        margin: 0;
        color: var(--color-accent);
        font-weight: 600;
        font-size: 0.9rem;
      }
      .esperienza-badge {
        font-size: 0.8rem;
        font-weight: 700;
        background: var(--color-bg-subtle);
        border: 1px solid var(--color-border);
        padding: 0.25rem 0.65rem;
        border-radius: 9999px;
        color: var(--color-fg-muted);
        white-space: nowrap;
      }
      .trainer-bio {
        margin: 0;
        font-size: 0.9rem;
        color: var(--color-fg-muted);
        line-height: 1.65;
      }
      .trainer-certifications {
        border-top: 1px dashed var(--color-border);
        padding-top: 0.75rem;
      }
      .cert-label {
        margin: 0 0 0.4rem;
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--color-fg-muted);
      }
      .cert-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 0.4rem;
        flex-wrap: wrap;
      }
      .cert-list li {
        font-size: 0.78rem;
        background: #fff1f1;
        border: 1px solid #fecaca;
        color: var(--color-accent);
        padding: 0.2rem 0.55rem;
        border-radius: var(--radius-sm);
        font-weight: 500;
      }
      .cta-block {
        text-align: center;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-lg);
        padding: 3rem 2rem;
      }
      .cta-block h2 {
        margin: 0 0 0.75rem;
        font-size: 1.5rem;
      }
      .cta-block p {
        color: var(--color-fg-muted);
        margin: 0 0 1.5rem;
        max-width: 480px;
        margin-left: auto;
        margin-right: auto;
      }
      .btn {
        display: inline-block;
        padding: 0.75rem 1.75rem;
        border-radius: var(--radius-md);
        font-weight: 700;
        font-size: 0.95rem;
        text-decoration: none;
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
      @media (max-width: 600px) {
        .trainer-card {
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .trainer-card__header {
          justify-content: center;
        }
        .cert-list {
          justify-content: center;
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainerComponent {
  private readonly mockData = inject(MockDataService);

  readonly istruttori$ = this.mockData.istruttori$.pipe(
    map((d) => d.istruttori)
  );
}
