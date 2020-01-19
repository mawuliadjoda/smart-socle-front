import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Produit } from '../models/produit';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit, AfterViewInit  {
  displayedColumns = [
    'id',
    'nom',
    'reference',
    'categorie',
    'qte',
    'prixUnitaire',
    'created_at',
    'updated_at',
    'actions'
  ];

  index: number;
  id: number;
  dataSource = new MatTableDataSource<Produit>([]);
  data: Array<Produit> = [];
  data2: Array<Produit> = [];

  nbProduitPanier: number = 0;
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
    this.dataSource.paginator = this.paginator;
    this.nbProduitPanier = 0;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  refresh() {
    this.loadData();
  }

  public loadData() {
    this.produitService.getAll().subscribe(data => {
      this.data = data;
      this.data2 = data;
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
    this.data = this.dataSource.filteredData;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  page = 0;
  size = 5;
  getData(obj) {
    let index=0
    let startingIndex = obj.pageIndex * obj.pageSize;
    let endingIndex = startingIndex + obj.pageSize;

    this.data = this.dataSource.filteredData.filter(() => {
      index++;
      return (index > startingIndex && index <= endingIndex) ? true : false;
    });
    //this.size = this.data.length;
    this.page = obj.pageIndex;
  }

  addShoppingCard(produit: Produit){
    this.nbProduitPanier ++;
  }
}
