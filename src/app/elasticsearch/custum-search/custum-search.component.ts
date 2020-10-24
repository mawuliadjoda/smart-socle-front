import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { LigneCommande } from 'src/app/models/ligne-commande';
import { Produit } from 'src/app/models/produit';
import { ElasticsearchService } from 'src/app/services/elasticsearch/elasticsearch.service';
import { UtilService } from 'src/app/services/util/util.service';
import { AddProductToCart, UpdateProductToCart } from 'src/app/util/ngxs/action';
import { ProductState } from 'src/app/util/ngxs/state';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-custum-search',
  templateUrl: './custum-search.component.html',
  styleUrls: ['./custum-search.component.css']
})
export class CustumSearchComponent implements OnInit {

  // myControl = new FormControl();

  fieldValue: string;
  produits: [];
  // selecton = new FormControl();
  selectedProduit: Produit;

  ligneCommandes: LigneCommande [];
  interval;

  @Select(ProductState) state$: Observable<any>;

  constructor(private elasticsearchService: ElasticsearchService,
              private router: Router,
              private snackBar: MatSnackBar,
              private store: Store,
              private utilService: UtilService) { }

  ngOnInit() {
    this.loadligneCommandesFromPanier();
  }


  search($event) {
    console.log('------call-------');
    this.fieldValue = $event.target ? $event.target.value : undefined;


    this.interval = setTimeout(() => {
      console.log('------call 2-------')
      console.log($event.target.value);

      this.doSearch($event);

    }, 1000);
  }

  doSearch($event) {
    this.fieldValue = $event.target.value;

    if (this.fieldValue.length > 2) {
      this.elasticsearchService.searchProduit('nom', this.fieldValue).subscribe(
        data => {
          this.produits = data;
          if (data && data.length === 1 ) {
              // this.selecton.setValue(data[0]);
              this.selectedProduit = data[0];
          }
        }
      );
    } else {
      this.produits = [];
    }
  }

  displayFn(produit) {
    return produit ? (produit.dci + '__' + produit.nom + '__' + produit.formeDosage).toLowerCase() : undefined;
  }

  onSelectionChanged(event: MatAutocompleteSelectedEvent) {
    console.log(event.option.value);
    this.selectedProduit = event.option.value;
  }


  addToSelection(){
    if (this.selectedProduit) {
      this.doAddToSelection();
    } else {
      this.snackBar.open('Aucun produit selectionné', 'Erreur', {
        duration: environment.durationOfSnackBar,
      });
    }
  }
  doAddToSelection() {
    // check if selection already exist in list
    const position = this.ligneCommandes.map(element =>  element.produit.id).indexOf(this.selectedProduit.id);

    let message = '';
    let action = 'sussès';
    if (position === -1) {
      const ligneCommande = {
        id: null,
        produit: this.selectedProduit,
        qte: this.selectedProduit.qte > 0 ? 1 : 0,
        // important pour enregistrer une commande de type approvisionnnement
        typeCommande: environment.lib_commande_sortant,
        isDisableUpdate: true,
        isReceive: true,
        isActif: true
      };
      // on ajoute à la fin du tableau = > unshift
      // Plus necessaire this.ligneCommandes est synchonisé avec le state
      // this.ligneCommandes.unshift(ligneCommande);

      if (ligneCommande.qte > 0 && this.selectedProduit.qte > 0) {
        this.store.dispatch(new AddProductToCart(ligneCommande.produit, ligneCommande.qte));
      }
      message = this.selectedProduit.qte > 0 ? `produit  a été ajouté au pannier !`
                                              : 'Quantité insufisant. Impossible d\'ajouter au panier';
    } else if (position !== -1 && this.selectedProduit.qte > 0) {
      const existLigneCommande = this.ligneCommandes[position];

      if (this.selectedProduit.qte > existLigneCommande.qte + 1) {
        existLigneCommande.qte = existLigneCommande.qte + 1;
        this.store.dispatch(new UpdateProductToCart(existLigneCommande.produit, existLigneCommande.produit.id, existLigneCommande.qte));
      }
      message = (this.selectedProduit.qte > existLigneCommande.qte + 1) ?
                `Produit existant dans le pannier, quantité augmenté !` : 'Quantité insufisant. Impossible d\'augmenter la quantité';
      // replace element in position
      // plus necessaire car reference de l'objet déjà modifié == > existLigneCommande.qte = existLigneCommande.qte + 1;
      // this.ligneCommandes.splice(position, 1, existLigneCommande);
    } else {
      message = 'Impossible d\'ajouter au pannier, Veuillez vérifier la quantité !';
      action = 'Erreur';
    }

    this.fieldValue = '';
    // this.selecton = new FormControl();
    this.selectedProduit = null;

    this.snackBar.open(message, action, {
      duration: environment.durationOfSnackBar,
    });

    this.produits = [];
    console.log(this.router.url);

    if ('/smart/handle-search' !== this.router.url) {
      this.router.navigateByUrl('smart/handle-search');
    }
  }

  loadligneCommandesFromPanier() {
    this.state$.subscribe(
      (data) => {
        // Il faut synchroniser cette ligne de commande avec celui du state (qui est supprimer depuis handeSearchComponent)
        this.ligneCommandes = this.utilService.reduceArray(data.cart);
      }
    );
  }

}
