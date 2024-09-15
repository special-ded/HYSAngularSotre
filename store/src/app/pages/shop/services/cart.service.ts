import { Injectable, OnInit } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/products.interface';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CartService implements OnInit {
  cartTotal$ = new BehaviorSubject<number>(0);
  cartList$ = new Subject<Product[]>();
  cartList: Product[] = [];
  total: number = 0;

  constructor(private lsService: LocalStorageService) {}

  ngOnInit(): void {
    this.updateTotalPrice();
  }

  addToCart(product: Product) {
    if (!product) {
      return;
    }

    this.cartList.push(product);
    this.lsService.setToLocalStorage(this.cartList);
    this.updateTotalPrice();

    return this.cartList;
  }

  removeFromCart(id: string) {
    this.cartList.splice(
      this.cartList.findIndex((val) => val.id == id),
      1
    );
    this.updateTotalPrice();
    this.lsService.setToLocalStorage(this.cartList);
    this.cartList$.next(this.cartList);
  }

  updateTotalPrice() {
    this.cartTotal$.next(
      this.cartList.reduce(
        (acc: number, curV: Product) => (acc += curV.price * curV.quantity),
        0
      )
    );
  }

  getCartList(): Product[] {
    if (this.cartList.length === 0) {
      this.cartList = this.lsService.checkLocalStorage();
    }

    this.updateTotalPrice();
    return this.cartList;
  }

  addQuantity(id: string) {
    this.cartList.find((x) => x.id === id)!.quantity++;
    this.updateTotalPrice();
    this.lsService.setToLocalStorage(this.cartList);
  }

  subtractQuantity(id: string) {
    this.cartList.find((x) => x.id === id)!.quantity--;

    if (this.cartList.find((x) => x.id === id)!.quantity === 0) {
      this.removeFromCart(id);
      return;
    }

    this.updateTotalPrice();
    this.lsService.setToLocalStorage(this.cartList);
  }
}
