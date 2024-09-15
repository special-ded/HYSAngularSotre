import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/products.interface';
import { FilterService } from './filter.service';

@Injectable({
  providedIn: 'root',
})
export class PaginatorService implements OnInit, OnDestroy {
  totalPages$ = new BehaviorSubject<number>(0);
  currentPage$ = new BehaviorSubject<number>(1);
  currentPageProducts$ = new BehaviorSubject<Product[]>([]);
  startIndex: number = 0;
  productsOnPage: number = 5;
  products: Product[] = [];

  constructor(private filterService: FilterService) {}

  ngOnInit(): void {
    this.filterService.filteredByPrice$.subscribe((data) => {
      this.products = data;
      this.totalPages$.next(Math.ceil(data.length / 5));
      this.currentPageProducts$.next(data.slice(0, 5));
      this.currentPage$.next(1);
      this.startIndex = 0;
    });
  }

  ngOnDestroy(): void {
    this.totalPages$.unsubscribe();
    this.currentPage$.unsubscribe();
    this.currentPageProducts$.unsubscribe();
  }

  get currentPage(): number {
    return this.currentPage$.getValue();
  }

  nextPage(): void {
    if (
      this.currentPage >= Math.ceil(this.products.length / this.productsOnPage)
    ) {
      return;
    }
    this.currentPage$.next(this.currentPage + 1);

    this.currentPageProducts$.next(
      this.products.slice(
        (this.startIndex += this.productsOnPage),
        this.productsOnPage * this.currentPage
      )
    );
  }

  prevPage(): void {
    if (this.currentPage === 1) {
      return;
    }

    this.currentPage$.next(this.currentPage - 1);
    this.currentPageProducts$.next(
      this.products.slice(
        (this.startIndex -= this.productsOnPage),
        this.productsOnPage * this.currentPage
      )
    );
  }
}
