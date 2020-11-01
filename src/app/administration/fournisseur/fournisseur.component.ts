import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Fournisseur } from 'src/app/models/fournisseur';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import { DeleteFournisseurComponent } from './delete-fournisseur/delete-fournisseur.component';
import { AddFournisseurComponent } from './add-fournisseur/add-fournisseur.component';

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.css']
})
export class FournisseurComponent implements OnInit {

  displayedColumns = [
    'id',
    'nom',
    'tel',
    'created_at',
    'actions'
  ];

  index: number;
  id: number;
  dataSource = new MatTableDataSource<Fournisseur>([]);
  data: Array<Fournisseur>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public fournisseurService: FournisseurService
  ) {}
  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  public loadData() {
    this.fournisseurService.getAll().subscribe(data => {
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


  addNew() {
    const fournisseurToSave = new Fournisseur();
    const dialogRef = this.dialog.open(AddFournisseurComponent, {
      data: fournisseurToSave, disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fournisseurService.add(result).subscribe(data => {

          this.data.unshift(data);
          this.dataSource = new MatTableDataSource(this.data);

        },
        (err: HttpErrorResponse) => {
          console.log(err.name + ' ' + err.message);
        });
      }
    });
  }
  deleteItem(index: number, fournisseur: Fournisseur) {
    const dialogRef = this.dialog.open(DeleteFournisseurComponent, {
      data: fournisseur, disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.id) {
        this.fournisseurService .delete(result.id).subscribe(data => {
          console.log(data);

          const position =  this.data.map(element =>  element.id).indexOf(result.id);

          // remove element in position
          this.data.splice(position, 1);
          this.dataSource = new MatTableDataSource(this.data);

        },
        (err: HttpErrorResponse) => {
          console.log(err.name + ' ' + err.message);
        });
      }
    });
  }
}
