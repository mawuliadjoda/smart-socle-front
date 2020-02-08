import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Input } from '@angular/core';

import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Produit } from 'src/app/models/produit';
import { ProduitService } from 'src/app/services/produit.service';
import { FileService } from 'src/app/services/util/file.service';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ProductState } from 'src/app/ngxs/state';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import * as fileSaver from 'file-saver'; // npm i --save file-saver
import { LigneCommande } from 'src/app/models/ligne-commande';
@Component({
  selector: 'app-pannier',
  templateUrl: './pannier.component.html',
  styleUrls: ['./pannier.component.css']
})
export class PannierComponent implements OnInit  {
  index: number;
  id: number;
  dataSource = new MatTableDataSource<LigneCommande>([]);
  // @Input()
  ligneCommandes: Array<LigneCommande> = [];

  nbProduitPanier: number = 0;
  maxDisplayProduct: number = 2;

  fileUrl = environment.baseUrl + 'download2';

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  @Select(ProductState) state$: Observable<any>;
  cartTotal = 0;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public produitService: ProduitService,
    public fileService: FileService,
    private _snackBar: MatSnackBar,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit() {
    // this.produitsPanier = history && history.state && history.state.data ? history.state.data : [];
    console.log('panier from pannier component ' + this.ligneCommandes);

    this.loadCartTotal();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.ligneCommandes = this.dataSource.filteredData;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getTotal(){
    let total = 0;
    this.ligneCommandes.forEach(element => {
      total += element.produit.prixUnitaire;
    });
    return total;
  }


  loadCartTotal() {
    this.state$.subscribe(
      (data) => {
        this.ligneCommandes = this.reduceArray(data.cart);
        var total = [0, 1, 2, 3].reduce((a, b)=> a + b,0);
        this.cartTotal =  this.ligneCommandes.reduce((a, b) => a + b.qte, 0);
        console.log('==============cartTotal:' + this.cartTotal);
      }
    );
  }


  downloadFileSystem() {
    console.log('============download begin=========:');
    this.fileService.downloadFileSystem(this.reduceArray(this.ligneCommandes))
      .subscribe(response => {
        const filename = response.headers.get('filename');

        console.log('============filename=========:' + filename);
        this.saveFile(response.body, 'facture.pdf');
      });
  }
  saveFile(data: any, filename?: string) {
    console.log('============filename=========:' + filename);
    const blob = new Blob([data], {type: 'application/pdf; charset=utf-8'});
    fileSaver.saveAs(blob, filename);
  }

  reduceArray(ligneCommandes: Array<LigneCommande> ){

    const result = [...ligneCommandes.reduce((r, o) => {
      const key = o.id;

      const item = r.get(key) || Object.assign({}, o, {
        qte: 0
      });

      item.qte += o.qte;

      return r.set(key, item);
    }, new Map).values()];

    console.log('===============================reduce:' + result);
    result.forEach(element => {
      console.log(element.id, element.produit.nom, element.qte);
    });
    return result;
  }
}
