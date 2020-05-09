import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LigneCommandeService } from 'src/app/services/ligne-commande.service';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import {MatSort} from '@angular/material/sort';
import { environment } from 'src/environments/environment';
import { DeclarationVenteService } from 'src/app/services/declaration-vente.service';
import { AuthenticationService } from 'src/app/services/jwt-auth/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';

export interface Data {
  unite: number;
  qte: number;
}

@Component({
  selector: 'app-stat-journaliere',
  templateUrl: './stat-journaliere.component.html',
  styleUrls: ['./stat-journaliere.component.css']
})
export class StatJournaliereComponent implements OnInit {

  unites = [];
  qte = 1;

  myForm = this.fb.group({
    unite: [''],
    qte: ['']
  });

  displayedColumns: string[] = ['unite', 'qte', 'action'];

  dataSource = new MatTableDataSource<Data>([]);
  data: Array<Data> = [];
  total: number;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private fb: FormBuilder,
              private declarationVenteService: DeclarationVenteService,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.initUnites();
    this.dataSource.sort = this.sort;
  }

  initUnites() {
    this.unites = [
      {value: 10000, formatValue: '10 000'},
      {value: 5000, formatValue: '5 000'},
      {value: 2000, formatValue: '2 000'},
      {value: 1000, formatValue: '1 000'},
      {value: 500, formatValue: '500'},
      {value: 200, formatValue: '200'},
      {value: 100, formatValue: '100'},
      {value: 50, formatValue: '50'},
      {value: 25, formatValue: '25'},
      {value: 20, formatValue: '20'},
      {value: 10, formatValue: '10'},
      {value: 5, formatValue: '5'},
    ];
  }
  onSubmit() {
    console.warn(this.myForm.value);
    const data = {
      unite: this.myForm.value.unite.value,
      qte: this.myForm.value.qte
    };

    // Verify if exist in  this.data
    const index = this.data.map(element =>  element.unite).indexOf(data.unite);
    if (index < 0 || this.data.length === 0) {
      this.data.push(data);
      this.dataSource = new MatTableDataSource(this.data);
      this.total = this.data.map(t => t.unite * t.qte).reduce((acc, value) => acc + value, 0);

      this.myForm = this.fb.group({
        unite: [''],
        qte: ['']
      });
    }
  }

  delete(row, i) {
    this.data.splice(i, 1);
    this.dataSource = new MatTableDataSource(this.data);
    this.total = this.data.map(t => t.unite * t.qte).reduce((acc, value) => acc + value, 0);
  }
  enregistreVenteDuJour() {
    const montantTotal = this.data.map(t => t.unite * t.qte).reduce((acc, value) => acc + value, 0);

    const declarationVente = {
      userName:  this.authenticationService.getUserLogin(),
      montant: montantTotal
    };

    this.declarationVenteService.add(declarationVente).subscribe(data => {
      console.log(data);
    },
    (err: HttpErrorResponse) => {
      console.log(err.name + ' ' + err.message);
    });
  }
}
