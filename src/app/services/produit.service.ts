import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produit } from '../models/produit';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private baseUrl = environment.baseUrl + 'produits';
  constructor(private http: HttpClient) {

  }
  getAllProduits(): Observable<any> {
    console.log('-------------------call-----------------------');
    return this.http.get<any>(this.baseUrl);
  }

  add(t: Produit): Observable<any> {
    return this.http.post(this.baseUrl, t);
  }

  update(t: Produit): Observable<any> {
    return this.http.put(this.baseUrl, t);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/` + id);
  }

  findProduitACommander(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/produit-a-cmder`);
  }
}
