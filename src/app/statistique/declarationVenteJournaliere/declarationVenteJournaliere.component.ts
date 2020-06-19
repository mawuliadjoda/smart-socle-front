import { Component, OnInit, ViewChild } from '@angular/core';
import { DeclarationVenteService } from 'src/app/services/declaration-vente.service';
import { AuthenticationService } from 'src/app/services/jwt-auth/authentication.service';
import { MatTableDataSource, MatPaginator, MatDialog, MatSnackBar } from '@angular/material';
import { DeclarationVente } from 'src/app/models/declaration-vente';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';
import { StatJournaliereComponent } from '../stat-journaliere/stat-journaliere.component';
import { DatePipe } from '@angular/common';
import { DeleteDeclarationComponent } from './delete-declaration/delete-declaration.component';
import { ok } from 'assert';
import { element } from 'protractor';
import { environment } from 'src/environments/environment';

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
    'userName',
    'actions'
  ];

  dataSource = new MatTableDataSource<DeclarationVente>([]);
  data: Array<DeclarationVente>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  todayDate: string;
  datePipe = new DatePipe('en-US');

  constructor(private declarationVenteService: DeclarationVenteService,
              private authenticationService: AuthenticationService,
              private spinner: NgxSpinnerService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.spinner.show();
    this.declarationVenteService.getAllByUserName(this.authenticationService.getUserLogin()).subscribe( data => {

      data.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1);
      this.todayDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');

      data.map( obj => {
        obj.createdAt = this.datePipe.transform(obj.createdAt, 'dd-MM-yyyy');
      });
      /*
      data.sort((obj1, obj2) => {
        return obj2.createdAt.localeCompare(obj1.createdAt);
      });
      */
      this.data = data;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.spinner.hide();
    },
    (err: HttpErrorResponse) => {
      console.log(err.name + ' ' + err.message);
    });
  }

  addNew() {

    if (!this.isSaveDeclarationForThisDay(this.data, this.todayDate)) {
      const dialogRef = this.dialog.open(StatJournaliereComponent, {
        width: '800px',
        data: this.data , disableClose: true
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result ) {
          const declarationVente = {
            userName:  this.authenticationService.getUserLogin(),
            montant: result
          };

          this.declarationVenteService.add(declarationVente).subscribe(response => {
            console.log(response);
            response.createdAt = this.datePipe.transform(response.createdAt, 'dd-MM-yyyy');

            // Ajout du nouvel element au debut du tableau => unshift
            this.data.unshift(response);
            this.dataSource = new MatTableDataSource(this.data);
          },
          (err: HttpErrorResponse) => {
            console.log(err.name + ' ' + err.message);
          });

        }
      });

    } else {
      console.log('Enregistrement deja fait !');
      this.snackBar.open('Déclaration déja faite pour ce jour!', 'Erreur', {
        duration: environment.durationOfSnackBar,
      });
    }


  }

  deleteItem(index: number, declarationVente: DeclarationVente) {
    const dialogRef = this.dialog.open(DeleteDeclarationComponent, {
      data: declarationVente
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.id) {
        this.declarationVenteService.delete(result.id).subscribe(data => {
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

  isSaveDeclarationForThisDay(dataArray: Array<DeclarationVente>, paramDate) {
    let exist = false;
    for (const iterator of dataArray) {
      if (iterator.createdAt === paramDate) {
        exist = true;
        break;
      }
    }
    return exist;
  }

}
