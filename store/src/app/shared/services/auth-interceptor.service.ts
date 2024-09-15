import {
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ModalComponent } from 'src/app/pages/login/modal/modal.component';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class AuthInterceptorService {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private modal: MatDialog
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      setHeaders: {
        Authorization: this.localStorageService.getToken() || '',
      },
    });

    return next.handle(authReq).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            console.log('Server Response');
          }
        },
        (error) => {
          if (error.status === 401) {
            console.log(error);

            if (
              error.url === 'https://hys-fe-course-api.vercel.app/auth/login'
            ) {
              this.showModal('Login or Password is incorrect!');
              return;
            }

            this.localStorageService.deleteToken();
            this.showModal(
              'You are Logged out and will be redirected to Login page!'
            );
          }
          console.log(error);
        }
      )
    );
  }

  showModal(title: string) {
    let addDialog = this.modal.open(ModalComponent, {
      height: '247px',
      width: '570px',
      data: {
        title: title,
        login: true,
      },
    });

    addDialog.afterClosed().subscribe((data) => {
      if (data) {
        this.router.navigate(['login']);
      }
    });
  }
}
