import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/products.interface';
import { BehaviorSubject } from 'rxjs';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  constructor(private productsService: ProductsService) {}

  allProducts: Product[] = [];
  slicedProducts$ = new BehaviorSubject<Product[]>([]);
  loading$ = new BehaviorSubject<boolean>(true);
  productsOnPage: number = 8;

  ngOnInit(): void {
    this.productsService.generateProducts();

    this.productsService.productsList$.subscribe((data) => {
      data.length !== 0 ? this.loading$.next(false) : null,
        (this.allProducts = data);
      this.slicedProducts$.next(data.slice(0, this.productsOnPage));
    });
  }

  loadMore(): void {
    this.productsOnPage += 8;
    this.slicedProducts$.next(this.allProducts.slice(0, this.productsOnPage));
  }
}
