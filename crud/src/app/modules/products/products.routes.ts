import { Routes } from '@angular/router';
import { UserRoles } from '../../core/constantes/user-roles.enum';
import { authGuard } from '../../core/guards/auth.guard';
import { rolesGuard } from '../../core/guards/roles.guard';
import { ProductsCreateComponent } from './components/products-create/products-create.component';
import { ProductsListComponent } from './components/products-list/products-list.component';

export const PRODUCTS_ROUTES: Routes = [
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
];
