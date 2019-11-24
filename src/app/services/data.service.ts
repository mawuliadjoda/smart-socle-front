import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Issue} from '../models/issue';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService <T> {

  public dataChange: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  // Temporarily stores data from dialogs
  public dialogData: any;

  public  baseUrl: string;

  private http: HttpClient;

  // endPoint: REST url
  // methode init() à appeler dans le constructeur de la classe appelante
  public init(endPoint: string, http: HttpClient) {
   this.baseUrl = environment.baseUrl + endPoint;
   this.http = http;
  }

  get data(): T[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllIssues(): void {
    this.http.get<T[]>(this.baseUrl).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
  }

  add(issue: T): void {
    this.http.post(this.baseUrl, issue).subscribe(data => {
      this.dialogData = data;
      },
      (err: HttpErrorResponse) => {
        console.error('error while add client');
      });
   }

  update(issue: T): void {
    this.http.put(this.baseUrl, issue).subscribe(data => {
        this.dialogData = issue;
      },
      (err: HttpErrorResponse) => {
        console.log (err.name + ' ' + err.message);
      }
    );
  }

  // DELETE METHOD
  delete(id: number): void {
    this.http.delete(this.baseUrl + id).subscribe(data => {
      console.log('delete ok');
      },
      (err: HttpErrorResponse) => {
        console.log (err.name + ' ' + err.message);
      }
    );
  }
}



