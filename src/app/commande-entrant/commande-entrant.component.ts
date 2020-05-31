import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { LigneCommande } from '../models/ligne-commande';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Produit } from '../models/produit';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommandeService } from '../services/commande.service.ts';
import { FournisseurService } from '../services/fournisseur.service';
import { Fournisseur } from '../models/fournisseur';
import { HttpErrorResponse } from '@angular/common/http';
import { SearchComponent } from '../elasticsearch/search/search.component';

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
              private fournisseurService: FournisseurService) { }

  ngOnInit() {
    this.loadFournisseurs();
  }

  ngAfterViewInit() {
    // this.selecton = this.searchComponent.selecton;
    // this.dataSource = new MatTableDataSource<Produit>(this.selecton.value);
  }

  recieveSelection($event) {
    // this.selecton = [...this.selecton, ...$event];
    // this.dataSource = new MatTableDataSource<Produit>(this.selecton);

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
  }
  commander() {
    console.log(this.selecton);
    this.commandeService.saveCommandeEntrant(this.selecton).subscribe(
      data => {
        console.log(data);
        this.selecton = [];
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
