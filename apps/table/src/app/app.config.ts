import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { TableServiceService } from './remote-entry/services/table-service.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes), TableServiceService],
};
