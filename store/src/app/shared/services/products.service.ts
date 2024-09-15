import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/products.interface';
import { ProductHttpService } from './product-http.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService implements OnInit {
  generatedProducts: Product[] = [];
  productsList$ = new BehaviorSubject<Product[]>([]);
  filteredByText$ = new BehaviorSubject<Product[]>([]);

  constructor(private http: ProductHttpService) {}

  ngOnInit(): void {}

  generateProducts(): void {
    this.http.getList<Product[]>().subscribe((data) => {
      (this.generatedProducts = data), console.log(data);
      this.productsList$.next(this.generatedProducts);
      this.filteredByText$.next(this.generatedProducts);
    });
  }

  getProductById(id: string) {
    return this.http.getById<Product>(id);
  }
}
