import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Produit } from 'src/app/models/produit';
import { LigneCommande } from 'src/app/models/ligne-commande';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  public baseUrl: string = environment.baseUrl + 'download';
  constructor(private http: HttpClient){
  }
  getDownload(produitsPanier: Array<Produit>): Observable<any> {
     //return this.http.get<any>(this.baseUrl);
     return this.http.post(this.baseUrl, produitsPanier);
  }

  public getImage(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}`,  {
        responseType: 'blob'
      });
  }

  downloadFile(): Observable<Blob> {
    return this.http.get(this.baseUrl, { responseType: 'blob' });
  }


  // downloadFileSystem(produitsPanier: Array<Produit>): Observable<HttpResponse<string>> {
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Accept', 'text/csv; charset=utf-8');

  //   return this.http.post(this.baseUrl, produitsPanier,{
  //     headers: headers,
  //     observe: 'response',
  //     responseType: 'text'
  //   });
  // }

  // downloadFileSystem(): Observable<HttpResponse<string>> {
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Accept', 'text/csv; charset=utf-8');

  //   return this.http.get(this.baseUrl, {
  //     headers: headers,
  //     observe: 'response',
  //     responseType: 'text'
  //   });
  // }

  downloadFileSystem(produitsPanier: Array<LigneCommande>): Observable<HttpResponse<Blob>> {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/pdf; charset=utf-8');

    // return this.http.get(this.baseUrl, {
    //   headers: headers,
    //   observe: 'response',
    //   responseType: 'arraybuffer'
    // });

      return this.http.post(this.baseUrl, produitsPanier,
        {
         headers: headers,
         observe: 'response',
         responseType: 'blob'
       });
  }

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    let url = environment.baseUrl + '/savefile';
    const data: FormData = new FormData();
    data.append('file', file);
    const newRequest = new HttpRequest('POST', url, data, {
          reportProgress: true,
          responseType: 'text'
    });
    return this.http.request(newRequest);
  }
}
