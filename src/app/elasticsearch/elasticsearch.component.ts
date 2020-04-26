import { Component, OnInit } from '@angular/core';
import { ElasticsearchService } from '../services/elasticsearch/elasticsearch.service';
import { FormControl } from '@angular/forms';
import { Produit } from '../models/produit';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Store, Select } from '@ngxs/store';
import { AddProductToCart, UpdateProductToCart, DeleteProductToCart } from '../ngxs/action';
import { ProductState } from '../ngxs/state';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LigneCommande } from '../models/ligne-commande';
import { deprecate } from 'util';

@Component({
  selector: 'app-elasticsearch',
  templateUrl: './elasticsearch.component.html',
  styleUrls: ['./elasticsearch.component.css']
})
export class ElasticsearchComponent implements OnInit {

  fieldValue: string;
  produits: [];
  ligneCommandes: LigneCommande [] = [];
  selecton = new FormControl();

  oldQteValue: number;
  // produitsPanier: Array<Produit> = [];
  // @Select(ProductState) state$: Observable<any>;

  constructor(private elasticsearchService: ElasticsearchService,
             private router: Router,
             private _snackBar: MatSnackBar,
             private store: Store) { }

  ngOnInit() {
    // this.loadCartTotal();
  }

  search($event) {
    this.fieldValue = $event.target.value;
    if (this.fieldValue.length > 2) {
      this.elasticsearchService.searchProduit('nom', this.fieldValue).subscribe(
        data => {
          this.produits = data;
          // console.log(this.produits);
        }
      );
    }
  }

  addToSelection(selectedProduit: Produit) {
    // check if selection already exist in list
    const position = this.ligneCommandes.map(element =>  element.produit.id).indexOf(selectedProduit.id);

    let message = '';
    let action = 'sussès';
    if (position === -1) {
      const ligneCommande = {
        id: null,
        produit: selectedProduit,
        qte: selectedProduit.qte > 0 ? 1 : 0,
        // important pour enregistrer une commande de type approvisionnnement
        typeCommande: environment.lib_commande_sortant,
        isDisableUpdate: true,
        isReceive: true,
        isActif: true
      };
      this.ligneCommandes.push(ligneCommande);

      if (ligneCommande.qte > 0 && selectedProduit.qte > 0) {
        this.store.dispatch(new AddProductToCart(ligneCommande.produit, ligneCommande.qte));
      }
      message = selectedProduit.qte > 0 ? `produit  a été ajouté au pannier !` : 'Quantité insufisant. Impossible d\'ajouter au panier';
    } else if (position !== -1 && selectedProduit.qte > 0) {
      const existLigneCommande = this.ligneCommandes[position];

      if (selectedProduit.qte > existLigneCommande.qte + 1) {
        existLigneCommande.qte = existLigneCommande.qte + 1;
        this.store.dispatch(new UpdateProductToCart(existLigneCommande.produit, existLigneCommande.produit.id, existLigneCommande.qte));
      }
      message = (selectedProduit.qte > existLigneCommande.qte + 1) ?
                `Produit existant dans le pannier, quantité augmenté !` : 'Quantité insufisant. Impossible d\'augmenter la quantité';
      // replace element in position
      // plus necessaire car reference de l'objet déjà modifié == > existLigneCommande.qte = existLigneCommande.qte + 1;
      // this.ligneCommandes.splice(position, 1, existLigneCommande);
    } else {
      message = 'Impossible d\'ajouter au pannier, Veuillez vérifier la quantité !';
      action = 'Erreur';
    }

    this.fieldValue = '';
    this.selecton = new FormControl();

    this._snackBar.open(message, action, {
      duration: environment.durationOfSnackBar,
    });
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
    this._snackBar.open(message, action, {
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
    this._snackBar.open(message, action, {
      duration: environment.durationOfSnackBar,
    });
  }

  // deprecate methode @see addToSelection()
 /*
  ajoutPanier(selecton: LigneCommande[]) {
    if (selecton && selecton.length > 0) {
      selecton.forEach(ligneCommande => {
        if (ligneCommande.qte > 0) {
          this.store.dispatch(new AddProductToCart(ligneCommande.produit, ligneCommande.qte));
        }
      });
    }
    console.log(this.selecton);

    this.fieldValue = '';
    this.selecton = new FormControl();

    const action = 'sussès';
    const message = `produit  a été ajouté au pannier !`;
    this._snackBar.open(message, action, {
      duration: 500,
    });
  }
  */

  checkQte() {
  }
  // loadCartTotal() {
  //   this.state$.subscribe(
  //     (data) => {
  //       this.produitsPanier = data.cart;
  //     }
  //   );
  // }
  /*addShoppingCard(produit: Produit) {
    const action = 'sussès';
    const message = `le produit ${produit.nom} a été ajouté au pannier !`;
    this._snackBar.open(message, action, {
      duration: 500,
    });

    this.store.dispatch(new AddProductToCart(produit, 1));
  }
*/
  // viewShoppingCart(){
  //   this.router.navigateByUrl('smart/pannier');
  // }

}
