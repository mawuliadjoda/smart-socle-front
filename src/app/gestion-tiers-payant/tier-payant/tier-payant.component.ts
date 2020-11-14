import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TierPayant } from 'src/app/models/tierPayant';
import { TierPayanService } from 'src/app/services/tier-payan.service';
import { AddTierPayantComponent } from './add-tier-payant/add-tier-payant.component';
import { DeleteTierPayantComponent } from './delete-tier-payant/delete-tier-payant.component';
import { UpdateTierComponent } from './update-tier/update-tier.component';

@Component({
  selector: 'app-tier-payant',
  templateUrl: './tier-payant.component.html',
  styleUrls: ['./tier-payant.component.scss']
})
export class TierPayantComponent implements OnInit {
  displayedColumns = [
    'id',
    'nom',
    'prenom',
    'tel',
    'numCarteAssurance',
    'dateExpirationAssurance',
    'created_at',
    'actions'
  ];

  index: number;
  id: number;
  dataSource = new MatTableDataSource<TierPayant>([]);
  data: Array<TierPayant>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public service: TierPayanService
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
    const tierPayaToSave = new TierPayant();
    const dialogRef = this.dialog.open(AddTierPayantComponent, {
      data: tierPayaToSave, disableClose: true
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
  deleteItem(index: number, tierPaya: TierPayant) {
    const dialogRef = this.dialog.open(DeleteTierPayantComponent, {
      data: tierPaya, disableClose: true
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


  startEdit(index: number, tierPaya: TierPayant) {
    const dialogRef = this.dialog.open(UpdateTierComponent, {
      data: tierPaya, disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.update(tierPaya).subscribe(data => {
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
