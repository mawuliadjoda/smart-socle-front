import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Input } from '@angular/core';

import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Produit } from 'src/app/models/produit';
import { ProduitService } from 'src/app/services/produit.service';
import { FileService } from 'src/app/services/util/file.service';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pannier',
  templateUrl: './pannier.component.html',
  styleUrls: ['./pannier.component.css']
})
export class PannierComponent implements OnInit  {
  index: number;
  id: number;
  dataSource = new MatTableDataSource<Produit>([]);
  // @Input()
  produitsPanier: Array<Produit> = [];

  nbProduitPanier: number = 0;
  maxDisplayProduct: number = 2;

  fileUrl = environment.baseUrl + 'download2';

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public produitService: ProduitService,
    public fileService: FileService,
    private _snackBar: MatSnackBar,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit() {
    this.produitsPanier = history && history.state && history.state.data ? history.state.data : [];
    console.log('panier from pannier component ' + this.produitsPanier);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.produitsPanier = this.dataSource.filteredData;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getTotal(){
    let total = 0;
    this.produitsPanier.forEach(element => {
      total += element.prixUnitaire;
    });
    return total;
  }


  download(url: string): any {
    let headers = new HttpHeaders();
    // headers = headers.append('Authorization', 'Bearer ' + this.getToken());
    this.fileService.getDownload().subscribe((res) => {
      const file = new Blob([res], {
        type: 'application/pdf',
      });
      const a = document.createElement('a');
      a.href = environment.baseUrl + 'download4' + (<any>res)._body;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      return res;
    }, error => {
      let alert: any = {
        title: 'Notify Title',
        body: 'Notify Body',
      };
      alert.body = error.error.message || JSON.stringify(error.error);
      alert.title = error.error.error;
      // alert = this.alertService.handleError(error);
      alert.position = 'rightTop';
      console.log(error);
      // this.alertService.notifyError(alert);
      return error;
    });
  }



  downloadFacture(){
    this.fileService.getImage().subscribe(data => {
     console.log('download ok' + data);

     const a = document.createElement('a');
      // a.href = environment.baseUrl + 'download2' + (<any>data)._body;
     a.href = environment.baseUrl + 'download2';
     a.target = '_blank';
     document.body.appendChild(a);
     a.click();
     //window.open(environment.baseUrl + 'download2');

    // const blob = new Blob([data], { type: 'application/octet-stream' });

    // this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));

    },
    (err: HttpErrorResponse) => {
      console.log(err.name + ' ' + err.message);
    });
  }



}
