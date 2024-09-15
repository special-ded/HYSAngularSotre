import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/errors/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'shop/home',
    pathMatch: 'full',
  },
  {
    path: 'shop',
    loadChildren: () =>
      import('./pages/shop/shop.module').then((m) => m.ShopModule),
  },
  {
    path: 'administration',
    loadChildren: () =>
      import('./pages/administration/administration.module').then(
        (m) => m.AdministrationModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
