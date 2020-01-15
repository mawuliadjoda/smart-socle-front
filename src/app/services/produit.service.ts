import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Produit } from '../models/produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitService extends DataService<Produit>{

  constructor(private httpClient: HttpClient) {
    super(httpClient, 'produits');
  }

}
