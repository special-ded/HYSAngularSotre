import { Injectable, OnDestroy } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/products.interface';
import { ProductsService } from 'src/app/shared/services/products.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService implements OnDestroy {
  ascendingId: boolean = false;
  ascendingPrice: boolean = false;
  ascendingName: boolean = false;
  sortedProducts: Product[] = [];
  filteredByPrice$ = new BehaviorSubject<Product[]>([]);
  priceInput$ = new BehaviorSubject<number>(0);
  priceSelectOption$ = new BehaviorSubject<string>('More than');

  constructor(private productsService: ProductsService) {}

  ngOnDestroy(): void {
    this.filteredByPrice$.unsubscribe();
    this.priceInput$.unsubscribe();
    this.priceSelectOption$.unsubscribe();
  }

  filterByText(text: string): void {
    console.log(text);

    this.productsService.productsList$.subscribe((data) => {
      this.sortedProducts = data;

      const arr = this.sortedProducts.reduce(
        (acc: Product[], curV: Product) => {
          curV.name.toLowerCase().search(text!.toLowerCase()) !== -1
            ? acc.push(curV)
            : null;
          return acc;
        },
        []
      );
      this.productsService.filteredByText$.next(arr);
      this.filterByPrice(
        this.priceSelectOption$.getValue(),
        this.priceInput$.getValue()
      );
    });
  }

  filterByPrice(option: string, price: number): void {
    this.productsService.filteredByText$.subscribe((data) => {
      this.sortedProducts = data;

      const arr = this.sortedProducts.reduce(
        (acc: Product[], curV: Product) => {
          option === 'More than'
            ? curV.price > price
              ? acc.push(curV)
              : null
            : curV.price < price
            ? acc.push(curV)
            : null;
          return acc;
        },
        []
      );

      this.filteredByPrice$.next(arr);
    });
  }

  sortByPrice(): void {
    this.ascendingPrice = !this.ascendingPrice;
    this.filteredByPrice$.subscribe((data) => (this.sortedProducts = data));

    this.ascendingPrice
      ? this.sortedProducts.sort((a, b): number => a.price - b.price)
      : this.sortedProducts.sort((a, b): number => b.price - a.price);

    this.filteredByPrice$.next(this.sortedProducts);
  }

  sortByName(): void {
    this.ascendingName = !this.ascendingName;
    this.filteredByPrice$.subscribe((data) => (this.sortedProducts = data));

    this.ascendingName
      ? this.sortedProducts.sort((a, b) => a.name.localeCompare(b.name))
      : this.sortedProducts
          .sort((a, b) => a.name.localeCompare(b.name))
          .reverse();

    this.filteredByPrice$.next(this.sortedProducts);
  }
}
