import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LigneCommande } from '../../models/ligne-commande';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LigneCommandeService } from '../../services/ligne-commande.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeleteCommandeEntrantAttenteComponent } from './delete-commande-entrant-attente/delete-commande-entrant-attente.component';

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
    'fournisseur',
    'qte',
    'prixUnitaire',
    'prixTotal',
    'created_at',
    'actions'
  ];

  dataSource = new MatTableDataSource<LigneCommande>([]);
  data: Array<LigneCommande>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  constructor(private ligneCommandeService: LigneCommandeService,
              private spinner: NgxSpinnerService,
              private dialog: MatDialog) { }

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


  deleteItem(index: number, ligneCommande: LigneCommande) {
    const dialogRef = this.dialog.open(DeleteCommandeEntrantAttenteComponent, {
      data: ligneCommande
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // on ne surpprime rien pour des raisons de statistique. on desactive
        this.ligneCommandeService.disable(ligneCommande).subscribe(() => {
          this.data.splice(index, 1);
          this.dataSource = new MatTableDataSource(this.data);
        },
        (err: HttpErrorResponse) => {
          console.log(err.name + ' ' + err.message);
        });
      }
    });
  }
}
