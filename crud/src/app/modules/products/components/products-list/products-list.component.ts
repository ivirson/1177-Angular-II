import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterLink } from '@angular/router';
import { NgxMaskPipe } from 'ngx-mask';
import { Product } from '../../models/products.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink, NgxMaskPipe],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private destroyRef: DestroyRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productsService
      .getProducts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.products = res;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  deleteProduct(id: string): void {
    this.productsService
      .deleteProduct(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        complete: () => {
          this.getProducts();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
