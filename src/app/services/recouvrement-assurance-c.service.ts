import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from './config/env.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecouvrementAssuranceCService {

  private baseUrl = this.env.baseUrl + '/smart/' + 'recouvrementAssurances';
  constructor(private http: HttpClient, private env: EnvService) {
  }

  getAll(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  findByMoiAnnee(moisCommande: string, anneeCommande: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + `/findByMoisAnnee?moisCommande=${moisCommande}&anneeCommande=${anneeCommande}`);
  }
}
