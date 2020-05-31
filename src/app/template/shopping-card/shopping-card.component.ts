import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produit } from '../../models/produit';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ProductState } from '../../ngxs/state';

@Component({
  selector: 'app-shopping-card',
  templateUrl: './shopping-card.component.html',
  styleUrls: ['./shopping-card.component.css']
})
export class ShoppingCardComponent implements OnInit {

  produitsPanier: Array<Produit> = [];
  @Select(ProductState) state$: Observable<any>;
  constructor(private router: Router) { }

  ngOnInit() {
    this.loadCartTotal();
  }

  viewShoppingCart() {
    this.router.navigateByUrl('smart/pannier');
  }

  loadCartTotal() {
    this.state$.subscribe(
      (data) => {
        this.produitsPanier = data.cart;
      }
    );
  }

}
