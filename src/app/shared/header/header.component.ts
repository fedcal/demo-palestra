import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="site-header">
      <div class="site-header__inner">
        <a routerLink="/" class="brand" aria-label="Home Forge Fitness">
          <span class="brand__icon" aria-hidden="true">💪</span>
          <span class="brand__text">Forge Fitness</span>
        </a>
        <nav class="site-nav" aria-label="Navigazione principale">
          <a routerLink="/" routerLinkActive="is-active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
          <a routerLink="/corsi" routerLinkActive="is-active">Corsi</a>
          <a routerLink="/abbonamenti" routerLinkActive="is-active">Abbonamenti</a>
          <a routerLink="/trainer" routerLinkActive="is-active">Trainer</a>
          <a routerLink="/prenota" routerLinkActive="is-active" class="cta">Prenota gratis</a>
        </nav>
      </div>
    </header>
  `,
  styles: [
    `
      .site-header {
        position: sticky;
        top: 0;
        z-index: 100;
        background: var(--color-bg-default);
        border-bottom: 1px solid var(--color-border);
        backdrop-filter: blur(8px);
      }
      .site-header__inner {
        max-width: 1080px;
        margin: 0 auto;
        padding: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
      }
      .brand {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        text-decoration: none;
        color: var(--color-fg-default);
        font-weight: 700;
        font-size: 1.15rem;
      }
      .brand__icon {
        font-size: 1.5rem;
      }
      .site-nav {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        align-items: center;
      }
      .site-nav a {
        color: var(--color-fg-muted);
        text-decoration: none;
        font-size: 0.95rem;
        padding: 0.4rem 0.6rem;
        border-radius: var(--radius-sm);
      }
      .site-nav a:hover {
        color: var(--color-fg-default);
        background: var(--color-bg-subtle);
        text-decoration: none;
      }
      .site-nav a.is-active {
        color: var(--color-accent);
        font-weight: 600;
      }
      .site-nav a.cta {
        background: var(--color-accent);
        color: #ffffff;
        padding: 0.5rem 1rem;
        border-radius: var(--radius-md);
        font-weight: 600;
      }
      .site-nav a.cta:hover {
        background: var(--color-accent-hover);
        color: #ffffff;
        text-decoration: none;
      }
      @media (max-width: 600px) {
        .site-header__inner {
          flex-direction: column;
          padding: 0.75rem;
        }
        .site-nav {
          gap: 0.5rem;
          font-size: 0.85rem;
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {}
