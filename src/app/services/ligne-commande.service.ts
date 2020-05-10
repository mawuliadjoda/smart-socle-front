import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LigneCommande } from '../models/ligne-commande';

@Injectable({
  providedIn: 'root'
})
export class LigneCommandeService {
  private baseUrl = environment.baseUrl + 'ligneCommandes';
  constructor(private http: HttpClient) {

  }


  getAll(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  getCommandesEnAttente(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'commandes-en-attente');
  }

  getAllStat(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/stat');
  }
  disable(ligneCommande: LigneCommande): Observable<any> {
    return this.http.put(`${this.baseUrl}/disable`, ligneCommande);
  }

}
