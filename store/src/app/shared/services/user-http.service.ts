import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root',
})
export class UserHttpService extends BaseHttpService {
  override getURL(): string {
    return this.URL + 'users';
  }
}
