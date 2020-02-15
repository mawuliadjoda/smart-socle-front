import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Produit } from '../models/produit';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommandeService } from '../services/commande.service.ts';
import { ProduitService } from '../services/produit.service';
import { LigneCommande } from '../models/ligne-commande';
import { LigneCommandeService } from '../services/ligne-commande.service';

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
    this.ligneCommandeService.getAll().subscribe(data => {
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
