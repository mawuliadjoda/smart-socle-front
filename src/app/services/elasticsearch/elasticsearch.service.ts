import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ElasticsearchService {
  private baseUrl = environment.baseUrl + 'refMedicamentBDDFs/_search';
  private baseUrlSearchProduit = environment.baseUrl + 'produits/_search';
  constructor(private http: HttpClient) {

  }
  search(fieldName, fieldValue): Observable<any> {
    return this.http.get<any>(this.baseUrl + `?fieldName=${fieldName}&fieldValue=${fieldValue}`);
  }

  searchProduit(fieldName, fieldValue): Observable<any> {
    return this.http.get<any>(this.baseUrlSearchProduit + `?fieldName=${fieldName}&fieldValue=${fieldValue}`);
  }
}
