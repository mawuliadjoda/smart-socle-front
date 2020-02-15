import { Injectable } from '@angular/core';
import { Issue } from '../models/issue';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  private baseUrl = environment.baseUrl + 'issues';
  constructor(private http: HttpClient) {

  }
  getAll(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  add(t: Issue): Observable<any> {
    return this.http.post(this.baseUrl, t);
  }

  update(t: Issue): Observable<any> {
    return this.http.put(this.baseUrl, t);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/` + id);
  }
}
