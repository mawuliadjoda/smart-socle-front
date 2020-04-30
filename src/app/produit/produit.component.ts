import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Produit } from '../models/produit';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProduitService } from '../services/produit.service';
import { AddProduitComponent } from './add-produit/add-produit.component';
import { EditProduitComponent } from './edit-produit/edit-produit.component';
import { DeleteProduitComponent } from './delete-produit/delete-produit.component';
import { ApprovisionnementComponent } from './approvisionnement/approvisionnement.component';


@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
  displayedColumns = [
    'id',
    'nom',
    'reference',
    'categorie',
    'qte',
    'prixUnitaire',
    'createdAt',
    'updatedAt',
    'actions'
  ];

  index: number;
  id: number;
  dataSource = new MatTableDataSource<Produit>([]);
  data: Array<Produit>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public produitService: ProduitService
  ) {}
  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  addNew() {

    const produitToSave = new Produit();
    const dialogRef = this.dialog.open(AddProduitComponent, {
      data: produitToSave, disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.produitService.add(produitToSave).subscribe(
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

  startEdit(index: number, produit: Produit) {
    const dialogRef = this.dialog.open(EditProduitComponent, {
      data: produit, disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.produitService.update(produit).subscribe(data => {
          this.data[index] = data;
          this.dataSource = new MatTableDataSource(this.data);
        },
        (err: HttpErrorResponse) => {
          console.log(err.name + ' ' + err.message);
        });
      }
    });
  }

  approvisionner(index: number, produit: Produit) {
    const dialogRef = this.dialog.open(ApprovisionnementComponent, {
      data: produit, disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.produitService.update(produit).subscribe(data => {
          this.data[index] = data;
          this.dataSource = new MatTableDataSource(this.data);
        },
        (err: HttpErrorResponse) => {
          console.log(err.name + ' ' + err.message);
        });
      }
    });
  }


  deleteItem(index: number, produit: Produit) {
    const dialogRef = this.dialog.open(DeleteProduitComponent, {
      data: produit
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.produitService.delete(produit.id).subscribe(() => {
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
    this.produitService.getAllProduits().subscribe(data => {
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
