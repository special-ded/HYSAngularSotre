import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { CartComponent } from './components/cart/cart.component';
import { PageNotFoundComponent } from '../errors/components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { ShopComponent } from './components/shop/shop.component';

const productsRoutes: Routes = [
  {
    path: '',
    component: ShopComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ProductsListComponent,
      },
      {
        path: 'home',
        pathMatch: 'full',
        component: HomeComponent,
      },
      {
        path: 'cart',
        pathMatch: 'full',
        component: CartComponent,
      },
      {
        path: '404',
        pathMatch: 'full',
        component: PageNotFoundComponent,
      },
      {
        path: ':id',
        pathMatch: 'full',
        component: ProductInfoComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(productsRoutes)],
})
export class ProductsRoutingModule {}
