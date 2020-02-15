import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductState } from 'src/app/ngxs/state';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { LigneCommande } from 'src/app/models/ligne-commande';
import { FileService } from 'src/app/services/util/file.service';

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

  constructor(public fileService: FileService) { }

  ngOnInit() {
    this.loadCartTotal();
    this.fileService.downloadFileSystem(this.ligneCommandes)
    .subscribe(response => {
      const filename = response.headers.get('filename');

      this.pdfViewerAutoLoad.pdfSrc = response.body; // pdfSrc can be Blob or Uint8Array
      this.pdfViewerAutoLoad.refresh();

      console.log('============filename=========:' + filename);
      // this.saveFile(response.body, 'facture.pdf');
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
