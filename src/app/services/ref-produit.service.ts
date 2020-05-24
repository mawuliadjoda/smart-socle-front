import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produit } from '../models/produit';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { RefProduit } from '../models/ref-produit';
import { EnvService } from './config/env.service';

@Injectable({
  providedIn: 'root'
})
export class RefProduitService {
  private baseUrl = this.env.baseUrl + '/smart/'  + 'refProduits';
  constructor(private http: HttpClient, private env: EnvService) {

  }
  getAll(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }
  findByReference(reference: string) {
    return this.http.get<any>(this.baseUrl + '/findByRef/' + reference.trim());
  }
  add(t: RefProduit): Observable<any> {
    return this.http.post(this.baseUrl, t);
  }

  update(t: RefProduit): Observable<any> {
    return this.http.put(this.baseUrl, t);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/` + id);
  }
}
