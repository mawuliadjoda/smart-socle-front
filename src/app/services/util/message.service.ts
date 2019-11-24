import { Injectable } from '@angular/core';
import { PropertyService } from './property.service';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
private subject = new Subject<any>();
constructor(private propertyService: PropertyService) { }

sendLoginMessage(message: boolean) {
  this.subject.next({text: message});
  this.propertyService.setProperty(message);
}
clearMessage() {
  this.subject.next();
}

getMessage(): Observable<any> {
  return this.subject.asObservable();
}

}
