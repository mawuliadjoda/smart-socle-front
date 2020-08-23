import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, PageEvent } from '@angular/material';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AddProduitComponent } from './add-produit/add-produit.component';
import { EditProduitComponent } from './edit-produit/edit-produit.component';
import { DeleteProduitComponent } from './delete-produit/delete-produit.component';
import { ApprovisionnementComponent } from './approvisionnement/approvisionnement.component';
import { Produit } from 'src/app/models/produit';
import { ProduitService } from 'src/app/services/produit.service';
import { environment } from 'src/environments/environment';


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
    // 'updatedAt',
    'actions'
  ];

  index: number;
  id: number;
  dataSource = new MatTableDataSource<Produit>([]);
  data: Array<Produit>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  labelNonDefini = environment.LABEL_NON_DEFINI;

  /** The current page index. */
  pageIndex = 0;
  /** The current page size */
  pageSize = 5;
  /** The current total number of items being paged */
  length: number;
  /**
   * Index of the page that was selected previously.
   * @breaking-change 8.0.0 To be made into a required property.
   */
  previousPageIndex?: number;

  sortBy = 'nom';

  loading = true;
  pageSizeOptions: number[] = [5, 10];

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public produitService: ProduitService
  ) {}
  ngOnInit() {
    // this.loadData();
    this.loadDataByPage();
  }

  refresh() {
    // this.loadData();
    this.loadDataByPage();
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

  public loadDataByPage() {
    this.produitService.getAllByPage(this.pageSize, this.pageIndex, this.sortBy).subscribe(data => {
      this.data = data.content;
      this.dataSource = new MatTableDataSource(this.data);

      // this.paginator.pageIndex = data.number;
      // this.paginator.pageSize = data.size;
      // this.paginator.length = data.totalElements;

      this.length = data.totalElements;
      this.pageIndex = data.number;
      this.pageSize = data.size;

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.loading = false;
    },
    (err: HttpErrorResponse) => {
      this.loading = true;
      console.log(err.name + ' ' + err.message);
    });
  }

  changePage(e: PageEvent) {
    // this.no = e.pageIndex > 0 ? e.pageIndex * e.pageSize : 0;
    this.produitService.getAllByPage(e.pageSize, e.pageIndex, this.sortBy).subscribe((page) => {
      this.dataSource = new MatTableDataSource(page.content);
      this.length = page.totalElements;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
