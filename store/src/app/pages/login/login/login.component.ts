import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Token } from 'src/app/shared/interfaces/token.interface';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  protected readonly LOGIN_URL =
    'https://hys-fe-course-api-omega.vercel.app/auth/login';
  form: FormGroup = this.fb.group({
    username: null,
    password: null,
  });

  constructor(
    public http: HttpClient,
    private localStorageService: LocalStorageService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  send() {
    this.toLogIn().subscribe((data) => {
      this.localStorageService.setToken(data),
        this.router.navigate(['administration']);
    });
  }

  toLogIn(): Observable<Token> {
    return this.http.post(this.LOGIN_URL, {
      username: this.form.getRawValue().username,
      password: this.form.getRawValue().password,
    });
  }
}
