import { Injectable } from '@angular/core';
import { Fournisseur } from '../model/fournisseur';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {
  constructor(private httpClient: HttpClient) {

  }
}
