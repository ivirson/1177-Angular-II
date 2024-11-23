import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/products.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-create',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './products-create.component.html',
  styleUrl: './products-create.component.css',
})
export class ProductsCreateComponent implements OnInit {
  form: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    qty: new FormControl(null, [Validators.required]),
    image: new FormControl(null, [Validators.required]),
  });

  id?: string;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute,
    private destroyRef: DestroyRef,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);

    if (this.id) {
      this.getProductById();
    }
  }

  getProductById(): void {
    this.productsService
      .getProductById(this.id!)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.form.patchValue(res);
        },
        error: (err) => {
          this.openSnackBar('Algo deu errado!');
        },
      });
  }

  onSubmit(): void {
    const payload: Product = this.form.getRawValue();
    if (this.id) {
      this.updateProduct(payload);
      return;
    }

    this.saveProduct(payload);
  }

  saveProduct(product: Product): void {
    this.productsService
      .saveProduct(product)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        complete: () => {
          this.router.navigate(['/products']);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  updateProduct(product: Product): void {
    this.productsService
      .updateProduct(product)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        complete: () => {
          this.router.navigate(['/products']);
        },
        error: (err) => {
          this.openSnackBar('Algo deu errado!');
        },
      });
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'x');
  }
}
