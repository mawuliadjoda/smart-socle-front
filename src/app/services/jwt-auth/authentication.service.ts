import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

export class User {
  constructor(public status: string) {}
}

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
   // let url = 'http://localhost:8080/token/generate-token';
   url = 'http://localhost:8080/api/auth/signin';
  constructor(private httpClient: HttpClient) {}
// Provide username and password for authentication, and once authentication is successful,
//store JWT token in session
  authenticate(username, password) {
    let loginUser = {
      "username": username,
      "password": password
    }
    return this.httpClient


      .post<any>(this.url, loginUser)
      .pipe(
        map(userData => {
          sessionStorage.setItem("username", username);
          let tokenStr = userData.tokenType + ' ' + userData.accessToken;
          sessionStorage.setItem("token", tokenStr);
          return userData;
        })
      );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("username");
    console.log(!(user === null));
    return user !== null;
  }

  logOut() {
    sessionStorage.removeItem("username");
  }
}
