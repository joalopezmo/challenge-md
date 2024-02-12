import { Route } from '@angular/router';
import { TableComponent } from './components/table/table.component';

export const remoteRoutes: Route[] = [
  // { path: '', component: RemoteEntryComponent },

  {
    path: '',
    component: TableComponent,
    // loadChildren: () =>
    //   import('./components/table/table.component').then(
    //     (m) => m.TableComponent
    //   ),
  },
];
