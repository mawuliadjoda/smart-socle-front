import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LigneCommande } from '../models/ligne-commande';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { LigneCommandeService } from '../services/ligne-commande.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-commande-entrant-attente',
  templateUrl: './commande-entrant-attente.component.html',
  styleUrls: ['./commande-entrant-attente.component.css']
})
export class CommandeEntrantAttenteComponent implements OnInit {

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

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  constructor(private ligneCommandeService: LigneCommandeService) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.ligneCommandeService.getCommandesEnAttente().subscribe(data => {
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
