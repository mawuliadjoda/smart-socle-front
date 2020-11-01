import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AddRefProduitComponent } from './add-ref-produit/add-ref-produit.component';
import { EditRefProduitComponent } from './edit-ref-produit/edit-ref-produit.component';
import { DeleteRefProduitComponent } from './delete-ref-produit/delete-ref-produit.component';
import { RefProduit } from 'src/app/models/ref-produit';
import { RefProduitService } from 'src/app/services/ref-produit.service';


@Component({
  selector: 'app-ref-produit',
  templateUrl: './ref-produit.component.html',
  styleUrls: ['./ref-produit.component.css']
})
export class RefProduitComponent implements OnInit {
  displayedColumns = [
    'id',
    'nom',
    'reference',
    'categorie',
    'prixUnitaire',
    'createdAt',
    'updatedAt',
    'actions'
  ];

  index: number;
  id: number;
  dataSource = new MatTableDataSource<RefProduit>([]);
  data: Array<RefProduit>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public refproduitService: RefProduitService
  ) {}
  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  addNew() {

    const refProduitToSave = new RefProduit();
    const dialogRef = this.dialog.open(AddRefProduitComponent, {
      data: refProduitToSave, disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.refproduitService.add(refProduitToSave).subscribe(
          data => {
            this.data.push(data);
            this.dataSource = new MatTableDataSource(this.data);
          },
          (err: HttpErrorResponse) => {
            console.log(err.name + ' ' + err.message);
          }
        );
      }
    });
  }

  startEdit(index: number, refProduit: RefProduit) {
    // new RefProduit(refProduit):  give new reference to avoid modif in list before save
    const refProduitToEdit = new RefProduit(refProduit);
    const dialogRef = this.dialog.open(EditRefProduitComponent, {
      data: refProduitToEdit, disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.refproduitService.update(refProduitToEdit).subscribe(data => {
          this.data[index] = data;
          this.dataSource = new MatTableDataSource(this.data);
        },
        (err: HttpErrorResponse) => {
          console.log(err.name + ' ' + err.message);
        });
      }
    });
  }

  deleteItem(index: number, refProduit: RefProduit) {
    const dialogRef = this.dialog.open(DeleteRefProduitComponent, {
      data: refProduit
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.refproduitService.delete(refProduit.id).subscribe(() => {
          this.data.splice(index, 1);
          this.dataSource = new MatTableDataSource(this.data);
        },
        (err: HttpErrorResponse) => {
          console.log(err.name + ' ' + err.message);
        });
      }
    });
  }

  public loadData() {
    this.refproduitService.getAll().subscribe(data => {
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
