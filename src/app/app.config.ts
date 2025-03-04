import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { MyPreset } from './utils/theme';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: MyPreset,
      },
    }),
    provideToastr({
      positionClass: 'toast-bottom-right',
      timeOut: 5000,
    }),
  ],
};
