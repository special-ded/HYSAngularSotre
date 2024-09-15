import { Component, Input, OnInit } from '@angular/core';
import { ButtonEnum } from 'src/app/shared/enums/button.enum';
import { Product } from 'src/app/shared/interfaces/products.interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() quantityButtons: boolean = false;
  @Input() product: Product = {
    id: '',
    name: '',
    price: 0,
    quantity: 1,
  };
  @Input() cartButtonName: string = '';

  buttonName: string = '';

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.setButtonName();
    this.cartService.cartList$.subscribe(() => this.setButtonName());
  }

  handleCart(product: Product, button: string): void {
    if (button === ButtonEnum.add) {
      this.cartService.addToCart({ ...product, quantity: 1 });
      this.buttonName = ButtonEnum.inCart;
      return;
    }

    if (button === ButtonEnum.inCart) {
      return;
    }

    this.cartService.removeFromCart(product.id);
  }

  setButtonName(): void {
    if (
      this.cartButtonName === '' &&
      this.cartService.getCartList().some((el) => el.id === this.product.id)
    ) {
      this.buttonName = ButtonEnum.inCart;
      return;
    }

    if (this.cartButtonName === '') {
      this.buttonName = ButtonEnum.add;
      return;
    }
    this.buttonName = this.cartButtonName;
  }

  addQuantity(id: string): void {
    this.cartService.addQuantity(id);
  }

  subtractQuantity(id: string): void {
    this.cartService.subtractQuantity(id);
  }
}
