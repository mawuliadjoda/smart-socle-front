import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Categorie } from 'src/app/models/categorie';
import { CategorieService } from 'src/app/services/categorie.service';
import { DeleteCategorieComponent } from './delete-categorie/delete-categorie.component';
import { AddCategorieComponent } from './add-categorie/add-categorie.component';


@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {

  displayedColumns = [
    'id',
    'libelle',
    'code',
    'created_at',
    'actions'
  ];

  index: number;
  id: number;
  dataSource = new MatTableDataSource<Categorie>([]);
  data: Array<Categorie>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public categorieService: CategorieService
  ) {}
  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  public loadData() {
    this.categorieService.getAll().subscribe(data => {
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
    const categorieToSave = new Categorie();
    const dialogRef = this.dialog.open(AddCategorieComponent, {
      data: categorieToSave, disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.categorieService.add(result).subscribe(data => {

          this.data.unshift(data);
          this.dataSource = new MatTableDataSource(this.data);

        },
        (err: HttpErrorResponse) => {
          console.log(err.name + ' ' + err.message);
        });
      }
    });
  }
  deleteItem(index: number, categorie: Categorie) {
    const dialogRef = this.dialog.open(DeleteCategorieComponent, {
      data: categorie, disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.id) {
        this.categorieService .delete(result.id).subscribe(data => {
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
