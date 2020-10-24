import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LigneCommande } from 'src/app/models/ligne-commande';
import { DeleteProductToCart, UpdateProductToCart } from 'src/app/util/ngxs/action';
import { ProductState } from 'src/app/util/ngxs/state';
import { environment } from 'src/environments/environment';
// import { CustumSearchComponent } from '../custum-search/custum-search.component';
import { UtilService } from 'src/app/services/util/util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-handle-search',
  templateUrl: './handle-search.component.html',
  styleUrls: ['./handle-search.component.css']
})
export class HandleSearchComponent implements OnInit {

  selecton: any = [];
  oldQteValue: number;
  ligneCommandes: Array<LigneCommande> = [];

  // @ViewChild(CustumSearchComponent, {static: true}) customSearchComonent: CustumSearchComponent;

  @Select(ProductState) state$: Observable<any>;

  constructor( private snackBar: MatSnackBar,
               private store: Store,
               private utilService: UtilService,
               private router: Router) { }

  ngOnInit() {
    // console.log(this.customSearchComonent.ligneCommandes);
    this.loadligneCommandesFromPanier();
  }

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

  checkQte() {
  }


  loadligneCommandesFromPanier() {
    this.state$.subscribe(
      (data) => {
        this.ligneCommandes = this.utilService.reduceArray(data.cart);
      }
    );
  }

}
