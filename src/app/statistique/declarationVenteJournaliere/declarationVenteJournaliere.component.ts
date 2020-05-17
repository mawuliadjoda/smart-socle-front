import { Component, OnInit, ViewChild } from '@angular/core';
import { DeclarationVenteService } from 'src/app/services/declaration-vente.service';
import { AuthenticationService } from 'src/app/services/jwt-auth/authentication.service';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { DeclarationVente } from 'src/app/models/declaration-vente';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';
import { StatJournaliereComponent } from '../stat-journaliere/stat-journaliere.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-declaration-vente-journaliere',
  templateUrl: './declarationVenteJournaliere.component.html',
  styleUrls: ['./declarationVenteJournaliere.component.css']
})
export class DeclarationVenteJournaliereComponent implements OnInit {

  displayedColumns = [
    'id',
    'montant',
    'createdAt',
    'userName'
  ];

  dataSource = new MatTableDataSource<DeclarationVente>([]);
  data: Array<DeclarationVente>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private declarationVenteService: DeclarationVenteService,
              private authenticationService: AuthenticationService,
              private spinner: NgxSpinnerService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.spinner.show();
    this.declarationVenteService.getAllByUserName(this.authenticationService.getUserLogin()).subscribe( data => {

      this.data = data;
      const datePipe = new DatePipe('en-US');

      this.data.map( obj => {
        obj.createdAt = datePipe.transform(obj.createdAt, 'dd-MM-yyyy');
      });

      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.spinner.hide();
    },
    (err: HttpErrorResponse) => {
      console.log(err.name + ' ' + err.message);
    });
  }

  addNew() {

    const dialogRef = this.dialog.open(StatJournaliereComponent, {
      width: '800px',
      data: this.data , disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    });
  }
}
