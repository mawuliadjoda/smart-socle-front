import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private property = new ReplaySubject<any>(1);
  loginKey = 'LOGIN_KEY';

constructor() {
  const storedProp = localStorage.getItem(this.loginKey);

  if (storedProp) {
    this.setProperty(JSON.parse(storedProp));
  }
}

setProperty(property: any) {
  localStorage.setItem(this.loginKey, JSON.stringify(property));
  this.property.next(property);
}

getProperty() {
  return this.property;
}

}

