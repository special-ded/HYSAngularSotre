import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';

const loginRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
];

@NgModule({
  declarations: [LoginComponent, ModalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(loginRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
})
export class LoginModule {}
