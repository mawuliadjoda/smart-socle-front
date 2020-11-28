import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EtablissementAssurance } from 'src/app/models/etablissement-assurance';
import { EtablissementAssuranceService } from 'src/app/services/etablissement-assurance.service';
import { AddEtsAssuranceComponent } from './add-ets-assurance/add-ets-assurance.component';
import { DeleteEtsAssuranceComponent } from './delete-ets-assurance/delete-ets-assurance.component';
import { UpdateEtsAssuranceComponent } from './update-ets-assurance/update-ets-assurance.component';

@Component({
  selector: 'app-etablissement-assurance',
  templateUrl: './etablissement-assurance.component.html',
  styleUrls: ['./etablissement-assurance.component.scss']
})
export class EtablissementAssuranceComponent implements OnInit {
  displayedColumns = [
    'id',
    'nom',
    'tel',
    'contactMail',
    'adresse',
    'created_at',
    'actions'
  ];

  index: number;
  id: number;
  dataSource = new MatTableDataSource<EtablissementAssurance>([]);
  data: Array<EtablissementAssurance>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public service: EtablissementAssuranceService
  ) {}
  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  public loadData() {
    this.service.getAll().subscribe(data => {
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
    const etablissementToSave = new EtablissementAssurance();
    const dialogRef = this.dialog.open(AddEtsAssuranceComponent, {
      data: etablissementToSave, disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.add(result).subscribe(data => {

          this.data.unshift(data);
          this.dataSource = new MatTableDataSource(this.data);

        },
        (err: HttpErrorResponse) => {
          console.log(err.name + ' ' + err.message);
        });
      }
    });
  }
  deleteItem(index: number, etablissement: EtablissementAssurance) {
    const dialogRef = this.dialog.open(DeleteEtsAssuranceComponent, {
      data: etablissement, disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.id) {
        this.service .delete(result.id).subscribe(data => {
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

  startEdit(index: number, etablissement: EtablissementAssurance) {
    const dialogRef = this.dialog.open(UpdateEtsAssuranceComponent, {
      data: etablissement, disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.update(etablissement).subscribe(data => {
          this.data[index] = data;
          this.dataSource = new MatTableDataSource(this.data);
        },
        (err: HttpErrorResponse) => {
          console.log(err.name + ' ' + err.message);
        });
      }
    });
  }

}
