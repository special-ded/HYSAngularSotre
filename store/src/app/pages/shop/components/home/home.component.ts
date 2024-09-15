import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/products.interface';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  topProducts$ = new BehaviorSubject<Product[]>([]);
  loading$ = new BehaviorSubject<boolean>(true);
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.generateProducts();

    this.productsService.productsList$.subscribe((data) => {
      this.loading$.next(!data.length);
      this.topProducts$.next(data.slice(0, 3));
    });
  }
}
