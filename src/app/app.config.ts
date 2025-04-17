import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';   // ✅ Add this
import { routes } from './app.routes';              // ✅ Add this

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes)  // ✅ This activates your routing!
  ]
};