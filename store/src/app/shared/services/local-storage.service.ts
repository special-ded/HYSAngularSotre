import { Injectable } from '@angular/core';
import { localStorageEnum } from '../enums/localStorage.enum';
import { Product } from '../interfaces/products.interface';
import { Token } from '../interfaces/token.interface';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {
    this.checkLocalStorage();
  }

  setToLocalStorage(products: Product[]): void {
    localStorage.setItem(localStorageEnum.cartList, JSON.stringify(products));
  }

  checkLocalStorage(): Product[] {
    if (!localStorage.getItem(localStorageEnum.cartList)) {
      localStorage.setItem(localStorageEnum.cartList, '[]');
      return [];
    }

    return JSON.parse(localStorage.getItem(localStorageEnum.cartList)!);
  }

  setToken(token: Token): void {
    localStorage.setItem(
      localStorageEnum.token,
      JSON.stringify('Bearer ' + token.access_token)
    );
  }

  getToken(): string | null {
    if (!localStorage.getItem(localStorageEnum.token)) {
      return null;
    }

    return JSON.parse(localStorage.getItem(localStorageEnum.token)!);
  }

  deleteToken(): void {
    localStorage.removeItem(localStorageEnum.token);
  }
}
