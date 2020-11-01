import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { LigneCommande } from '../../models/ligne-commande';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Produit } from '../../models/produit';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommandeService } from '../../services/commande.service.ts';
import { FournisseurService } from '../../services/fournisseur.service';
import { Fournisseur } from '../../models/fournisseur';
import { HttpErrorResponse } from '@angular/common/http';
import { SearchComponent } from '../../elasticsearch/search/search.component';
import { QrcodeDisplayComponent } from 'src/app/util/qrcode-display/qrcode-display.component';

@Component({
  selector: 'app-generate-qr-code',
  templateUrl: './generate-qr-code.component.html',
  styleUrls: ['./generate-qr-code.component.css']
})
export class GenerateQrCodeComponent implements OnInit {


  // query results available in ngOnInit use {static: true}
  // query results available in ngAfterViewInit use {static: false}
  @ViewChild(SearchComponent, {static: true}) searchComponent: any;

  selecton: any = [];
  // fournisseurs: any = [];

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

  index: number;
  id: number;
  dataSource = new MatTableDataSource<Produit>([]);
  data: Array<Produit>;
  fournisseurs: Fournisseur[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;
  constructor(private commandeService: CommandeService,
              private fournisseurService: FournisseurService,
              public dialog: MatDialog) { }

  ngOnInit() {
  }

  recieveSelection($event) {
     this.selecton = [...this.selecton, ...$event];
     this.dataSource = new MatTableDataSource<Produit>(this.selecton);
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

  displayQrCode(produit: Produit) {
    const dialogRef = this.dialog.open(QrcodeDisplayComponent, {
      data: produit, disableClose: false
      ,
      height: '200px',
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.downloadQrCode(result);
      }
    });
  }
}
