import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly apollo: Apollo) {}
  isLoggedIn: boolean = false;

  redirectUrl: string = '';

  login(username: string, password: string) {
    //TODO
    this.apollo
      .watchQuery({
        query: gql`{

      }`,
      })
      .valueChanges.pipe(
        map((val) => {
          // TODO:
          this.isLoggedIn = true;
        })
      );
  }

  logout() {
    //TODO
    this.isLoggedIn = false;
    return true;
  }
}
