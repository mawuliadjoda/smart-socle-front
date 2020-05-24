import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { EnvService } from 'src/app/services/config/env.service';

@Injectable({
  providedIn: 'root'
})
export class RefMedicamentAnsmService {

  private baseUrl = this.env.baseUrl + '/smart/' + 'refMedicamentANSMs';
  constructor(private http: HttpClient, private env: EnvService) {

  }
  getAll(pageSize, pageNo, sortBy): Observable<any> {
    return this.http.get<any>(this.baseUrl + `?pageSize=${pageSize}&pageNo=${pageNo}&sortBy=${sortBy}`);
  }
}
