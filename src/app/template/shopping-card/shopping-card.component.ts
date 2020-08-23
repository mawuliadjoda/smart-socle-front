import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produit } from '../../models/produit';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ProductState } from '../../util/ngxs/state';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'app-shopping-card',
  templateUrl: './shopping-card.component.html',
  styleUrls: ['./shopping-card.component.css']
})
export class ShoppingCardComponent implements OnInit {

  produitsPanier: Array<Produit> = [];
  @Select(ProductState) state$: Observable<any>;

  cartTotal: any;
  constructor(private router: Router,
              private utilService: UtilService) { }

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

        const ligneCommandes = this.utilService.reduceArray(data.cart);
        this.cartTotal =  ligneCommandes.reduce((a, b) => a + b.qte, 0);
      }
    );
  }


  // loadCartTotal() {
  //   this.state$.subscribe(
  //     (data) => {
  //       let ligneCommandes = this.utilService.reduceArray(data.cart);
  //       this.cartTotal =  ligneCommandes.reduce((a, b) => a + b.qte, 0);
  //       console.log('==============cartTotal:' + this.cartTotal);
  //     }
  //   );
  // }
}
