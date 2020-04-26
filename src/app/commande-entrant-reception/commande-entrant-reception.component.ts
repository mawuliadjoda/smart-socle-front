import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LigneCommande } from '../models/ligne-commande';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { LigneCommandeService } from '../services/ligne-commande.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { CommandeService } from '../services/commande.service.ts';
import { Produit } from '../models/produit';

@Component({
  selector: 'app-commande-entrant-reception',
  templateUrl: './commande-entrant-reception.component.html',
  styleUrls: ['./commande-entrant-reception.component.css']
})
export class CommandeEntrantReceptionComponent implements OnInit {
  displayedColumns = [
    'id',
    'nom',
    'reference',
    'categorie',
    'qte',
    'prixUnitaire',
    'prixTotal',
    'created_at'
  ];

  dataSource = new MatTableDataSource<LigneCommande>([]);
  data: Array<LigneCommande>;
  qteRecu: number;
  scanCode: string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  constructor(private ligneCommandeService: LigneCommandeService,
              private commandeService: CommandeService,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.spinner.show();
    this.ligneCommandeService.getCommandesEnAttente().subscribe(data => {
      this.data = data;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.spinner.hide();
    },
    (err: HttpErrorResponse) => {
      console.log(err.name + ' ' + err.message);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  reception() {
    let cis = this.scanCode.substring(0, environment.sizeOfCis);

    let newArray = this.data.filter( data => data.produit.cis === cis );

    if (newArray.length > 0) {

      let receiveProduct =  newArray[0].produit;
      receiveProduct.qte = receiveProduct.qte + newArray[0].qte;
      // p.setQte(p.qte);

      const ligneCommande = {
        id: newArray[0].id,
        produit: receiveProduct,
        qte: this.qteRecu,
        // important pour enregistrer une commande de type approvisionnnement
        typeCommande: environment.lib_commande_entrant,
        fournisseur: null,
        isReceive: true,
        receiveDate: new Date()
      };

      this.commandeService.saveCommandeEntrantReception([ligneCommande]).subscribe(
        data => {
          this.data = this.data.filter( element => element.produit.cis !== cis );
          this.dataSource = new MatTableDataSource(this.data);
          this.qteRecu = 0;
          this.scanCode = '';

        }
      );
    }
  }
}
