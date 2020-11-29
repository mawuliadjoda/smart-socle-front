import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { RecouvrementAssuranceCService } from 'src/app/services/recouvrement-assurance-c.service';
import { RecouvrementAssuranceC } from 'src/app/models/recouvrement-assurance-c';
import { DATE } from '@amcharts/amcharts4/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-recouvrement',
  templateUrl: './recouvrement.component.html',
  styleUrls: ['./recouvrement.component.scss']
})
export class RecouvrementComponent implements OnInit {

  displayedColumns = [

    'nomProduit',
    'prixUnitaire',
    'qte',
    'montant',
    'detailReduction',
    'montantReduction',
    'nomTier',
    'prenomTier',
    'numCarteAssurance',
    'nomEtablissement'
  ];

  index: number;
  id: number;
  dataSource = new MatTableDataSource<RecouvrementAssuranceC>([]);
  data: Array<RecouvrementAssuranceC>;
  moisCommande = [];
  anneeCommande = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  myForm = this.fb.group({
    moisCommande: [''],
    anneeCommande: ['']
  });

  constructor(private service: RecouvrementAssuranceCService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.loadData();
    this.initMoisAnneeCommande();
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

  onSubmit() {
    // const data = {
    //   moisCommande: this.myForm.value.moisCommande.value,
    //   anneeCommande: this.myForm.value.anneeCommande.value
    // };

    this.service.findByMoiAnnee(this.myForm.value.moisCommande.value,
                                this.myForm.value.anneeCommande.value)
                               .subscribe( result => {
      this.data = result;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
    (err: HttpErrorResponse) => {
      console.log(err.name + ' ' + err.message);
    });
  }


  initMoisAnneeCommande() {

    this.moisCommande = [
      {value: '01', formatValue: 'Janvier'},
      {value: '02', formatValue: 'Février'},
      {value: '03', formatValue: 'Mars'},
      {value: '04', formatValue: 'Avril'},
      {value: '05', formatValue: 'Mai'},
      {value: '06', formatValue: 'Juin'},
      {value: '07', formatValue: 'Juiller'},
      {value: '08', formatValue: 'Août'},
      {value: '09', formatValue: 'Septembre'},
      {value: '10', formatValue: 'Octobre'},
      {value: '11', formatValue: 'Novembre'},
      {value: '12', formatValue: 'Decembre'},
    ];

    const year = new Date().getFullYear();

    this.anneeCommande = [
      {value: year, formatValue: year},
      {value: year - 1, formatValue: year - 1},
      {value: year - 2, formatValue: year - 2},
      {value: year - 3, formatValue: year - 3},
      {value: year - 4, formatValue: year - 4},
    ]
  }

}
