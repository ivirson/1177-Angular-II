import { Routes } from '@angular/router';
import { NotFoundComponent } from './common/components/not-found/not-found.component';
import { UserRoles } from './core/constantes/user-roles.enum';
import { authGuard } from './core/guards/auth.guard';
import { rolesGuard } from './core/guards/roles.guard';
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
        canActivate: [authGuard],
      },
      {
        path: 'create',
        component: ProductsCreateComponent,
        canActivate: [authGuard, rolesGuard],
        data: {
          roles: [UserRoles.ADMIN],
        },
      },
      {
        path: 'edit/:id',
        component: ProductsCreateComponent,
        canActivate: [authGuard],
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
