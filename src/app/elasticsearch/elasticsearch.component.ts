import { Component, OnInit } from '@angular/core';
import { ElasticsearchService } from '../services/elasticsearch/elasticsearch.service';
import { FormControl } from '@angular/forms';
import { Produit } from '../models/produit';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Store, Select } from '@ngxs/store';
import { AddProductToCart } from '../ngxs/action';
import { ProductState } from '../ngxs/state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-elasticsearch',
  templateUrl: './elasticsearch.component.html',
  styleUrls: ['./elasticsearch.component.css']
})
export class ElasticsearchComponent implements OnInit {

  fieldValue: string;
  produits: [];

  selecton = new FormControl();

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
          console.log(this.produits);
        }
      );
    }
  }

  ajoutPanier(produits: Produit[]) {
    if (produits && produits.length > 0) {
      produits.forEach(produit => {
        this.store.dispatch(new AddProductToCart(produit, 1));
        console.log('ok');
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
