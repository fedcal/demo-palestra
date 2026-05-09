import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  readonly slug = 'palestra';
  readonly githubUrl = `https://github.com/fedcal/demo-${this.slug}`;
  readonly docsUrl = `https://fedcal.github.io/demo-${this.slug}/`;
  readonly portfolioUrl = 'https://federicocalo.dev';
  readonly currentYear = new Date().getFullYear();
}
