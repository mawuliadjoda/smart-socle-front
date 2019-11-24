import { Injectable } from '@angular/core';
import { Fournisseur } from '../model/fournisseur';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService extends DataService <Fournisseur> {

  constructor(private httpClient: HttpClient) {
     super();
     super.init('fournisseurs/', this.httpClient);
  }

}
