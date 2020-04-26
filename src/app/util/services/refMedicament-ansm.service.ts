import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefMedicamentAnsmService {

  private baseUrl = environment.baseUrl + 'refMedicamentANSMs';
  constructor(private http: HttpClient) {

  }
  getAll(pageSize, pageNo, sortBy): Observable<any> {
    return this.http.get<any>(this.baseUrl + `?pageSize=${pageSize}&pageNo=${pageNo}&sortBy=${sortBy}`);
  }
}
