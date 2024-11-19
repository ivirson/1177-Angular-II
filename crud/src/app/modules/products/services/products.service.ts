import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/products.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  saveProduct(product: Product): Observable<void> {
    return this.http.post<void>(this.apiUrl, product);
  }
}
