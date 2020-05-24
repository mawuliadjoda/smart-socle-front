import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LigneCommande } from '../models/ligne-commande';
import { EnvService } from './config/env.service';

@Injectable({
  providedIn: 'root'
})
export class LigneCommandeService {
  private baseUrl = this.env.baseUrl + '/smart/' + 'ligneCommandes';
  constructor(private http: HttpClient, private env: EnvService) {

  }


  getAll(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  getCommandesEnAttente(): Observable<any> {
    return this.http.get<any>(this.env.baseUrl + '/smart/' + 'commandes-en-attente');
  }

  getAllStat(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/stat');
  }
  disable(ligneCommande: LigneCommande): Observable<any> {
    return this.http.put(`${this.baseUrl}/disable`, ligneCommande);
  }

}
