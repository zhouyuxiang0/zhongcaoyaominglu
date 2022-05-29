import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/@shared/models/user';
import { environment } from 'src/environments/environment';

const USERS = [
  {
    account: 'Admin',
    gender: 'male',
    userName: 'Admin',
    password: 'DevUI.admin',
    phoneNumber: '19999996666',
    email: 'admin@devui.com',
    userId: '100',
  },
  {
    account: 'User',
    gender: 'female',
    userName: 'User',
    password: 'DevUI.user',
    phoneNumber: '19900000000',
    email: 'user@devui.com',
    userId: '200',
  },
  {
    account: 'admin@devui.com',
    gender: 'male',
    userName: 'Admin',
    password: 'devuiadmin',
    phoneNumber: '19988888888',
    email: 'admin@devui.com',
    userId: '300',
  },
];

@Injectable()
export class AuthService {
  constructor(private readonly httpClient: HttpClient) {}

  login(account: string, password: string) {
    return this.httpClient.post(environment.api.adminLogin, { username: account, password }).pipe(
      map((value) => {
        const { statusCode, data } = value as any;
        if (statusCode == 200) {
          return { userName: data.username, email: '', token: data.token };
        } else {
          throwError('Please make sure you have input correct account and password');
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('userinfo');
  }

  setSession(userInfo: User) {
    localStorage.setItem('token', userInfo.token);
    localStorage.setItem('userinfo', JSON.stringify(userInfo));
    localStorage.setItem('expires_at', '120');
  }

  getAuthorizationToken() {
    return `Bearer ${localStorage.getItem('token')}`;
  }

  isUserLoggedIn() {
    if (localStorage.getItem('userinfo')) {
      return true;
    } else {
      return false;
    }
  }
}
