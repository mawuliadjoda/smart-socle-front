import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Issue } from '../models/issue';
import { EditDialogComponent } from './edit/edit.dialog.component';
import { DeleteDialogComponent } from './delete/delete.dialog.component';
import { AddDialogComponent } from './add/add-dialog.component';
import { IssueService } from '../services/issue.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  displayedColumns = [
    'id',
    'title',
    'state',
    'url',
    'created_at',
    'updated_at',
    'actions'
  ];

  index: number;
  id: number;
  dataSource = new MatTableDataSource<Issue>([]);
  data: Array<Issue>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public issueService: IssueService
  ) {}
  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  addNew() {
    let issueToSave = new Issue();
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: issueToSave
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.issueService.add(issueToSave).subscribe(
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

  startEdit(index: number, issue: Issue) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: issue
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.issueService.update(issue).subscribe(data => {
          this.data[index] = data;
          this.dataSource = new MatTableDataSource(this.data);
        },
        (err: HttpErrorResponse) => {
          console.log(err.name + ' ' + err.message);
        });
      }
    });
  }

  deleteItem(index: number, issue: Issue) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: issue
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.issueService.delete(issue.id).subscribe(() => {
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
    this.issueService.getAll().subscribe(data => {
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
