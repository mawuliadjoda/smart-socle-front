import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvService } from './config/env.service';

@Injectable({
  providedIn: 'root'
})
export class DeclarationVenteService {

  private baseUrl = this.env.baseUrl + '/smart/' + 'declarationVentes';
  constructor(private http: HttpClient, private env: EnvService) {

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

  findForStat(annee: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + `/stat?annee=${annee}`);
  }
}
