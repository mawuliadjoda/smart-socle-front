import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { SearchComponent } from '../util-component/search/search.component';
import { LigneCommande } from '../models/ligne-commande';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Produit } from '../models/produit';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommandeService } from '../services/commande.service.ts';

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
  fournisseurs: any = [];

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

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;
  constructor(private commandeService: CommandeService) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    // this.selecton = this.searchComponent.selecton;
    // this.dataSource = new MatTableDataSource<Produit>(this.selecton.value);
  }

  recieveSelection($event) {
    //this.selecton = [...this.selecton, ...$event];
    //this.dataSource = new MatTableDataSource<Produit>(this.selecton);

    let transformReceiveProduit = $event.map(item => {

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
}
