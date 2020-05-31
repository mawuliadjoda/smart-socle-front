import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client';
import { Commande } from '../models/commande';
import { LigneCommande } from '../models/ligne-commande';
import { Injectable } from '@angular/core';
import { EnvService } from './config/env.service';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private baseUrl = this.env.baseUrl + '/smart/' + 'commandes';
  constructor(private http: HttpClient, private env: EnvService) {

  }


  getAll(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  save(ligneCommandes: Array<LigneCommande>): Observable<any> {
    return this.http.post(this.baseUrl, ligneCommandes);
  }
  saveCommandeEntrant(ligneCommandes: Array<LigneCommande>): Observable<any> {
    return this.http.post(this.env.baseUrl + '/smart/' + 'commandes-entrant', ligneCommandes);
  }

  saveCommandeEntrantReception(ligneCommandes: Array<LigneCommande>): Observable<any> {
    return this.http.post(this.env.baseUrl + '/smart/' + 'commandes-entrant-reception', ligneCommandes);
  }
}
