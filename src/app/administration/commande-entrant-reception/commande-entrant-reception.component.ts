import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LigneCommande } from '../../models/ligne-commande';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LigneCommandeService } from '../../services/ligne-commande.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { CommandeService } from '../../services/commande.service.ts';
import { Produit } from '../../models/produit';

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
    'fournisseur',
    'qte',
    'prixUnitaire',
    'prixTotal',
    'created_at',
    'actions'
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
    if (this.scanCode) {
      const cis = this.scanCode.substring(0, environment.sizeOfCis);

      const newArray = this.data.filter( data => data.produit.cis === cis );

      if (newArray.length > 0) {

        const receiveProduct =  newArray[0].produit;
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
          receiveDate: new Date(),
          isActif: true
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

  // dans un navigateur = > data:image/png;base64, + base64 value (byte[]) pour afficher l'image dans le navigateur = > utile à savoir
  // data:image/png;base64,produit.qrcode
  downloadQrCode(produit: Produit) {
    const linkSource = `data:image/png;base64,${produit.qrcode}`;
    const downloadLink = document.createElement('a');

    // open in new window ne donne pas la main pour telecharger
    // window.open(linkSource);
    document.body.appendChild(downloadLink);

    downloadLink.href = linkSource;
    downloadLink.target = '_self';
    downloadLink.download = `${produit.nom}.png`;
    downloadLink.click();
  }
}
