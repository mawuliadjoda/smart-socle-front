import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Input } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Produit } from 'src/app/models/produit';
import { ProduitService } from 'src/app/services/produit.service';
import { FileService } from 'src/app/services/util/file.service';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ProductState } from 'src/app/util/ngxs/state';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import * as fileSaver from 'file-saver'; // npm i --save file-saver
import { LigneCommande } from 'src/app/models/ligne-commande';
import { Router } from '@angular/router';
import { UpdateProductToCart, DeleteProductToCart, DeleteAllProductToCart } from 'src/app/util/ngxs/action';
import { EnvService } from 'src/app/services/config/env.service';
import { CommandeService } from 'src/app/services/commande.service.ts';
import { UtilService } from 'src/app/services/util/util.service';
import { GererTierPayantComponent } from './gerer-tier-payant/gerer-tier-payant.component';
import { TierPayant } from 'src/app/models/tierPayant';
import { JsonPipe } from '@angular/common';
import { JsonPipePipe } from 'src/app/util/json-pipe.pipe';
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

  nbProduitPanier = 0;
  maxDisplayProduct = 2;

  fileUrl = this.env.baseUrl + '/smart/' + 'download2';

  pourcentageReduction: number;
  showPourcentageReduction: boolean;
  tierPayant: TierPayant;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  // @ViewChild('pdfViewerOnDemand', { static: true }) pdfViewerOnDemand;
  // @ViewChild('pdfViewerAutoLoad', { static: true }) pdfViewerAutoLoad;


  @Select(ProductState) state$: Observable<any>;
  cartTotal = 0;


  oldQteValue: number;
  constructor(public dialog: MatDialog,
              public produitService: ProduitService,
              public fileService: FileService,
              private snackBar: MatSnackBar,
              private sanitizer: DomSanitizer,
              private router: Router,
              private store: Store,
              private env: EnvService,
              public commandeService: CommandeService,
              private utilService: UtilService,
              private jsonPipe: JsonPipePipe) {
  }


  ngOnInit() {
    // this.produitsPanier = history && history.state && history.state.data ? history.state.data : [];
    console.log('panier from pannier component ' + this.ligneCommandes);

    this.loadCartTotal();
  }

  /*applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.ligneCommandes = this.dataSource.filteredData;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }*/

  getTotal() {
    let total = 0;
    this.ligneCommandes.forEach(element => {
      total += element.produit.prixUnitaire * element.qte;
    });
    return total;
  }


  loadCartTotal() {
    this.state$.subscribe(
      (data) => {
        this.ligneCommandes = this.utilService.reduceArray(data.cart);
        this.cartTotal =  this.ligneCommandes.reduce((a, b) => a + b.qte, 0);
        console.log('==============cartTotal:' + this.cartTotal);
      }
    );
  }


  downloadFileSystem() {
    console.log('============download begin=========:');
    this.fileService.downloadFileSystem(this.ligneCommandes)
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

  /*reduceArray(ligneCommandes: Array<LigneCommande> ) {

    const result = [...ligneCommandes.reduce((r, o) => {
      const key = o.id;

      const item = r.get(key) || Object.assign({}, o, {
        qte: 0,
        // permettre la modification de la qte du panier
        isDisableUpdate: true
      });

      item.qte += o.qte;

      return r.set(key, item);
    }, new Map()).values()];

    console.log('===============================reduce:' + result);
    result.forEach(element => {
      console.log(element.id, element.produit.nom, element.qte, element.isDisableUpdate);
    });
    return result;
  }*/

  visualiserFacture() {
    this.router.navigateByUrl('smart/facture');
  }

  //////////////////////////////////////////////////////////////////////////////////////


  startUpdateQte(ligneCommande: LigneCommande) {
    ligneCommande.isDisableUpdate = false;
    this.oldQteValue = ligneCommande.qte;
  }

  updateQte(ligneCommande) {
    let message = '';
    let action = '';

    if (ligneCommande.produit.qte > ligneCommande.qte) {
      this.store.dispatch(new UpdateProductToCart(ligneCommande.produit, ligneCommande.produit.id, ligneCommande.qte));
      message = 'Qantité modifiée !';
      action = 'Succès';
    } else {
      // si qte disponible du produit < qte de la commande alors on annule l'ajout au pannier et on remet la valeur inital du paanier
      ligneCommande.qte = this.oldQteValue;
      message = 'Quantité insuffisante !';
      action = 'Erreur';
    }
    this.snackBar.open(message, action, {
      duration: environment.durationOfSnackBar,
    });

    ligneCommande.isDisableUpdate = true;
  }
  removeSelection(selected: LigneCommande) {
    const position = this.ligneCommandes.map(element =>  element.produit.id).indexOf(selected.produit.id);
    // remove element in position
    if (position !== -1) {
      this.ligneCommandes.splice(position, 1);
      this.store.dispatch(new DeleteProductToCart(selected.produit.id));
    }

    const action = 'sussès';
    const message = `produit supprimé du pannier !`;
    this.snackBar.open(message, action, {
      duration: environment.durationOfSnackBar,
    });
  }

  saveLigneFactureAndBuildPdf() {
    const ligneCommandeToSave = this.ligneCommandes.map(item => {

      const container = {
        id: null,
        produit: item.produit,
        qte: item.qte,
        // important pour enregistrer une commande de type vente
        typeCommande: environment.lib_commande_sortant,
        isReceive: true,
        isActif: true,
        tierPayant: this.tierPayant
      };
      return container;
    });

    this.commandeService.save(ligneCommandeToSave).subscribe(response => {

      // Vider le panier
      this.store.dispatch(new DeleteAllProductToCart());
      this.showPourcentageReduction = false;
    });
  }


  traiterTierPayant() {
    this.pourcentageReduction = 0;
    this.showPourcentageReduction = false;
    this.tierPayant = new TierPayant();
    const dialogRef = this.dialog.open(GererTierPayantComponent, {
      data: this.tierPayant, disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.detailReduction) {
        this.tierPayant = result;
        this.pourcentageReduction = this.jsonPipe.transform(result.detailReduction).trim().split('%')[0];
        this.showPourcentageReduction = true;
        console.log(this.pourcentageReduction);
      }
    });
  }

}
