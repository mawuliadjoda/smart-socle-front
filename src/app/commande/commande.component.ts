import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Produit } from '../models/produit';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProduitService } from '../services/produit.service';
import { Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { AddProductToCart } from '../ngxs/action';
import { ProductState } from '../ngxs/state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit, AfterViewInit  {
  index: number;
  id: number;
  dataSource = new MatTableDataSource<Produit>([]);
  data: Array<Produit> = [];
  data2: Array<Produit> = [];

  produitsPanier: Array<Produit> = [];

  // nbProduitPanier: number = 0;
  maxDisplayProduct: number = 2;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;
  isCommande = true;
  isPannier = false;
  isFacture = false;

  @Select(ProductState) state$: Observable<any>;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public produitService: ProduitService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private store: Store
  ) {}
  ngOnInit() {
    this.isCommande = true;
    this.isPannier = false;
    this.isFacture = false;
    this.loadData();
    this.loadCartTotal();
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

      //this.nbProduitPanier = 0;
      let obj = { pageIndex: 0, pageSize : this.maxDisplayProduct };
      this.getData(obj);
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
    let obj = { pageIndex: 0, pageSize : this.maxDisplayProduct };
    this.getData(obj);
  }


  page = 0;
  size = 2;
  getData(obj) {
    let index = 0
    const startingIndex = obj.pageIndex * obj.pageSize;
    const endingIndex = startingIndex + obj.pageSize;

    this.data = this.dataSource.filteredData.filter(() => {
      index++;
      return (index > startingIndex && index <= endingIndex) ? true : false;
    });
    //this.size = this.data.length;
    this.page = obj.pageIndex;
  }

  addShoppingCard(produit: Produit){
    const action = 'sussès';
    const message = `le produit ${produit.nom} a été ajouté au pannier !`;
    this._snackBar.open(message, action, {
      duration: 500,
    });
    produit.qteCommande = produit.qteCommande ?  produit.qteCommande + 1 : produit.qteCommande;
    //this.produitsPanier.push(produit);
    //this.nbProduitPanier ++;

    this.store.dispatch(new AddProductToCart(produit));
  }

  viewShoppingCart(){
    console.log('befor: ' + this.produitsPanier);
    this.isPannier = true;
    this.isCommande = false;
    //this.router.navigate(['smart/pannier'], {state: {data: this.produitsPanier}});
    this.router.navigateByUrl('smart/pannier');
  }

  loadCartTotal() {
    this.state$.subscribe(
      (data) => {
        // this.nbProduitPanier = data.cart.length;
        this.produitsPanier = data.cart;
      }
    );
  }
}
