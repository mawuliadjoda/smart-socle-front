import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { LigneCommande } from '../../models/ligne-commande';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
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
import { UtilService } from 'src/app/services/util/util.service';
import { error } from 'protractor';

@Component({
  selector: 'app-commande-entrant',
  templateUrl: './commande-entrant.component.html',
  styleUrls: ['./commande-entrant.component.css']
})
export class CommandeEntrantComponent implements OnInit, AfterViewInit {

  // query results available in ngOnInit use {static: true}
  // query results available in ngAfterViewInit use {static: false}
  @ViewChild(SearchComponent, {static: true}) searchComponent: any;

  selecton: any = [];
  // fournisseurs: any = [];

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
              private snackBar: MatSnackBar,
              private utilService: UtilService) { }

  ngOnInit() {
    this.loadFournisseurs();
  }

  ngAfterViewInit() {
    // this.selecton = this.searchComponent.selecton;
    // this.dataSource = new MatTableDataSource<Produit>(this.selecton.value);
  }

  recieveSelection($event) {
    if ($event) {
      $event.forEach(element => {
        const position = this.selecton.map(item =>  item.produit.id).indexOf(element.id);
        if (position === -1) {
         const transformReceiveProduit = $event.map(item => {

           const container = {
             id: null,
             produit: item,
             qte: 1,
             // important pour enregistrer une commande de type approvisionnnement
             typeCommande: environment.lib_commande_entrant,
             fournisseur: null
           };
           return container;
         });

         this.selecton = [...this.selecton, ...transformReceiveProduit];

        } else {
           const existLigneCommande = this.selecton[position];
           existLigneCommande.qte = existLigneCommande.qte + 1;
        }
     });

    }

  }
  commander() {
    console.log(this.selecton);
    this.commandeService.saveCommandeEntrant(this.selecton).subscribe(
      data => {
        console.log(data);
        this.selecton = [];

        this.snackBar.open('Commande passée avec succès !', 'Ok', {
          duration: environment.durationOfSnackBar,
        });

      }
    );
  }

  loadFournisseurs() {
    this.fournisseurService.getAll().subscribe( data => {
      this.fournisseurs = data;
    },
    (err: HttpErrorResponse) => {
      console.log(err.name + ' ' + err.message);
    });
  }
}
