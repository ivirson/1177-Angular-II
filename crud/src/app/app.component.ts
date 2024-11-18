import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './common/header/header.component';
import { RegisterComponent } from './modules/auth/components/register/register.component';
import { ProductsCreateComponent } from './modules/products/components/products-create/products-create.component';
import { ProductsListComponent } from './modules/products/components/products-list/products-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    RegisterComponent,
    ProductsListComponent,
    ProductsCreateComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'crud';
}
