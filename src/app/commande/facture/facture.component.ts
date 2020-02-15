import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductState } from 'src/app/ngxs/state';
import { Select, Store } from '@ngxs/store';
import { LigneCommande } from 'src/app/models/ligne-commande';
import { FileService } from 'src/app/services/util/file.service';
import { Observable, of, pipe } from 'rxjs';
import { switchMap, debounceTime, catchError } from 'rxjs/operators';
import { CommandeService } from 'src/app/services/commande.service.ts';
import { DeleteAllProductToCart } from 'src/app/ngxs/action';
@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit {
  @ViewChild('pdfViewerOnDemand', { static: true }) pdfViewerOnDemand;
  @ViewChild('pdfViewerAutoLoad', { static: true }) pdfViewerAutoLoad;

  @Select(ProductState) state$: Observable<any>;
  cartTotal = 0;
  ligneCommandes: Array<LigneCommande> = [];

  constructor(public fileService: FileService,
              public commandeService: CommandeService,
              private store: Store) { }

  ngOnInit() {
    this.loadCartTotal();
    this.saveLigneFactureAndBuildPdf();
    // this.fileService.downloadFileSystem(this.ligneCommandes)
    // .subscribe(response => {
    //   const filename = response.headers.get('filename');

    //   this.pdfViewerAutoLoad.pdfSrc = response.body;
    //   this.pdfViewerAutoLoad.refresh();

    //   console.log('============filename=========:' + filename);
    // });
  }

  saveLigneFactureAndBuildPdf(){
    let ligneCommandeToSave = this.ligneCommandes.map(item => {

      const container = {
        id: null,
        produit: item.produit,
        qte: item.qte
      };
      return container;
    });

    this.commandeService.save(ligneCommandeToSave).pipe(
      debounceTime(500),
      switchMap(data => {
         console.log(data);
         return this.fileService.downloadFileSystem(this.ligneCommandes);
      }),
      catchError(err => of(null))
    ).subscribe(response => {
      const filename = response.headers.get('filename');

      this.pdfViewerAutoLoad.pdfSrc = response.body; // pdfSrc can be Blob or Uint8Array
      this.pdfViewerAutoLoad.refresh();

      console.log('============filename=========:' + filename);
      // this.saveFile(response.body, 'facture.pdf');

      // Vider le panier
      this.store.dispatch(new DeleteAllProductToCart());
    });
  }

//   Observable.forkJoin([
//     this.http.get('http://www.server.com/dataA').map(res => res.json()),
//     this.http.get('http://www.server.com/dataB').map(res => res.json()),
//     this.http.get('http://www.server.com/dataC').map(res => res.json())
// ])
// .subscribe(([A,B,C]) => {
//   this.dataA = A;
//   this.dataB = B;
//   this.dataC = C;
// });
  loadCartTotal() {
    this.state$.subscribe(
      (data) => {
        this.ligneCommandes = this.reduceArray(data.cart);
        this.cartTotal =  this.ligneCommandes.reduce((a, b) => a + b.qte, 0);
        console.log('==============cartTotal:' + this.cartTotal);
      }
    );
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
