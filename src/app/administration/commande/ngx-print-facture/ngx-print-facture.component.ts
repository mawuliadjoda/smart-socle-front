import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductState } from 'src/app/util/ngxs/state';
import { Select, Store } from '@ngxs/store';
import { LigneCommande } from 'src/app/models/ligne-commande';
import { FileService } from 'src/app/services/util/file.service';
import { Observable, of, pipe } from 'rxjs';
import { switchMap, debounceTime, catchError } from 'rxjs/operators';
import { CommandeService } from 'src/app/services/commande.service.ts';
import { DeleteAllProductToCart } from 'src/app/util/ngxs/action';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { EnvService } from 'src/app/services/config/env.service';
@Component({
  selector: 'app-ngx-print-facture',
  templateUrl: './ngx-print-facture.component.html',
  styleUrls: ['./ngx-print-facture.component.css']
})
export class NgxPrintFactureComponent implements OnInit {

  @Select(ProductState) state$: Observable<any>;
  cartTotal = 0;
  montantTotal = 0;
  ligneCommandes: Array<LigneCommande> = [];
  nomPharmacie: string;
  constructor(public fileService: FileService,
              public commandeService: CommandeService,
              private store: Store,
              private spinner: NgxSpinnerService,
              private env: EnvService) {
              }

  ngOnInit() {
    this.nomPharmacie = this.env.nomPharmacie;
    this.loadCartTotal();
    this.calculMontantTotal();
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
        isActif: true
      };
      return container;
    });

    this.commandeService.save(ligneCommandeToSave).subscribe(response => {

      // Vider le panier
      this.store.dispatch(new DeleteAllProductToCart());

    });
  }


  loadCartTotal() {
    this.state$.subscribe(
      (data) => {
        this.ligneCommandes = this.reduceArray(data.cart);
        this.cartTotal =  this.ligneCommandes.reduce((a, b) => a + b.qte, 0);
        console.log('==============cartTotal:' + this.cartTotal);
      }
    );
  }

  calculMontantTotal() {
    this.montantTotal = 0;
    this.ligneCommandes.forEach(element => {
      this.montantTotal += element.produit.prixUnitaire * element.qte;
    });
    return this.montantTotal;
  }

  reduceArray(ligneCommandes: Array<LigneCommande> ) {

    const result = [...ligneCommandes.reduce((r, o) => {
      const key = o.id;

      const item = r.get(key) || Object.assign({}, o, {
        qte: 0
      });

      item.qte += o.qte;

      return r.set(key, item);
    }, new Map()).values()];

    console.log('===============================reduce:' + result);
    result.forEach(element => {
      console.log(element.id, element.produit.nom, element.qte);
    });
    return result;
  }
}
