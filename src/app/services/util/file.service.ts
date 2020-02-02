import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  public baseUrl: string = environment.baseUrl + 'download2';
  constructor(private http: HttpClient){
  }
  getDownload(): Observable<any> {
     return this.http.get<any>(this.baseUrl);
    // let headers = new HttpHeaders ({'Content-Type': 'application/pdf', 'Accept': 'application/pdf'});
    // return this.http.get(this.baseUrl, {headers: headers})
  }

  public getImage(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}`, {
        responseType: 'blob'
      });
  }

  downloadFile(): Observable<Blob> {
    return this.http.get(this.baseUrl, { responseType: 'blob' });
  }

}
