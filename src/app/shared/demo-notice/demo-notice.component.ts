import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Banner informativo persistente che ricorda al visitatore
 * che il sito è una demo con dati fittizi.
 *
 * Mostrato sopra il footer in ogni pagina, con link alla
 * documentazione GitHub per testare il template e contattare Federico.
 */
@Component({
  selector: 'app-demo-notice',
  standalone: true,
  templateUrl: './demo-notice.component.html',
  styleUrl: './demo-notice.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoNoticeComponent {
  readonly slug = 'palestra';
  readonly verticalName = 'Palestra';
  readonly githubUrl = `https://github.com/fedcal/demo-${this.slug}`;
  readonly docsUrl = `https://fedcal.github.io/demo-${this.slug}/`;
  readonly portfolioUrl = 'https://federicocalo.dev';
}
