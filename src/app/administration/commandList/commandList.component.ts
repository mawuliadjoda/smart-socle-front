import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Produit } from '../../models/produit';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommandeService } from '../../services/commande.service.ts';
import { ProduitService } from '../../services/produit.service';
import { LigneCommande } from '../../models/ligne-commande';
import { LigneCommandeService } from '../../services/ligne-commande.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-command-list',
  templateUrl: './commandList.component.html',
  styleUrls: ['./commandList.component.css']
})
export class CommandListComponent implements OnInit {

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
  dataSource = new MatTableDataSource<LigneCommande>([]);
  data: Array<LigneCommande>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  labelNonDefini = environment.LABEL_NON_DEFINI;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public ligneCommandeService: LigneCommandeService
  ) {}
  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  public loadData() {
    // Recuperation de la liste des commandes sortant (vente)
    this.ligneCommandeService.getCommandesByTypeCommande(environment.lib_commande_sortant).subscribe(data => {
      this.data = data;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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

}
