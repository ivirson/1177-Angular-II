import { Routes } from '@angular/router';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { RegisterComponent } from './modules/auth/components/register/register.component';
import { ProductsCreateComponent } from './modules/products/components/products-create/products-create.component';
import { ProductsListComponent } from './modules/products/components/products-list/products-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    children: [
      {
        path: '',
        component: ProductsListComponent,
      },
      {
        path: 'create',
        component: ProductsCreateComponent,
      },
      {
        path: 'edit/:id',
        component: ProductsCreateComponent,
      },
    ],
  },
  {
    path: 'auth',
    children: [
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
