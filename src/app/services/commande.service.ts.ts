import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../model/client';
import { Commande } from '../models/commande';
import { LigneCommande } from '../models/ligne-commande';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private baseUrl = environment.baseUrl + 'commandes';
  constructor(private http: HttpClient) {

  }


  getAll(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  save(ligneCommandes: Array<LigneCommande>): Observable<any> {
    return this.http.post(this.baseUrl, ligneCommandes);
  }
  saveCommandeEntrant(ligneCommandes: Array<LigneCommande>): Observable<any> {
    return this.http.post(environment.baseUrl + 'commandes-entrant', ligneCommandes);
  }

  saveCommandeEntrantReception(ligneCommandes: Array<LigneCommande>): Observable<any> {
    return this.http.post(environment.baseUrl + 'commandes-entrant-reception', ligneCommandes);
  }
}
