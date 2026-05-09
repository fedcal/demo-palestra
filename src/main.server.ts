import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

// The context parameter carries the platformRef provided by the Angular SSR
// route extractor during build-time prerendering. It must be forwarded to
// bootstrapApplication as the third argument to satisfy NG0401 requirements.
const bootstrap = (context?: { platformRef?: unknown }) =>
  bootstrapApplication(AppComponent, config, context as never);

export default bootstrap;
