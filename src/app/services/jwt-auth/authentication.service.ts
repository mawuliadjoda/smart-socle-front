import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

export class User {
  constructor(public status: string) {}
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
   // let url = 'http://localhost:8080/token/generate-token';
   url = 'http://localhost:8080/api/auth/signin';
  constructor(private httpClient: HttpClient) {}
  isResetTimerVar: boolean;
// Provide username and password for authentication, and once authentication is successful,
// store JWT token in session
  authenticate(username, password) {
    const loginUser = {
      username,
      password
    };
    return this.httpClient


      .post<any>(this.url, loginUser)
      .pipe(
        map(userData => {
          sessionStorage.setItem('username', username);
          const tokenStr = userData.tokenType + ' ' + userData.accessToken;
          sessionStorage.setItem('token', tokenStr);
          return userData;
        })
      );
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem('username');
    console.log(!(user === null));
    return user !== null;
  }
  getUserLogin() {
    return sessionStorage.getItem('username');
  }

  logOut() {
    sessionStorage.removeItem('username');
  }
  setisResetTimer(isResetTimerVar: boolean) {
    this.isResetTimerVar = isResetTimerVar;
  }
  isResetTimer() {
    return this.isResetTimerVar;
  }
}
