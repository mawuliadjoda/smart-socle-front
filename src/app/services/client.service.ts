import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../model/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
private baseUrl = environment.baseUrl + `clients`;
constructor(private http: HttpClient) { }

getCients(): Observable<any> {
  return this.http.get(this.baseUrl);
}

getClient(id: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/${id}`);
}
createClient(client: Client): Observable<any> {
  return this.http.post(this.baseUrl, client);
}
updateClient(client: Client): Observable<any> {
  return this.http.put(this.baseUrl, client);
}
deleteClient(id: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/${id}`);
}

}
