import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/products.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { BehaviorSubject, tap } from 'rxjs';
import { ProductsService } from 'src/app/shared/services/products.service';
import { ButtonEnum } from 'src/app/shared/enums/button.enum';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss'],
})
export class ProductInfoComponent implements OnInit {
  buttonName: string = ButtonEnum.add;
  id: string = '';

  product: Product = {
    id: '',
    name: '',
    price: 0,
    quantity: 1,
  };
  product$ = new BehaviorSubject<Product[]>([]);

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id')!;

      this.productService
        .getProductById(this.id)
        .pipe(
          tap((product) => {
            if (!product) {
              this.router.navigate(['shop', '404']);
            }
          })
        )
        .subscribe((data) => (this.product = data));
    });

    this.setButtonName();
  }

  addToCart(product: Product): void {
    if (this.buttonName === ButtonEnum.add) {
      this.cartService.addToCart({ ...product, quantity: 1 });
      this.buttonName = ButtonEnum.inCart;
      return;
    }

    if (this.buttonName === ButtonEnum.inCart) {
      return;
    }
  }

  setButtonName(): void {
    if (this.cartService.getCartList().some((el) => el.id === this.id)) {
      this.buttonName = ButtonEnum.inCart;
      return;
    }
  }
}
