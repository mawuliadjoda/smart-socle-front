import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeclarationVenteService {

  private baseUrl = environment.baseUrl + 'declarationVentes';
  constructor(private http: HttpClient) {

  }
  getAll(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  getAllByUserName(userName: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + `/findByUserName?userName=${userName}`);
  }

  add(t: any): Observable<any> {
    return this.http.post(this.baseUrl, t);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/` + id);
  }
}
