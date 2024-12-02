import { Routes } from '@angular/router';
import { NotFoundComponent } from './common/components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./modules/products/products.routes').then(
        (r) => r.PRODUCTS_ROUTES
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.routes').then((r) => r.AUTH_ROUTES),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
