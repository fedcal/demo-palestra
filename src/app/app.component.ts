import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { DemoNoticeComponent } from './shared/demo-notice/demo-notice.component';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, DemoNoticeComponent, FooterComponent],
  template: `
    <app-header />
    <main>
      <router-outlet />
    </main>
    <app-demo-notice />
    <app-footer />
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      }
      main {
        flex: 1;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  readonly title = 'Forge Fitness';
}
