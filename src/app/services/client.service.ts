import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Client } from '../model/client';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService extends DataService <Client> {
  constructor(private httpClient: HttpClient) {
    super(httpClient, 'clients');
  }

}
