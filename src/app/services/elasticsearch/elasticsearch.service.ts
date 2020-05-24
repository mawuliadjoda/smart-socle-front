import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvService } from '../config/env.service';

@Injectable({
  providedIn: 'root'
})
export class ElasticsearchService {
  private baseUrl = this.env.baseUrl + '/smart/' + 'refMedicamentBDDFs/_search';
  private baseUrlSearchProduit = this.env.baseUrl + '/smart/' + 'produits/_search';
  constructor(private http: HttpClient, private env: EnvService) {

  }
  search(fieldName, fieldValue): Observable<any> {
    return this.http.get<any>(this.baseUrl + `?fieldName=${fieldName}&fieldValue=${fieldValue}`);
  }

  searchProduit(fieldName, fieldValue): Observable<any> {
    return this.http.get<any>(this.baseUrlSearchProduit + `?fieldName=${fieldName}&fieldValue=${fieldValue}`);
  }
}
